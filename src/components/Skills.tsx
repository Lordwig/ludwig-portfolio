import type { CSSProperties } from 'react'
import Reveal from './Reveal'
import RadarChart from './RadarChart'
import { skillGroups, radarSkills } from '../data'

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="label">Toolkit</p>
          <h2>
            What I <em>reach for</em>.
          </h2>
          <p className="lede">Self-assessed, and updated as I learn.</p>
        </Reveal>

        <div className="skills-layout">
          <Reveal className="radar-card">
            <RadarChart data={radarSkills} />
          </Reveal>

          <div className="skill-groups">
            {skillGroups.map((group) => (
              <Reveal className="skill-card" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((skill) => (
                    <li key={skill.name}>
                      <div className="meter-row">
                        <span>{skill.name}</span>
                        <span className="meter-val">{skill.level}%</span>
                      </div>
                      <div className="meter">
                        <div className="meter-fill" style={{ '--level': `${skill.level}%` } as CSSProperties} />
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
