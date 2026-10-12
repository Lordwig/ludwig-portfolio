import { useState } from 'react'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import { certificates } from '../certificates'

export default function Certificates() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="certificates">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="label">Certificates &amp; Credentials</p>
          <h2>
            Verified <em>Credentials</em>.
          </h2>
          <p className="lede">
            Industry-recognized certifications and professional coursework validating technical proficiency and continuous learning.
          </p>
        </Reveal>

        <div className="cert-grid">
          {certificates.map((cert, i) => (
            <Reveal key={cert.key}>
              <div
                role="button"
                tabIndex={0}
                className="cert-card"
                onClick={() => setOpen(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setOpen(i)
                  }
                }}
                aria-label={`View certificate: ${cert.title}`}
              >
                <div className="cert-card-visual">
                  <img src={cert.url} alt={cert.title} loading="lazy" />
                  <div className="cert-overlay">
                    <span className="cert-view-btn">
                      <span>View Credential</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6" />
                        <path d="M10 14L21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                    </span>
                  </div>
                  <span className="cert-verified-pill">
                    <span className="cert-pulse-dot" />
                    Verified
                  </span>
                </div>

                <div className="cert-card-body">
                  <div className="cert-issuer-row">
                    <span className="cert-issuer-badge">{cert.issuer}</span>
                    {cert.year && <span className="cert-year-tag">{cert.year}</span>}
                  </div>

                  <h3 className="cert-title">{cert.title}</h3>

                  {cert.credentialId && (
                    <div className="cert-id-tag">
                      <span className="cert-id-label">ID:</span>
                      <code>{cert.credentialId}</code>
                    </div>
                  )}

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="cert-skills-chips">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="cert-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {open !== null && (
        <Lightbox items={certificates} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
      )}
    </section>
  )
}
