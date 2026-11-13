import { useEffect, useRef, useState } from 'react'
import { profile, profilePhoto } from '../data'

const WORDS = ['systems', 'apps', 'tools', 'workflows']
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [wordOut, setWordOut] = useState(false)
  const [wordWidth, setWordWidth] = useState<number | undefined>()
  const [photoFailed, setPhotoFailed] = useState(false)
  const wordRef = useRef<HTMLSpanElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  /* headline word morph */
  useEffect(() => {
    const measure = () => setWordWidth(wordRef.current?.offsetWidth)
    measure()
    document.fonts?.ready.then(measure)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let swap = 0
    const timer = window.setInterval(() => {
      setWordOut(true)
      swap = window.setTimeout(() => {
        setWordIdx((i) => (i + 1) % WORDS.length)
        setWordOut(false)
      }, 350)
    }, 2800)
    return () => {
      window.clearInterval(timer)
      window.clearTimeout(swap)
    }
  }, [])

  useEffect(() => {
    setWordWidth(wordRef.current?.offsetWidth)
  }, [wordIdx])

  /* The photo morphs and flies up & left directly into the navbar avatar circle as you scroll */
  useEffect(() => {
    const photo = photoRef.current
    const inner = innerRef.current
    const avatar = document.getElementById('nav-avatar')
    if (!photo || !inner || !avatar) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let origin = { x: 0, y: 0, w: 1, h: 1 }

    const measure = () => {
      photo.style.transform = 'none'
      photo.style.opacity = '1'
      const r = photo.getBoundingClientRect()
      origin = {
        x: r.left,
        y: r.top + window.scrollY,
        w: r.width,
        h: r.height,
      }
      apply()
    }

    const apply = () => {
      const a = avatar.getBoundingClientRect()
      const scrollThreshold = 360
      const p = clamp(window.scrollY / scrollThreshold, 0, 1)
      const e = ease(p)

      // On small screens skip the morph fly — just fade the photo out
      if (window.innerWidth <= 900) {
        photo.style.transform = 'none'
        photo.style.opacity = String(Math.max(0, 1 - p * 2.5))
        inner.style.borderRadius = ''
        inner.style.aspectRatio = ''
        return
      }

      if (p >= 0.98) {
        // Fully docked: show the navbar avatar and hide the flying photo
        avatar.classList.add('docked')
        photo.style.opacity = '0'
        photo.style.pointerEvents = 'none'
      } else {
        avatar.classList.remove('docked')
        photo.style.opacity = '1'
        photo.style.pointerEvents = 'auto'

        const scale = 1 - e * (1 - a.width / origin.w)
        const tx = e * (a.left - origin.x)
        const ty = e * (a.top - origin.y + window.scrollY)

        photo.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`
        inner.style.borderRadius = `${lerp(0, 50, e)}%`
        inner.style.overflow = e > 0.05 ? 'hidden' : 'visible'
        inner.style.aspectRatio = String(lerp(0.8, 1, e))
      }
    }

    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('scroll', apply, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', apply)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            {profile.role} · {profile.school}
          </p>
      <div className="hero-word" aria-hidden="true" data-parallax data-depth="0.22" data-mx="60" data-my="30" data-fade>
        LUDWIG
      </div>
          <h1 className="hero-title">
            I build{' '}
            <span className="word-wrap" style={{ width: wordWidth }}>
              <span ref={wordRef} className={`word ${wordOut ? 'out' : ''}`}>
                {WORDS[wordIdx]}
              </span>
            </span>
            <br />
            that <em>just work.</em>
          </h1>

          <p className="hero-sub">
            I’m {profile.name} — a student who turns messy, manual workflows into software people actually use.
          </p>

          <div className="hero-actions">
            <a className="btn btn-ink" href="#projects">
              See my work
            </a>
          </div>
        </div>

            <div className="hero-photo" ref={photoRef} data-parallax data-depth="0" data-mx="-24" data-my="-16" data-fade>
          <div className="hero-photo-inner" ref={innerRef}>
            {photoFailed ? (
              <span className="hero-photo-fallback">LRO</span>
            ) : (
              <img src={profilePhoto} alt={profile.name} onError={() => setPhotoFailed(true)} />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
