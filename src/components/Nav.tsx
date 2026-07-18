import { useState } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="statusbar">
      <div className="wrap statusbar-row">
        <div className="status-left">
          <span className="dot" />
          <span className="mono">system_status: available for work</span>
        </div>

        <nav className={`navlinks ${open ? 'open' : ''}`} id="navlinks">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>
    </div>
  )
}
