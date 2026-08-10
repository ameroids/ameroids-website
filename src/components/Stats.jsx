import { useEffect, useRef, useState } from 'react'
import { stats, dispatchTicker } from '../data/content.js'
import { useReveal, Reveal, SectionHead } from '../hooks/useReveal.jsx'
import NetworkScene from './NetworkScene.jsx'

function formatValue(value, decimals = 0) {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function Counter({ value, suffix = '', decimals = 0, duration = 1800 }) {
  const [ref, visible] = useReveal(0.4)
  const [display, setDisplay] = useState(formatValue(0, decimals))
  const done = useRef(false)

  useEffect(() => {
    if (!visible || done.current) return
    done.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(formatValue(value, decimals))
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(formatValue(value * eased, decimals))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, value, decimals, duration])

  return (
    <span ref={ref} className="stat__value">
      {display}
      <em>{suffix}</em>
    </span>
  )
}

export default function Stats() {
  return (
    <section className="section stats" id="operations">
      <div className="stats__texture" aria-hidden="true" />
      <NetworkScene />
      <div className="container">
        <SectionHead
          eyebrow="Operations at a Glance"
          title="The numbers behind two decades of reliability"
          lead="Live operational metrics from across our warehousing and distribution network."
          light
        />
        <div className="stats__grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} className="stat" delay={(i % 3) * 100} data-tilt>
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
              <h3>{s.label}</h3>
              <p>{s.sub}</p>
              <span className="stat__bar" aria-hidden="true" />
            </Reveal>
          ))}
        </div>

        <Reveal className="stats__ticker" delay={250} aria-hidden="true">
          <span className="stats__ticker-label">Live floor</span>
          <div className="stats__ticker-marquee">
            <div className="stats__ticker-track">
              {[...dispatchTicker, ...dispatchTicker].map((t, i) => (
                <span key={i}>
                  {t}
                  <i />
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
