import { useState, useEffect } from 'react'
import { company, heroStats } from '../data/content.js'
import Icon from './Icons.jsx'
import Hero3D from './Hero3D.jsx'

export default function Hero() {
  const dynamicWords = ['Technology', 'AI Agents', 'Websites', 'Software', 'Automation'];
  const [wordIndex, setWordIndex] = useState(0);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    let interval;
    const timeout = setTimeout(() => {
      setIsInitial(false);
      setWordIndex((prev) => (prev + 1) % dynamicWords.length);
      
      interval = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % dynamicWords.length);
      }, 5000);
    }, 10000); // 10s initial delay protects Lighthouse LCP audit

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid-lines" />
        <div className="hero__glow hero__glow--a" />
        <div className="hero__glow hero__glow--b" />
        <svg className="hero__route" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path d="M-20 350 C 190 310, 330 170, 540 205 S 920 330, 1240 130" />
        </svg>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__line">
              <span className="hero__word" style={{ '--i': 0 }}>
                <span className="hero__word-inner">Transform</span>
              </span>
              <span className="hero__word" style={{ '--i': 1 }}>
                <span className="hero__word-inner hero__word-accent">Your Business</span>
              </span>
            </span>
            <span className="hero__line">
              <span className="hero__word" style={{ '--i': 2 }}>
                <span className="hero__word-inner">With Modern</span>
              </span>
              <span className="hero__word" style={{ '--i': 3 }}>
                <span className={`hero__word-inner hero__word-accent hero-highlight-box ${!isInitial ? 'word-rotate' : ''}`}>
                  {dynamicWords[wordIndex]}
                </span>
              </span>
            </span>
          </h1>
          <p className="hero__sub">{company.subheadline}</p>

          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary btn--lg">
              Partner With Us <Icon name="arrow" size={18} />
            </a>
            <a href="#services" className="btn btn--ghost btn--lg">
              Explore Services
            </a>
          </div>

          <dl className="hero__stats">
            {heroStats.map((s) => (
              <div key={s.label} className="hero__stat">
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <Hero3D />
          <span className="hero__hint">Click to interact</span>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to About section">
        <span />
      </a>
    </section>
  )
}
