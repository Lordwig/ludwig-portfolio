import { useState } from 'react'
import Reveal from './Reveal'
import { profile, profilePhoto } from '../data'

export default function About() {
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <section id="about">
      <div className="wrap about-grid">
        <Reveal className="about-text">
          <p className="label">About</p>
          <h2>
            Building with <em>intent</em>, not just finishing assignments.
          </h2>
          <p>
            I'm a <strong>BS Information Technology</strong> student at De La Salle Lipa, specializing in{' '}
            <strong>System Development</strong>. Most of what I build starts from a real, slightly annoying problem —
            an inventory tracked on paper, a market with no digital presence, records scattered across notebooks — and
            turns it into something people can rely on.
          </p>
          <p>
            I care about the parts of software that aren't glamorous but matter most: does the login flow make sense,
            does the dashboard tell you what you need at a glance, does the system survive a real user. That's where I
            spend my attention.
          </p>

          <dl className="facts">
            <div>
              <dt>Focus</dt>
              <dd>System Development</dd>
            </div>
            <div>
              <dt>School</dt>
              <dd>De La Salle Lipa</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Philippines</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Open to internships &amp; junior roles</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="about-photo">
          <figure className="photo">
            <span className="tape" />
            <div className="photo-img">
              {photoFailed ? (
                <div className="photo-fallback">LRO</div>
              ) : (
                <img src={profilePhoto} alt={profile.name} onError={() => setPhotoFailed(true)} />
              )}
            </div>
            <figcaption>{profile.firstName}, 2026</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
