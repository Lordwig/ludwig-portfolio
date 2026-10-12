import { useEffect, useRef, useState } from 'react'
import BrowserFrame from './BrowserFrame'
import { displayUrl, type Project } from '../data'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const [tab, setTab] = useState<'live' | 'shots'>(project.liveUrl ? 'live' : 'shots')
  const [failed, setFailed] = useState<string[]>([])
  const [shotIdx, setShotIdx] = useState(0)

  const shots = project.screenshots.filter((s) => !failed.includes(s))
  const current = shots[Math.min(shotIdx, Math.max(shots.length - 1, 0))]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const markFailed = (src: string) => setFailed((prev) => (prev.includes(src) ? prev : [...prev, src]))

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close project">
          Close ✕
        </button>

        <p className="label">Project {project.id}</p>
        <h3 id="modal-title">
          {project.title}
          {project.subtitle && <span className="proj-subtitle"> · {project.subtitle}</span>}
        </h3>

        {project.liveUrl && project.screenshots.length > 0 && (
          <div className="tabs" role="tablist">
            <button type="button" aria-pressed={tab === 'live'} onClick={() => setTab('live')}>
              Live preview
            </button>
            <button type="button" aria-pressed={tab === 'shots'} onClick={() => setTab('shots')}>
              Screenshots
            </button>
          </div>
        )}

        {tab === 'live' && project.liveUrl ? (
          <>
            <BrowserFrame url={displayUrl(project)} title={project.title}>
              <iframe
                src={project.liveUrl}
                title={`${project.title} live preview`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </BrowserFrame>
            <p className="modal-note">
              Preview blank? Some sites block embedding —{' '}
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                open it in a new tab ↗
              </a>
            </p>
          </>
        ) : (
          <>
            <BrowserFrame key={current ?? 'none'} url={displayUrl(project)} title={project.title} src={current} />
            {project.screenshots.length > 1 && (
              <div className="thumbs">
                {project.screenshots.map((src) => {
                  if (failed.includes(src)) return null
                  return (
                    <button
                      type="button"
                      key={src}
                      className={src === current ? 'active' : ''}
                      onClick={() => setShotIdx(shots.indexOf(src))}
                      aria-label="Show screenshot"
                    >
                      <img src={src} alt="" onError={() => markFailed(src)} />
                    </button>
                  )
                })}
              </div>
            )}
          </>
        )}

        <p className="modal-desc">{project.description}</p>

        <h4 className="label">Key features</h4>
        <ul className="modal-features">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div className="chips">
          <span className="chip chip-role">{project.role}</span>
          {project.tags.map((tag) => (
            <span className="chip" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="modal-actions">
          <a className="btn btn-ink" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
            View repo ↗
          </a>
          {project.liveUrl && (
            <a className="btn btn-line" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Open live site ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
