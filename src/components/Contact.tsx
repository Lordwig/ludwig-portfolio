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
    <section id="contact" className="contact">
      <div className="wrap">
        <Reveal className="eyebrow">// 04 — contact</Reveal>
        <Reveal>
          <h2>Have a system worth building? Let's talk.</h2>
        </Reveal>
        <Reveal>
          <p>
            Open to internships, junior roles, and collaborative projects — especially anything
            involving real-world workflows.
          </p>
        </Reveal>

        <Reveal className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${contact.email}`}>
            Email me
          </a>
          <button className="btn btn-ghost" type="button" onClick={handleCopy}>
            {copyLabel}
          </button>
          <a className="btn btn-ghost" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="btn btn-ghost" href={contact.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Reveal>

        <p className="mono email-fallback">{contact.email}</p>
      </div>
    </section>
  )
}
