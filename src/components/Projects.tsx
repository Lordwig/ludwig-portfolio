import Reveal from './Reveal'
import { projects } from '../data'

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">// 03 — projects</div>
          <h2>Systems I've shipped</h2>
          <p>Academic, thesis, and collaborative work — each one solving a specific, real workflow.</p>
        </Reveal>

        <div className="proj-list">
          {projects.map((project) => (
            <Reveal className="proj-card" key={project.id}>
              <div className="proj-id">
                SYS
                <span className="num">{project.id}</span>
              </div>
              <div className="proj-main">
                <h3>
                  {project.title}
                  {project.subtitle && (
                    <span className="proj-subtitle"> — {project.subtitle}</span>
                  )}
                </h3>
                <div className="proj-tags">
                  <span className="tag role">{project.role}</span>
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p>{project.description}</p>
              </div>
              <div className="proj-cta">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  View repo →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
