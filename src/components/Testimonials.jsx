import { useEffect, useState } from 'react'
import { testimonials } from '../data/content.js'
import { Reveal, SectionHead } from '../hooks/useReveal.jsx'
import Icon from './Icons.jsx'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 6000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <SectionHead eyebrow="Testimonials" title="What our partners say" light center />
        <Reveal>
          <div
            className={`testi ${paused ? 'is-paused' : ''}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <span className="testi__quote-mark" aria-hidden="true">
              <Icon name="quote" size={44} />
            </span>
            <div className="testi__viewport" aria-live="polite">
              {testimonials.map((t, i) => (
                <blockquote
                  key={t.name}
                  className={`testi__slide ${
                    i === active
                      ? 'is-active'
                      : i === (active + 1) % testimonials.length
                        ? 'is-next'
                        : ''
                  }`}
                  aria-hidden={i !== active}
                >
                  <p>“{t.quote}”</p>
                  <footer>
                    <span className="testi__avatar" aria-hidden="true">
                      {t.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </span>
                    <div>
                      <strong>{t.name}</strong>
                      <small>{t.role}</small>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="testi__dots" role="tablist" aria-label="Testimonials">
              {testimonials.map((t, i) => (
                <button
                  key={`${t.name}-${i === active ? active : 'idle'}`}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Testimonial from ${t.name}`}
                  className={i === active ? 'is-active' : ''}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
