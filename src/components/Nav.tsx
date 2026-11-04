import { useEffect, useRef, useState } from 'react'
import { profile, profilePhoto } from '../data'
import { hasCertificates, hasHonors } from '../certificates'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  ...(hasHonors ? [{ href: '#honors', label: 'Honors' }] : []),
  ...(hasCertificates ? [{ href: '#certificates', label: 'Certificates' }] : []),
  { href: '#contact', label: 'Contact' },
]

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-progress" ref={progressRef} />
      <div className="wrap nav-row">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className={`nav-avatar ${scrolled ? 'visible' : ''}`} id="nav-avatar">
            <img src={profilePhoto} alt={profile.name} className="nav-avatar-img" />
          </span>
          <span className="brand-name">{profile.name}</span>
        </a>

        <nav className={`navlinks ${open ? 'open' : ''}`} onMouseLeave={() => setPill(null)}>
          <span
            className="nav-pill"
            style={pill ? { left: pill.left, width: pill.width, opacity: 1 } : { opacity: 0 }}
            aria-hidden="true"
          />
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              onMouseEnter={(e) => setPill({ left: e.currentTarget.offsetLeft, width: e.currentTarget.offsetWidth })}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <button
            type="button"
            className="kbd"
            onClick={() => window.dispatchEvent(new Event('open-command'))}
            aria-label="Open command menu"
          >
            Search · {isMac ? '⌘K' : 'Ctrl K'}
          </button>
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </div>
  )
}