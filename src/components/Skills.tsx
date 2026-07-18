import Reveal from './Reveal'
import { skillGroups } from '../data'

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="eyebrow">// 02 — toolkit</div>
          <h2>Languages & tools</h2>
          <p>What I reach for depending on the layer of the problem.</p>
        </Reveal>

        <div className="skill-groups">
          {skillGroups.map((group) => (
            <Reveal className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
