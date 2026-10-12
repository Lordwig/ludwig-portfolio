import { skillGroups, profile } from '../data'

const tools = Array.from(new Set(skillGroups.flatMap((group) => group.items.map((item) => item.name))))

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <p className="hero-kicker">
          {profile.role} · {profile.school}
        </p>

        <h1 className="hero-title">
          <span>I build systems</span>
          <span>
            that <em>just work.</em>
          </span>
        </h1>

        <p className="hero-sub">
          I'm {profile.name} — a student who turns messy, manual workflows into software people actually use.
        </p>

        <div className="hero-actions">
          <a className="btn btn-ink" href="#projects">
            See my work
          </a>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...tools, ...tools].map((tool, i) => (
            <span key={i}>{tool}</span>
          ))}
        </div>
      </div>
    </header>
  )
}
