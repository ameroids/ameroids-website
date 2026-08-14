import { processSteps } from '../data/content.js'
import { Reveal } from '../hooks/useReveal.jsx'
import Icon from './Icons.jsx'

export default function Process() {
  return (
    <section className="section" id="process" style={{ background: '#f8fafc', overflow: 'hidden' }}>
      <div className="container">
        <div className="process-header">
          <p className="process-eyebrow">
            <span className="dot"></span> PROCESS & WORKFLOW <span className="dot"></span>
          </p>
          <h2 className="process-title">
            From initial concept<br />
            to <span className="process-highlight">
              deployment
              <svg className="swoosh" viewBox="0 0 200 20" preserveAspectRatio="none">
                <path d="M0,15 Q100,25 200,5" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="process-lead">
            Every project follows the same disciplined six-stage workflow —<br/>
            ensuring quality and transparency at every step.
          </p>
        </div>

        <ol className="process-grid">
          {processSteps.map((p, i) => (
            <Reveal
              as="li"
              key={p.step}
              className={`process-card process-card-${i + 1}`}
              style={{ transitionDelay: `${(i % 3) * 110}ms`, '--d': `${i * 180}ms` }}
            >
              <div className="process-card-top">
                <span className="process-num">{p.step}</span>
                <div className="process-icon-circle">
                  <Icon name={p.icon} size={28} />
                </div>
              </div>
              <div className="process-card-content">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
              <div className="process-node-dot"></div>
            </Reveal>
          ))}
          
        </ol>
      </div>
    </section>
  )
}
