import { useEffect, useRef, useState } from 'react'

const MIN_MS = 1700 // the intro lasts at least this long (milliseconds)
const KEY = 'intro-seen'

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export default function Loader() {
  const [skip] = useState(() => alreadySeen() || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(skip)
  const finishRef = useRef<(() => void) | undefined>(undefined)

  useEffect(() => {
    const root = document.documentElement
    if (skip) {
      root.classList.remove('loading')
      return
    }

    document.body.style.overflow = 'hidden'
    let fontsReady = !document.fonts
    let raf = 0
    let finished = false
    const timers: number[] = []
    const start = performance.now()

    document.fonts?.ready.then(() => {
      fontsReady = true
    })
    timers.push(
      window.setTimeout(() => {
        fontsReady = true
      }, 3000),
    )

    const finish = () => {
      if (finished) return
      finished = true
      cancelAnimationFrame(raf)
      setProgress(100)
      root.classList.remove('loading')
      setLeaving(true)
      timers.push(
        window.setTimeout(() => {
          document.body.style.overflow = ''
          try {
            sessionStorage.setItem(KEY, '1')
          } catch {
            /* private mode: the intro simply shows again next time */
          }
          setGone(true)
        }, 950),
      )
    }
    finishRef.current = finish

    const tick = (now: number) => {
      const t = Math.min((now - start) / MIN_MS, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(fontsReady ? eased * 100 : Math.min(eased * 100, 88))
      if (t >= 1 && fontsReady) {
        timers.push(window.setTimeout(finish, 250))
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach((id) => window.clearTimeout(id))
      document.body.style.overflow = ''
    }
  }, [skip])

  if (gone) return null

  return (
    <div
      className={`loader ${leaving ? 'leaving' : ''}`}
      onClick={() => finishRef.current?.()}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="loader-center">
        <div className="loader-mark" aria-hidden="true">
          <span>L</span>
          <span className="accent">R</span>
          <span>O</span>
        </div>
      </div>

      <div className="loader-bottom">
        <span className="loader-count">{String(Math.round(progress)).padStart(3, '0')}</span>
        <span>System developer · Portfolio {new Date().getFullYear()}</span>
      </div>

      <div className="loader-bar">
        <i style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </div>
  )
}