import { useEffect, useRef } from 'react'

/** Which part of the page shows which label next to the cursor */
const TARGETS: { selector: string; label: string }[] = [
  { selector: '.proj-open', label: 'View' },
  { selector: '.c3box', label: 'Drag' },
  { selector: '.fan-card', label: 'Open' },
  { selector: '.contact-email', label: 'Email' },
]
const LINKS = 'a, button, [role="button"], summary'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const label = labelRef.current
    if (!dot || !label) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const root = document.documentElement
    root.classList.add('has-cursor')

    const pos = { x: -100, y: -100 }
    const cur = { x: -100, y: -100 }
    let raf = 0
    let shown = false

    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.35
      cur.y += (pos.y - cur.y) * 0.35
      const t = `translate3d(${cur.x}px, ${cur.y}px, 0)`
      dot.style.transform = t
      label.style.transform = t
      raf = Math.abs(pos.x - cur.x) > 0.1 || Math.abs(pos.y - cur.y) > 0.1 ? requestAnimationFrame(loop) : 0
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const setMode = (target: Element | null) => {
      let mode = 'default'
      let text = ''
      if (target instanceof HTMLIFrameElement) {
        mode = 'hidden' // inside an embedded preview the normal cursor takes over
      } else if (target) {
        const hit = TARGETS.find((t) => target.closest(t.selector))
        if (hit) {
          mode = 'label'
          text = hit.label
        } else if (target.closest(LINKS)) {
          mode = 'link'
        }
      }
      dot.dataset.mode = mode
      label.dataset.mode = mode
      if (label.textContent !== text) label.textContent = text
    }

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!shown) {
        cur.x = pos.x
        cur.y = pos.y
        shown = true
        dot.classList.add('on')
        label.classList.add('on')
      }
      kick()
    }
    const onOver = (e: MouseEvent) => setMode(e.target as Element | null)
    const onDown = () => {
      dot.classList.add('down')
      label.classList.add('down')
    }
    const onUp = () => {
      dot.classList.remove('down')
      label.classList.remove('down')
    }
    const onLeave = () => {
      shown = false
      dot.classList.remove('on')
      label.classList.remove('on')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} data-mode="default" aria-hidden="true" />
      <div className="cursor-label" ref={labelRef} data-mode="default" aria-hidden="true" />
    </>
  )
}