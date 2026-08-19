import { company, navLinks, services } from '../data/content.js'
import Icon from './Icons.jsx'
import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="/final-logo1.png" alt="" height="64" />
            <div>
              <strong>{company.name}</strong>
              <small>{company.tagline}</small>
            </div>
          </div>
          <p>
            Building Digital Experiences. Powering Businesses with AI.
          </p>
          <div className="footer__socials">
            <a href="#twitter" aria-label="Twitter"><Icon name="twitter" size={20} /></a>
            <a href="#linkedin" aria-label="LinkedIn"><Icon name="linkedin" size={20} /></a>
            <a href="#github" aria-label="GitHub"><Icon name="github" size={20} /></a>
          </div>
        </div>

        <nav className="footer__col" aria-label="Footer — sections">
          <h3>Explore</h3>
          {navLinks.slice(0, 5).map((l) => (
            <a key={l.id} href={`/#${l.id}`}>
              {l.label}
            </a>
          ))}
          <Link to="/blog">Blog</Link>
        </nav>

        <div className="footer__col">
          <h3>Services</h3>
          {services.slice(0, 5).map((s) => (
            <a key={s.title} href="/#services">
              {s.title}
            </a>
          ))}
        </div>

        <div className="footer__col footer__newsletter-col">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest tech insights.</p>
          <form className="footer__newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="container footer__bottom" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '16px' }}>
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p className="footer__note" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span>Delivering exceptional digital experiences.</span>
            <a href="/#terms" style={{ color: 'inherit', textDecoration: 'underline' }}>Terms & Conditions</a>
          </p>
        </div>
        <p style={{ opacity: 0.25, fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.1em', marginTop: '-4px' }}>
          &gt;_ SYSTEM SECRETS: try typing our name...
        </p>
      </div>
    </footer>
  )
}
