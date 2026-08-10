import { useEffect, useState } from 'react'
import { company, navLinks } from '../data/content.js'
import { PhoneCall, Check } from 'lucide-react'

function Logo() {
  return (
    <a href="#top" className="logo" aria-label={`${company.name} — home`}>
      <span className="logo__mark" aria-hidden="true">
        <img src="/final-logo.png" alt="" height="54" />
      </span>
      <span className="logo__text">
        <strong>Ameroids Tech Studio</strong>
        <small>Exploring Infinite Possibilities</small>
      </span>
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [callStage, setCallStage] = useState('idle')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleContactClick = (e) => {
    e.preventDefault()
    if (callStage !== 'idle') return
    setCallStage('ringing')

    setTimeout(() => {
      setCallStage('pickup')
      
      setTimeout(() => {
        setCallStage('closing')
        const contactEl = document.getElementById('contact')
        if (contactEl) contactEl.scrollIntoView({ behavior: 'instant' })
        setOpen(false)
        
        setTimeout(() => {
          setCallStage('idle')
        }, 500)
      }, 1000)
    }, 2000)
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
        <div className="container nav__inner">
          <Logo />
          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={active === l.id ? 'is-active' : ''}
                aria-current={active === l.id ? 'true' : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn btn--primary nav__cta" onClick={handleContactClick}>
            Contact Us
          </a>
          <button
            className={`nav__burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`nav__drawer ${open ? 'is-open' : ''}`}>
          <nav aria-label="Mobile">
            {navLinks.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                style={{ transitionDelay: `${60 + i * 40}ms` }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn--primary"
              style={{ transitionDelay: '420ms' }}
              onClick={handleContactClick}
            >
              Contact Us
            </a>
          </nav>
        </div>
      </header>
      
      {callStage !== 'idle' && (
        <div className={`call-overlay ${callStage}`} aria-hidden="true">
          <div className="call-overlay__content">
            <div className="call-overlay__avatar">
              {callStage === 'ringing' ? <PhoneCall size={32} className="call-icon-ringing" /> : <Check size={32} />}
            </div>
            <div className="call-overlay__text">
              {callStage === 'ringing' ? 'Connecting to Ameroids Tech Studio...' : 'Connected'}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
