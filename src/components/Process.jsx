import { processSteps } from '../data/content.js'
import { Reveal, SectionHead } from '../hooks/useReveal.jsx'

export default function Process() {
  return (
    <section className="section section--tint" id="process">
      <div className="container">
        <SectionHead
          eyebrow="Process & Workflow"
          title="From factory gate to proof of delivery"
          lead="Every shipment follows the same disciplined six-stage workflow — auditable at every step."
        />
        <ol className="process">
          {processSteps.map((p, i) => (
            <Reveal
              as="li"
              key={p.step}
              className="process__step"
              style={{ transitionDelay: `${(i % 3) * 110}ms`, '--d': `${i * 180}ms` }}
            >
              <span className="process__num">{p.step}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
