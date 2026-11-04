import { useEffect, useRef } from 'react'

const TEXT = 'I turn messy, manual workflows into systems that people rely on every single day.'
const WORDS = TEXT.split(' ')
const clamp = (v: number) => Math.min(1, Math.max(0, v))

export default function Statement() {
  const wrapRef = useRef<HTMLParagraphElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const update = () => {
      const el = wrapRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const progress = clamp((window.innerHeight * 0.85 - r.top) / (window.innerHeight * 0.5 + r.height))
      const lit = progress * (WORDS.length + 2)
      wordRefs.current.forEach((w, i) => {
        if (w) w.style.opacity = String(reduce ? 1 : 0.18 + 0.82 * clamp(lit - i))
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

  return (
    <div className="statement">
      <div className="wrap">
        <p ref={wrapRef}>
          {WORDS.map((word, i) => (
            <span
              key={i}
              className="statement-word"
              ref={(el) => {
                wordRefs.current[i] = el
              }}
            >
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}