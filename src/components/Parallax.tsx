import { useEffect } from 'react'

interface Layer {
  el: HTMLElement
  base: number
  depth: number
  mx: number
  my: number
  fade: boolean
}

/**
 * Moves any element marked with data-parallax at its own speed.
 *   data-depth  how much it lags behind the scroll (0.2 = slow, 0 = none)
 *   data-mx / data-my  how far (px) it leans with the mouse
 *   data-fade  fade the mouse movement out once you scroll away from the top
 * It uses the CSS "translate" property, so it never clashes with other transforms.
 */
export default function Parallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    let layers: Layer[] = []
    let vh = window.innerHeight
    const mouse = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    let raf = 0
    let running = false

    const render = () => {
      const sy = window.scrollY
      layers.forEach((l) => {
        const fade = l.fade ? 1 - Math.min(sy / 320, 1) : 1
        const dy = (vh / 2 - (l.base - sy)) * l.depth + cur.y * l.my * fade
        const dx = cur.x * l.mx * fade
        l.el.style.translate = `${dx.toFixed(2)}px ${dy.toFixed(2)}px`
      })
    }

    const measure = () => {
      vh = window.innerHeight
      layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).map((el) => {
        el.style.translate = 'none'
        const r = el.getBoundingClientRect()
        return {
          el,
          base: r.top + window.scrollY + r.height / 2,
          depth: Number(el.dataset.depth ?? 0),
          mx: Number(el.dataset.mx ?? 0),
          my: Number(el.dataset.my ?? 0),
          fade: el.dataset.fade !== undefined,
        }
      })
      render()
    }

    const frame = () => {
      cur.x += (mouse.x - cur.x) * 0.08
      cur.y += (mouse.y - cur.y) * 0.08
      render()
      if (Math.abs(mouse.x - cur.x) > 0.001 || Math.abs(mouse.y - cur.y) > 0.001) {
        raf = requestAnimationFrame(frame)
      } else {
        running = false
      }
    }
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5
      mouse.y = e.clientY / window.innerHeight - 0.5
      if (!running) {
        running = true
        raf = requestAnimationFrame(frame)
      }
    }

    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('scroll', render, { passive: true })
    window.addEventListener('resize', measure)
    if (fine) window.addEventListener('mousemove', onMouse, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', render)
      window.removeEventListener('resize', measure)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return null
}