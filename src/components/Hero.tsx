import Reveal from './Reveal'

export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="hero-tag mono">BSIT — SYSTEM DEVELOPMENT · DE LA SALLE LIPA</div>
        <h1>
          Systems built to solve
          <br />
          Real <span className="accent">Problems.</span>
        </h1>
        <p className="sub">
          I'm Ludwig Rex Olarte — an IT student who likes turning messy, manual workflows
          (inventory, sales, records) into software that actually works for the people using it.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            View projects
          </a>
          <a className="btn btn-ghost" href="#contact">
            Get in touch
          </a>
        </div>

        <Reveal className="term">
          <div className="term-head">
            <span />
            <span />
            <span />
          </div>
          <div className="term-body">
            <div className="line">
              <span className="prompt">$</span> <span className="out">whoami</span>
            </div>
            <div className="line out">ludwig_rex_olarte — system developer, student</div>
            <div className="line" style={{ marginTop: 10 }}>
              <span className="prompt">$</span> <span className="out">stack --list</span>
            </div>
            <div className="line out">React · Node.js · PHP · PostgreSQL · Supabase</div>
            <div className="line" style={{ marginTop: 10 }}>
              <span className="prompt">$</span> <span className="out">status</span>
              <span className="caret" />
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  )
}
