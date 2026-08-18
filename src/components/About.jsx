import { about, company, milestones } from '../data/content.js'
import { Reveal, SectionHead } from '../hooks/useReveal.jsx'
import Icon from './Icons.jsx'

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div className="about__media">
          <div className="about__blob" aria-hidden="true" />
          <span className="about__watermark" aria-hidden="true">ABOUT</span>
          <Reveal className="about__img-wrap" dir="zoom">
            <div className="img-curtain about__img-frame">
              <img
                src="/image1.webp"
                alt="Tech Studio Workspace"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        <div className="about__content">
          <SectionHead eyebrow={about.eyebrow} title={about.title} />
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} as="p" className="about__para" delay={i * 80} dir="left">
              {p}
            </Reveal>
          ))}

          <div className="about__pillars">
            {about.pillars.map((pl, i) => (
              <Reveal key={pl.title} className="about__pillar" delay={i * 100} dir="up">
                <span className="about__pillar-check">
                  <Icon name="check" size={16} />
                </span>
                <div>
                  <h3>{pl.title}</h3>
                  <p>{pl.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="about__sign" delay={300} dir="up">
            <div className="about__sign-avatar">
              AT
            </div>
            <div>
              <strong>{about.signatory.name}</strong>
              <small>{about.signatory.role}</small>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
