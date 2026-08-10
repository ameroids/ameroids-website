import { useEffect, useState } from 'react'
import { gallery } from '../data/content.js'
import { Reveal, SectionHead } from '../hooks/useReveal.jsx'

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => e.key === 'Escape' && setLightbox(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <section className="section" id="gallery">
      <div className="container">
        <SectionHead
          eyebrow="Gallery"
          title="Inside our facilities"
          lead="A glimpse of the racks, docks and fleet that move thousands of shipments every day. Click any photo to view it full size."
        />
        <div className="gallery">
          {gallery.map((g, i) => (
            <Reveal
              as="figure"
              key={g.src}
              className={`gallery__item ${g.tall ? 'gallery__item--tall' : ''}`}
              delay={(i % 3) * 80}
              data-tilt
              data-parallax="0.2"
              role="button"
              tabIndex={0}
              aria-label={`View full size: ${g.caption}`}
              onClick={() => setLightbox(g)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setLightbox(g)
                }
              }}
            >
              <img src={g.src} alt={g.caption} loading="lazy" />
              <figcaption>{g.caption}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.caption}
          onClick={() => setLightbox(null)}
        >
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src.replace('w=900', 'w=1600')} alt={lightbox.caption} />
            <figcaption>{lightbox.caption}</figcaption>
          </figure>
          <button
            className="lightbox__close"
            aria-label="Close full-size view"
            onClick={() => setLightbox(null)}
            autoFocus
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}
