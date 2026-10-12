import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  radius: number
  hueIndex: number
  kind: 'dot' | 'ring' | 'cross'
  speed: number
  angle: number
}

interface Orb {
  x: number
  y: number
  radius: number
  color: { r: number; g: number; b: number }
  vx: number
  vy: number
  pulseSpeed: number
  pulseAngle: number
}

const PARTICLE_COUNT = 75
const CONNECT_DIST = 130
const MOUSE_RADIUS = 160

const PALETTE = [
  { r: 59, g: 91, b: 255 },  // Blue
  { r: 255, g: 200, b: 61 }, // Sun Gold
  { r: 255, g: 111, b: 78 }, // Coral
  { r: 92, g: 198, b: 137 }, // Green
]

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const particlesRef = useRef<Particle[]>([])
  const orbsRef = useRef<Orb[]>([])
  const dimsRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const initOrbs = (w: number, h: number): Orb[] => [
      {
        x: w * 0.15,
        y: h * 0.25,
        radius: Math.min(w, h) * 0.35,
        color: PALETTE[0], // Blue
        vx: 0.15,
        vy: 0.1,
        pulseSpeed: 0.015,
        pulseAngle: 0,
      },
      {
        x: w * 0.85,
        y: h * 0.35,
        radius: Math.min(w, h) * 0.38,
        color: PALETTE[1], // Sun
        vx: -0.12,
        vy: 0.14,
        pulseSpeed: 0.012,
        pulseAngle: Math.PI / 2,
      },
      {
        x: w * 0.3,
        y: h * 0.8,
        radius: Math.min(w, h) * 0.32,
        color: PALETTE[2], // Coral
        vx: 0.1,
        vy: -0.12,
        pulseSpeed: 0.018,
        pulseAngle: Math.PI,
      },
      {
        x: w * 0.75,
        y: h * 0.85,
        radius: Math.min(w, h) * 0.34,
        color: PALETTE[3], // Green
        vx: -0.14,
        vy: -0.1,
        pulseSpeed: 0.014,
        pulseAngle: (3 * Math.PI) / 2,
      },
    ]

    const initParticles = (w: number, h: number): Particle[] => {
      const kinds: Particle['kind'][] = ['dot', 'dot', 'dot', 'ring', 'cross']
      const res: Particle[] = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        res.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 1.8 + Math.random() * 2.2,
          hueIndex: Math.floor(Math.random() * PALETTE.length),
          kind: kinds[Math.floor(Math.random() * kinds.length)],
          speed: 0.2 + Math.random() * 0.3,
          angle: Math.random() * Math.PI * 2,
        })
      }
      return res
    }

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      dimsRef.current = { w, h }
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (particlesRef.current.length === 0) {
        particlesRef.current = initParticles(w, h)
        orbsRef.current = initOrbs(w, h)
      } else {
        // Wrap or re-clamp existing particles
        particlesRef.current.forEach((p) => {
          if (p.x > w) p.x = Math.random() * w
          if (p.y > h) p.y = Math.random() * h
        })
      }
    }

    resize()

    if (reducedMotion) {
      // Draw static ambient frame
      const { w, h } = dimsRef.current
      ctx.clearRect(0, 0, w, h)
      for (const orb of orbsRef.current) {
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        grad.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0.08)`)
        grad.addColorStop(1, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      for (const p of particlesRef.current) {
        const c = PALETTE[p.hueIndex]
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.25)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      return
    }

    let rafId = 0

    const render = () => {
      const { w, h } = dimsRef.current
      const particles = particlesRef.current
      const orbs = orbsRef.current
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, w, h)

      // 1. Draw glowing ambient orbs
      for (const orb of orbs) {
        orb.x += orb.vx
        orb.y += orb.vy
        orb.pulseAngle += orb.pulseSpeed

        // Soft bounce within viewport boundaries
        if (orb.x < -orb.radius * 0.2 || orb.x > w + orb.radius * 0.2) orb.vx *= -1
        if (orb.y < -orb.radius * 0.2 || orb.y > h + orb.radius * 0.2) orb.vy *= -1

        const dynamicR = orb.radius * (0.9 + Math.sin(orb.pulseAngle) * 0.1)
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, dynamicR)
        grad.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0.085)`)
        grad.addColorStop(0.5, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0.035)`)
        grad.addColorStop(1, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0)`)

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, dynamicR, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Natural organic movement
        p.angle += 0.015
        p.x += p.vx + Math.cos(p.angle) * 0.25
        p.y += p.vy + Math.sin(p.angle) * 0.25

        // Screen wrap
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Mouse physics (gentle magnetic repulsion & interaction)
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * 2.2
            p.x += (dx / dist) * force
            p.y += (dy / dist) * force
          }
        }
      }

      // 3. Draw inter-particle connection lines
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.18
            const ca = PALETTE[a.hueIndex]
            ctx.strokeStyle = `rgba(${ca.r}, ${ca.g}, ${ca.b}, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        // Mouse connection beam to closest particles
        if (mouse.active) {
          const mdx = a.x - mouse.x
          const mdy = a.y - mouse.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mdist < MOUSE_RADIUS * 0.9) {
            const mAlpha = (1 - mdist / (MOUSE_RADIUS * 0.9)) * 0.25
            const ca = PALETTE[a.hueIndex]
            ctx.strokeStyle = `rgba(${ca.r}, ${ca.g}, ${ca.b}, ${mAlpha})`
            ctx.lineWidth = 1.2
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(a.x, a.y)
            ctx.stroke()
          }
        }
      }

      // 4. Draw particle shapes (dots, rings, crosses)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const c = PALETTE[p.hueIndex]

        if (p.kind === 'dot') {
          ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.55)`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.kind === 'ring') {
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.5)`
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2)
          ctx.stroke()
        } else if (p.kind === 'cross') {
          const sz = p.radius * 1.6
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.45)`
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.moveTo(p.x - sz, p.y)
          ctx.lineTo(p.x + sz, p.y)
          ctx.moveTo(p.x, p.y - sz)
          ctx.lineTo(p.x, p.y + sz)
          ctx.stroke()
        }
      }

      // 5. Soft interactive cursor aura
      if (mouse.active) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          MOUSE_RADIUS * 0.85
        )
        cursorGlow.addColorStop(0, 'rgba(59, 91, 255, 0.08)')
        cursorGlow.addColorStop(0.5, 'rgba(59, 91, 255, 0.025)')
        cursorGlow.addColorStop(1, 'rgba(59, 91, 255, 0)')

        ctx.fillStyle = cursorGlow
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS * 0.85, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
    }

    const onMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="bg-layer" aria-hidden="true">
      <div className="bg-grid-overlay" />
      <canvas ref={canvasRef} />
      <div className="bg-gradient-top" />
    </div>
  )
}
