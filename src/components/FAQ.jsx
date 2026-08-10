import { useState } from 'react'
import { faqs } from '../data/content.js'
import { Reveal, SectionHead } from '../hooks/useReveal.jsx'
import Icon from './Icons.jsx'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <SectionHead
          eyebrow="FAQ"
          title="Frequently asked questions"
          lead="Answers to what principal companies and distributor partners ask us most often."
        />
        <div className="faq">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} className={`faq__item ${isOpen ? 'is-open' : ''}`} delay={i * 50}>
                <h3>
                  <button
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {f.q}
                    <span className="faq__chevron">
                      <Icon name="chevron" size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  className="faq__a"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                >
                  <div className="faq__a-inner">
                    <p>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
