import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">// 01 — about</div>
          <h2>Building with intent, not just finishing assignments.</h2>
        </Reveal>

        <div className="about-grid">
          <Reveal>
            <p>
              I'm a <strong>BS Information Technology</strong> student at De La Salle Lipa,
              specializing in <strong>System Development</strong>. Most of what I build starts
              from a real, slightly annoying problem — an inventory that's tracked on paper, a
              market with no digital presence, records scattered across notebooks — and turns it
              into something people can actually rely on.
            </p>
            <p>
              I care about the parts of software that aren't glamorous but matter most: does the
              login flow make sense, does the dashboard tell you what you need at a glance, does
              the system survive contact with a real user. That's where I spend most of my
              attention.
            </p>
            <p>
              Outside of coursework, I'm sharpening my web development and system analysis skills
              through personal projects, and looking for opportunities to build alongside a team
              on something that ships.
            </p>
          </Reveal>

          <Reveal className="info-card">
            <div className="info-row">
              <span>Status</span>
              <span style={{ color: 'var(--accent)' }}>Open to work</span>
            </div>
            <div className="info-row">
              <span>Focus</span>
              <span>System Development</span>
            </div>
            <div className="info-row">
              <span>School</span>
              <span>De La Salle Lipa</span>
            </div>
            <div className="info-row">
              <span>Based in</span>
              <span>Philippines</span>
            </div>
            <div className="info-row">
              <span>GitHub</span>
              <span>@lordwig</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
