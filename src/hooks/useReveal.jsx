import { useEffect, useRef, useState } from 'react'

/** Returns [ref, visible] — visible flips true once the element enters the viewport. */
export function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return [ref, visible]
}

/**
 * Scroll-reveal wrapper.
 *  - `delay` (ms) staggers siblings
 *  - `dir`: 'up' (default) | 'left' | 'right' | 'zoom' — entrance direction
 */
export function Reveal({ children, delay = 0, dir, as: Tag = 'div', className = '', ...rest }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      data-dir={dir}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * Section header: quiet wayfinding label + title + optional lead text.
 * Deliberately static — scroll motion is reserved for lists and imagery,
 * not repeated on every heading.
 */
export function SectionHead({ eyebrow, title, lead, light = false, center = false }) {
  return (
    <div
      className={`section-head ${light ? 'section-head--light' : ''} ${
        center ? 'section-head--center' : ''
      }`}
    >
      {eyebrow && <p className="section-label">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  )
}
