import { whyUs } from '../data/content.js'
import { Reveal, SectionHead } from '../hooks/useReveal.jsx'
import Icon from './Icons.jsx'

export default function WhyUs() {
  return (
    <section className="section" id="why-us">
      <div className="container">
        <SectionHead
          eyebrow="Why Choose Us"
          title="Why modern businesses trust our team"
          lead="Software development is a craft of complex details executed perfectly, every single day. Here is how we deliver excellence."
        />
        <div className="why__grid">
          {whyUs.map((w, i) => (
            <Reveal
              key={w.title}
              className="why__item"
              delay={(i % 2) * 90}
              style={{ transitionDelay: `${(i % 2) * 90}ms`, '--d': `${i * 110}ms` }}
            >
              <span className="why__icon">
                <Icon name={w.icon} size={24} />
              </span>
              <div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
