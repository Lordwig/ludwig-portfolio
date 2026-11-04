import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import { honors } from '../certificates'

const clamp = (v: number) => Math.min(1, Math.max(0, v))
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export default function Honors() {
  const [open, setOpen] = useState<number | null>(null)
  const fanRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])

  /* the cards start stacked and fan out as the section scrolls into view */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const update = () => {
      const fan = fanRef.current
      if (!fan) return
      const r = fan.getBoundingClientRect()
      const p = reduce ? 1 : ease(clamp((window.innerHeight * 0.9 - r.top) / (window.innerHeight * 0.55)))
      const n = honors.length
      const gap = Math.min(300, (Math.min(window.innerWidth, 1000) - 260) / Math.max(n - 1, 1))
      const centre = (n - 1) / 2
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const o = i - centre
        el.style.transform = `translate(${o * gap * p}px, ${Math.abs(o) * 18 * p}px) rotate(${o * 9 * p}deg)`
        el.style.zIndex = String(Math.round(n - Math.abs(o)))
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  if (honors.length === 0) return null

  return (
    <section id="honors">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="label">Honors</p>
          <h2>
            Recognized for <em>academic excellence</em>.
          </h2>
          <p className="lede">Keep scrolling and the certificates fan out. Click one to read it.</p>
        </Reveal>

        <div className="fan" ref={fanRef}>
          {honors.map((honor, i) => (
            <button
              key={honor.key}
              type="button"
              className="fan-card"
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              onClick={() => setOpen(i)}
              aria-label={`View ${honor.title}`}
            >
              <img src={honor.url} alt={honor.title} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {open !== null && <Lightbox items={honors} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
    </section>
  )
}