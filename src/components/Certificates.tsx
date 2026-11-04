import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import { certificates } from '../certificates'

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

export default function Certificates() {
  const [current, setCurrent] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d')
  const boxRef = useRef<HTMLDivElement>(null)
  const moved = useRef(false)
  const drag = useRef({ down: false, x: 0 })
  const lastWheel = useRef(0)
  const count = certificates.length

  const step = (d: number) => setCurrent((c) => clamp(c + d, 0, count - 1))

  /* drag / swipe */
  useEffect(() => {
    if (viewMode !== '3d') return
    const onMove = (e: PointerEvent) => {
      if (!drag.current.down) return
      const dx = e.clientX - drag.current.x
      if (Math.abs(dx) > 60) {
        moved.current = true
        setCurrent((c) => clamp(c + (dx < 0 ? 1 : -1), 0, count - 1))
        drag.current.x = e.clientX
      }
    }
    const onUp = () => {
      drag.current.down = false
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [count, viewMode])

  /* sideways trackpad / wheel scroll */
  useEffect(() => {
    if (viewMode !== '3d') return
    const box = boxRef.current
    if (!box) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      const now = Date.now()
      if (now - lastWheel.current > 220) {
        lastWheel.current = now
        setCurrent((c) => clamp(c + (e.deltaX > 0 ? 1 : -1), 0, count - 1))
      }
    }
    box.addEventListener('wheel', onWheel, { passive: false })
    return () => box.removeEventListener('wheel', onWheel)
  }, [count, viewMode])

  if (count === 0) return null
  const active = certificates[current]

  return (
    <section id="certificates">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="sec-head-row">
            <div>
              <p className="label">Certificates</p>
              <h2>
                Proof I <em>keep learning</em>.
              </h2>
            </div>
            <div className="cert-view-toggle">
              <button
                type="button"
                className={`cert-toggle-btn ${viewMode === '3d' ? 'active' : ''}`}
                onClick={() => setViewMode('3d')}
              >
                3D Carousel
              </button>
              <button
                type="button"
                className={`cert-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid View
              </button>
            </div>
          </div>
          <p className="lede">
            {viewMode === '3d'
              ? 'Drag, swipe or use the arrow keys to flip through in 3D. Click the centered certificate to open in full size.'
              : 'All 6 certificates displayed in an equal-sized grid. Click any certificate to inspect in high resolution.'}
          </p>
        </Reveal>

        {viewMode === '3d' ? (
          <>
            <div
              className="c3box"
              ref={boxRef}
              tabIndex={0}
              aria-label="3D Certificate carousel"
              onPointerDown={(e) => {
                drag.current = { down: true, x: e.clientX }
                moved.current = false
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') step(1)
                if (e.key === 'ArrowLeft') step(-1)
                if (e.key === 'Enter') setOpen(current)
              }}
            >
              {certificates.map((cert, i) => {
                const o = i - current
                const a = Math.abs(o)
                const isSkillsToSucceed = cert.key === 'SKILLS TO SUCCEED'
                const style: CSSProperties = {
                  transform: `translateX(calc(${o} * var(--gap))) translateZ(${-a * 110}px) rotateY(${clamp(
                    -o * 28,
                    -60,
                    60
                  )}deg) scale(${a === 0 ? 1 : 0.88})`,
                  zIndex: 100 - a,
                  opacity: a > 3 ? 0 : 1 - a * 0.2,
                  pointerEvents: a > 3 ? 'none' : 'auto',
                }
                return (
                  <button
                    key={cert.key}
                    type="button"
                    className={`c3 ${a === 0 ? 'c3-active' : ''}`}
                    style={style}
                    aria-label={cert.title}
                    onClick={() => {
                      if (moved.current) return
                      if (i !== current) setCurrent(i)
                      else setOpen(i)
                    }}
                  >
                    <div className="c3-frame">
                      <img
                        src={cert.url}
                        alt={cert.title}
                        draggable={false}
                        className={isSkillsToSucceed ? 'c3-opt-scale' : undefined}
                      />
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="c3info">
              <div>
                <strong>{active.title}</strong>
                <small>{[active.issuer, active.date].filter(Boolean).join(' · ')}</small>
                {active.kind && <small className="c3kind">{active.kind}</small>}
              </div>
              <div className="c3nav">
                <span className="c3count">
                  {String(current + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
                <button type="button" aria-label="Previous certificate" onClick={() => step(-1)}>
                  ←
                </button>
                <button type="button" aria-label="Next certificate" onClick={() => step(1)}>
                  →
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="cert-grid">
            {certificates.map((cert, i) => {
              const isSkillsToSucceed = cert.key === 'SKILLS TO SUCCEED'
              return (
                <div
                  key={cert.key}
                  className="cert-card"
                  onClick={() => setOpen(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${cert.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setOpen(i)
                    }
                  }}
                >
                  <div className="cert-thumb">
                    <img
                      src={cert.url}
                      alt={cert.title}
                      loading="lazy"
                      draggable={false}
                      className={isSkillsToSucceed ? 'cert-img-opt' : undefined}
                    />
                    <div className="cert-overlay">
                      <span className="cert-zoom-btn">View Certificate ↗</span>
                    </div>
                  </div>

                  <div className="cert-info">
                    <div className="cert-title-row">
                      <h3 className="cert-title">{cert.title}</h3>
                    </div>
                    <div className="cert-meta">
                      <span>{cert.issuer}</span>
                      {cert.date && <span className="cert-dot">·</span>}
                      <span>{cert.date}</span>
                    </div>
                    {cert.kind && <div className="cert-badge">{cert.kind}</div>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {open !== null && (
        <Lightbox items={certificates} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
      )}
    </section>
  )
}
