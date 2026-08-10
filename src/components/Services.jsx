import { services } from '../data/content.js'
import { Reveal, SectionHead } from '../hooks/useReveal.jsx'
import Icon from './Icons.jsx'

export default function Services() {
  return (
    <section className="section section--tint" id="services">
      <div className="container">
        <SectionHead
          eyebrow="Our Services"
          title="Everything between the factory gate and the shop shelf"
          lead="A complete tech and automation stack — so businesses get one accountable partner instead of five vendors."
        />
        <div className="services__grid">
          {services.map((s, i) => (
            <Reveal key={s.title} className="service-row" delay={(i % 2) * 90}>
              <span className="service-row__icon">
                <Icon name={s.icon} />
              </span>
              <div className="service-row__body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
