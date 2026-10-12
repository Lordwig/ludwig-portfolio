import { useState, type CSSProperties, type KeyboardEvent } from 'react'
import Reveal from './Reveal'
import BrowserFrame from './BrowserFrame'
import ProjectModal from './ProjectModal'
import { projects, displayUrl, type Project } from '../data'

const cardAccents = ['var(--blue)', 'var(--coral)', 'var(--sun)', 'var(--ink)']

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  const onKey = (e: KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSelected(project)
    }
  }

  return (
    <section id="projects">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="label">Selected work</p>
          <h2>
            Things I've <em>built</em>.
          </h2>
          <p className="lede">Hover a project to peek inside. Click to open it.</p>
        </Reveal>

        {projects.map((project, i) => (
          <article
            key={project.id}
            className={`proj ${i % 2 ? 'flip' : ''}`}
            style={{ '--card-accent': cardAccents[i % cardAccents.length] } as CSSProperties}
          >
            <Reveal className="proj-visual">
              <div
                className="proj-open"
                role="button"
                tabIndex={0}
                aria-label={`Open ${project.title} preview`}
                onClick={() => setSelected(project)}
                onKeyDown={(e) => onKey(e, project)}
              >
                <BrowserFrame
                  url={displayUrl(project)}
                  title={project.title}
                  src={project.screenshots[0]}
                  scrollOnHover
                />
                <span className="proj-hint">{project.liveUrl ? 'Open live preview' : 'Open project'} ↗</span>
              </div>
            </Reveal>

            <Reveal className="proj-info">
              <span className="proj-num">{project.id}</span>
              <h3>
                {project.title}
                {project.subtitle && <span className="proj-subtitle"> · {project.subtitle}</span>}
              </h3>
              <p>{project.description}</p>
              <div className="chips">
                <span className="chip chip-role">{project.role}</span>
                {project.tags.map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="proj-actions">
                <button type="button" className="btn btn-ink" onClick={() => setSelected(project)}>
                  Explore project
                </button>
                {project.liveUrl && (
                  <a className="btn btn-line" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    See live ↗
                  </a>
                )}
                <a className="btn btn-line" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  Repo ↗
                </a>
              </div>
            </Reveal>
          </article>
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
