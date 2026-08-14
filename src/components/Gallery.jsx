import { useState } from 'react'
import { gallery } from '../data/content.js'
import { Reveal, SectionHead } from '../hooks/useReveal.jsx'

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = gallery[activeIndex]

  return (
    <section className="section" id="gallery">
      <div className="container">
        <SectionHead
          eyebrow="Gallery"
          title="Our Digital Solutions"
          lead="Explore our portfolio of high-performance software, AI integrations, and digital platforms."
        />
        
        {/* Thumbnails row */}
        <div className="gallery-thumbs">
          {gallery.map((g, i) => (
            <button 
              key={g.src}
              className={`gallery-thumb ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View ${g.caption}`}
            >
              <img src={g.src} alt={g.caption} loading="lazy" />
            </button>
          ))}
        </div>

        {/* Featured area */}
        <div className="gallery-featured">
          <Reveal className="gallery-featured__image" dir="right">
            <img src={activeImage.src} alt={activeImage.caption} />
          </Reveal>
          
          <Reveal className="gallery-featured__info" dir="left" delay={150}>
            <div className="gallery-info-block">
              <h4>PROJECT</h4>
              <p>{activeImage.caption}</p>
            </div>
            <div className="gallery-info-block">
              <h4>DETAILS</h4>
              <p>Explore our cutting-edge approach to delivering high-quality tech solutions, tailored specifically for modern businesses.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
