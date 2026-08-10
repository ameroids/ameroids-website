import { company, navLinks, services } from '../data/content.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="/final-logo.png" alt="" height="64" />
            <div>
              <strong>{company.name}</strong>
              <small>{company.tagline}</small>
            </div>
          </div>
          <p>
            Building Websites • Developing Software • Automating Businesses with AI
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer — sections">
          <h3>Explore</h3>
          {navLinks.slice(0, 5).map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer__col">
          <h3>Services</h3>
          {services.slice(0, 5).map((s) => (
            <a key={s.title} href="#services">
              {s.title}
            </a>
          ))}
        </div>

        <div className="footer__col">
          <h3>Reach Us</h3>
          <p>
            {company.address.line1}
            <br />
            {company.address.line2}
            <br />
            {company.address.city}
          </p>
          <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </div>
      </div>

      <div className="container footer__bottom" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '16px' }}>
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p className="footer__note" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span>Delivering exceptional digital experiences.</span>
            <a href="#terms" style={{ color: 'inherit', textDecoration: 'underline' }}>Terms & Conditions</a>
          </p>
        </div>
        <p style={{ opacity: 0.25, fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.1em', marginTop: '-4px' }}>
          &gt;_ SYSTEM SECRETS: try typing our name...
        </p>
      </div>
    </footer>
  )
}
