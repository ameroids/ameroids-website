import { useState } from 'react'
import { company } from '../data/content.js'
import { Reveal, SectionHead } from '../hooks/useReveal.jsx'
import Icon from './Icons.jsx'

const infoItems = [
  {
    icon: 'phone',
    label: 'Call Us',
    lines: [company.phone, company.phoneAlt],
    href: `tel:${company.phone.replace(/\s/g, '')}`,
  },
  {
    icon: 'mail',
    label: 'Email',
    lines: [company.email, company.hours],
    href: `mailto:${company.email}`,
  },
  {
    icon: 'pin',
    label: 'Visit Us',
    lines: [company.address.line1, `${company.address.line2}, ${company.address.city}`],
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (sending) return
    
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const company = formData.get('company')
    const phone = formData.get('phone')
    const email = formData.get('email')
    const subject = formData.get('subject')
    const message = formData.get('message')

    const whatsappMessage = `Hello, I'm interested in ${subject}.
Name: ${name}
Company: ${company || 'N/A'}
Phone: ${phone}
Email: ${email || 'N/A'}

Message:
${message}`

    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/917223861653?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
    setSent(true)
  }

  return (
    <section className="section section--tint" id="contact">
      <div className="container">
        <SectionHead
          eyebrow="Contact Us"
          title="Let's move your business forward"
          lead="Looking for Tech Services, Website Development or AI Automation? Our team responds within one working day."
        />

        <div className="contact__grid">
          <Reveal className="contact__info" dir="left">
            {infoItems.map((item) => (
              <div className="contact__card" key={item.label} data-tilt>
                <span className="contact__card-icon">
                  <Icon name={item.icon} size={22} />
                </span>
                <div>
                  <h3>{item.label}</h3>
                  {item.lines.map((l) =>
                    item.href ? (
                      <a key={l} href={item.href}>
                        {l}
                      </a>
                    ) : (
                      <p key={l}>{l}</p>
                    ),
                  )}
                </div>
              </div>
            ))}
            <div className="contact__map">
              <iframe
                src={company.mapEmbedUrl}
                title="Facility location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal className="contact__form-wrap" dir="right" delay={120}>
            {sent ? (
              <div className="contact__success" role="status">
                <span>
                  <Icon name="check" size={28} />
                </span>
                <h3>Message received</h3>
                <p>
                  Thank you for reaching out. Our operations team will get back to you within one
                  working day.
                </p>
                <button className="btn btn--ghost" onClick={() => setSent(false)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={onSubmit}>
                <div className="form__row">
                  <div className="form__field">
                    <label htmlFor="cf-name">Full Name</label>
                    <input id="cf-name" name="name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="form__field">
                    <label htmlFor="cf-company">Company</label>
                    <input id="cf-company" name="company" type="text" placeholder="Company name" />
                  </div>
                </div>
                <div className="form__row">
                  <div className="form__field">
                    <label htmlFor="cf-phone">Phone</label>
                    <input
                      id="cf-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                  <div className="form__field">
                    <label htmlFor="cf-email">Email</label>
                    <input id="cf-email" name="email" type="email" placeholder="you@company.com" />
                  </div>
                </div>
                <div className="form__field">
                  <label htmlFor="cf-subject">I'm interested in</label>
                  <select id="cf-subject" name="subject" defaultValue="Website Development">
                    <option>Website Development</option>
                    <option>Custom Software Development</option>
                    <option>AI Automation</option>
                    <option>UI/UX Design</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form__field">
                  <label htmlFor="cf-message">Message</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows="4"
                    placeholder="Tell us briefly about your requirement…"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn--primary btn--lg form__submit"
                  disabled={sending}
                >
                  {sending ? (
                    <span className="form__truck" aria-label="Sending">
                      <Icon name="truck" size={22} />
                    </span>
                  ) : (
                    <>
                      Send Message <Icon name="arrow" size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
