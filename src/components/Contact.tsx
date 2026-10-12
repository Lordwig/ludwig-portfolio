import { useState } from 'react'
import Reveal from './Reveal'
import { contact } from '../data'

export default function Contact() {
  const [copyLabel, setCopyLabel] = useState('Copy email')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopyLabel('Copied!')
    } catch {
      setCopyLabel(contact.email)
    }
    setTimeout(() => setCopyLabel('Copy email'), 2000)
  }

  return (
    <section id="contact">
      <div className="wrap">
        <Reveal className="contact-card">
          <p className="label">Contact</p>
          <h2>
            Have a system worth <em>building</em>? Let's talk.
          </h2>
          <p className="lede">
            Open to internships, junior roles, and collaborative projects — especially anything involving real-world
            workflows.
          </p>

          <a className="contact-email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>

          <div className="contact-actions">
            <a className="btn btn-ink" href={`mailto:${contact.email}`}>
              Email me
            </a>
            <button className="btn btn-line" type="button" onClick={handleCopy}>
              {copyLabel}
            </button>
            <a className="btn btn-line" href={contact.resume} target="_blank" rel="noopener noreferrer">
              Resume ↗
            </a>
            <a className="btn btn-line" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a className="btn btn-line" href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
