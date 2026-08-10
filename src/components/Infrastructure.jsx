import { infrastructure } from '../data/content.js'
import { Reveal, SectionHead } from '../hooks/useReveal.jsx'
import Icon from './Icons.jsx'

export default function Infrastructure() {
  return (
    <section className="section" id="infrastructure">
      <div className="container">
        <SectionHead
          eyebrow={infrastructure.eyebrow}
          title={infrastructure.title}
          lead={infrastructure.intro}
        />

        <div className="infra__grid">
          <Reveal className="infra__media img-curtain" dir="left">
            <img src={infrastructure.image} alt={infrastructure.imageAlt} loading="lazy" />
            <div className="infra__media-tag">
              <Icon name="warehouse" size={18} />
              Facility 1 · Pithampur
            </div>
          </Reveal>

          <div className="infra__side">
            <ul className="infra__features">
              {infrastructure.features.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 70}>
                  <span>
                    <Icon name="check" size={15} />
                  </span>
                  {f}
                </Reveal>
              ))}
            </ul>

            <Reveal className="infra__specs" delay={150}>
              {infrastructure.specs.map((s) => (
                <div key={s.label} className="infra__spec">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
