import { useEffect, useRef } from 'react'

const SPACING = 34
const FAR_SPACING = 26
const RADIUS = 150
const PUSH = 16
const INK = '236, 236, 241'

interface Ring {
  x: number
  y: number
  t: number
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let scrollY = window.scrollY
    let active = false
    let running = false
    let raf = 0
    let farX = 0
    const mouse = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0 }
    const rings: Ring[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      // far layer: tiny faint dots that drift slowly and lean away from the cursor (adds depth)
      const farOffY = -((scrollY * 0.07) % FAR_SPACING)
      const far = new Path2D()
      for (let r = -1; r < Math.ceil(h / FAR_SPACING) + 2; r++) {
        for (let c = -1; c < Math.ceil(w / FAR_SPACING) + 2; c++) {
          const fx = c * FAR_SPACING + FAR_SPACING / 2 + (farX % FAR_SPACING)
          const fy = r * FAR_SPACING + FAR_SPACING / 2 + farOffY
          far.moveTo(fx + 0.8, fy)
          far.arc(fx, fy, 0.8, 0, Math.PI * 2)
        }
      }
      ctx.fillStyle = `rgba(${INK}, 0.07)`
      ctx.fill(far)

      // near layer: the interactive grid, moving a little faster
      const offY = -((scrollY * 0.26) % SPACING)
      const base = new Path2D()

      for (let r = -1; r < Math.ceil(h / SPACING) + 2; r++) {
        for (let c = -1; c < Math.ceil(w / SPACING) + 2; c++) {
          const x = c * SPACING + SPACING / 2
          const y = r * SPACING + SPACING / 2 + offY
          const dx = x - smooth.x
          const dy = y - smooth.y
          const dist = Math.hypot(dx, dy)

          if (!active || dist > RADIUS) {
            base.moveTo(x + 1.1, y)
            base.arc(x, y, 1.1, 0, Math.PI * 2)
            continue
          }
          const t = 1 - dist / RADIUS
          const f = t * t * (3 - 2 * t)
          const k = (f * PUSH) / (dist || 1)
          ctx.beginPath()
          ctx.arc(x + dx * k, y + dy * k, 1.1 + f * 1.3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${INK}, ${0.2 + f * 0.45})`
          ctx.fill()
        }
      }
      ctx.fillStyle = `rgba(${INK}, 0.14)`
      ctx.fill(base)

      const now = performance.now()
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i]
        const a = (now - ring.t) / 900
        if (a >= 1) {
          rings.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(ring.x, ring.y, a * 260, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(124, 140, 255, ${0.5 * (1 - a)})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }

    const frame = () => {
      smooth.x += (mouse.x - smooth.x) * 0.14
      smooth.y += (mouse.y - smooth.y) * 0.14
      draw()
      const farTarget = active ? (w / 2 - mouse.x) * 0.02 : 0
      farX += (farTarget - farX) * 0.08
      const settled =
        Math.abs(mouse.x - smooth.x) < 0.3 && Math.abs(mouse.y - smooth.y) < 0.3 && Math.abs(farTarget - farX) < 0.05
      if (settled && rings.length === 0) {
        running = false
      } else {
        raf = requestAnimationFrame(frame)
      }
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e: MouseEvent) => {
      if (!active) {
        smooth.x = e.clientX
        smooth.y = e.clientY
      }
      active = true
      mouse.x = e.clientX
      mouse.y = e.clientY
      start()
    }
    const onLeave = () => {
      active = false
      start()
    }
    const onScroll = () => {
      scrollY = window.scrollY
      start()
    }
    const onClick = (e: MouseEvent) => {
      rings.push({ x: e.clientX, y: e.clientY, t: performance.now() })
      start()
    }
    const onResize = () => {
      resize()
      start()
    }

    resize()
    draw()
    window.addEventListener('resize', onResize)
    if (!reduce) {
      window.addEventListener('mousemove', onMove, { passive: true })
      document.addEventListener('mouseleave', onLeave)
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('click', onClick)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return <canvas ref={canvasRef} className="bg-canvas" aria-hidden="true" />
}