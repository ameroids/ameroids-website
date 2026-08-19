import { useEffect, useRef, useState } from 'react'

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ── Page-load intro: three ribbon loops fly in and interlock into
      the Ameroids knot mark, then the curtain lifts into the hero ── */
const SPLASH_LEAVE = 1000
const SPLASH_DONE = 1800

export function Preloader() {
  const [phase, setPhase] = useState('loading')
  const pctRef = useRef(null)

  useEffect(() => {
    if (reducedMotion()) {
      setPhase('done')
      return
    }
    document.body.classList.add('is-loading')
    const t1 = setTimeout(() => {
      setPhase('leaving')
      document.body.classList.remove('is-loading')
    }, SPLASH_LEAVE)
    const t2 = setTimeout(() => setPhase('done'), SPLASH_DONE)

    let raf = 0
    const start = performance.now()
    const loop = () => {
      const t = performance.now() - start
      if (pctRef.current) {
        const pct = Math.min((t / 1750) * 100, 100) | 0
        pctRef.current.textContent = `${pct}%`
      }
      if (t < 2500) {
        raf = requestAnimationFrame(loop)
      }
    }
    loop()

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      cancelAnimationFrame(raf)
      document.body.classList.remove('is-loading')
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`preloader ${phase === 'leaving' ? 'is-leaving' : ''}`} aria-hidden="true">
      <div className="preloader__tech-spinner">
        <div className="tech-ring ring-1"></div>
        <div className="tech-ring ring-2"></div>
        <div className="tech-core"></div>
      </div>
      <div className="preloader__inner">
        <p className="preloader__word">
          <span>Ameroids</span> <span>Tech Studio</span>
        </p>
        <div className="preloader__meta">
          <span className="preloader__line" />
          <b className="preloader__pct" ref={pctRef}>
            0%
          </b>
        </div>
      </div>
    </div>
  )
}

/* ── Thin scroll-progress bar under the navbar ─────────────────── */
export function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      if (ref.current) {
        ref.current.style.transform = `scaleX(${max ? doc.scrollTop / max : 0})`
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />
}

/* ── Magnetic pull on buttons — desktop pointers only ──────────── */
export function Magnetic() {
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia('(pointer: fine)').matches) return

    const MAX = 6
    const PULL = 0.22

    const onMove = (e) => {
      const btn = e.currentTarget
      const r = btn.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) * PULL
      const dy = (e.clientY - (r.top + r.height / 2)) * PULL
      btn.style.setProperty('--mx', `${Math.max(-MAX, Math.min(MAX, dx))}px`)
      btn.style.setProperty('--my', `${Math.max(-MAX, Math.min(MAX, dy))}px`)
    }
    const onLeave = (e) => {
      e.currentTarget.style.setProperty('--mx', '0px')
      e.currentTarget.style.setProperty('--my', '0px')
    }
    const onOver = (e) => {
      const btn = e.target.closest('.btn')
      if (!btn || btn.dataset.magnet) return
      btn.dataset.magnet = '1'
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
    }

    document.addEventListener('mouseover', onOver, { passive: true })
    return () => document.removeEventListener('mouseover', onOver)
  }, [])

  return null
}

/* ── 3D tilt on [data-tilt] elements — desktop pointers only ───── */
export function Tilt() {
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia('(pointer: fine)').matches) return

    const MAX = 6.5
    const onMove = (e) => {
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(900px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg)`
    }
    const onLeave = (e) => {
      e.currentTarget.style.transform = ''
    }
    const onOver = (e) => {
      const el = e.target.closest('[data-tilt]')
      if (!el || el.dataset.tiltBound) return
      el.dataset.tiltBound = '1'
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
    }

    document.addEventListener('pointerover', onOver, { passive: true })
    return () => document.removeEventListener('pointerover', onOver)
  }, [])

  return null
}

/* ── Cursor follower ring — desktop pointers only ──────────────── */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    if (
      reducedMotion() ||
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches
    )
      return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const ring = ringRef.current
    const dot = dotRef.current
    let x = innerWidth / 2
    let y = innerHeight / 2
    let rx = x
    let ry = y
    let raf
    let seen = false

    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (!seen) {
        seen = true
        rx = x
        ry = y
        ring.style.opacity = '1'
        dot.style.opacity = '1'
      }
    }
    const onOver = (e) => {
      const hit = e.target.closest('a, button, [data-cursor], input, select, textarea')
      ring.classList.toggle('is-active', !!hit)
    }
    const onLeave = () => {
      ring.style.opacity = '0'
      dot.style.opacity = '0'
      seen = false
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="cursor-ring__circle" />
      </div>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  )
}

/* ── Dynamic UI Sounds (Hover / Click) ───────────────────────── */
export function DynamicSounds() {
  useEffect(() => {
    if (reducedMotion()) return
    
    let audioCtx = null
    const playBeep = (type) => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      }
      if (audioCtx.state === 'suspended') audioCtx.resume()
      
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      
      if (type === 'hover') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(400, audioCtx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1)
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1)
        osc.start()
        osc.stop(audioCtx.currentTime + 0.1)
      } else if (type === 'click') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(400, audioCtx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05)
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05)
        osc.start()
        osc.stop(audioCtx.currentTime + 0.05)
      }
    }

    const onClick = (e) => {
      const hit = e.target.closest('a, button, [role="button"]')
      if (hit) playBeep('click')
    }

    document.addEventListener('click', onClick, { passive: true })
    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [])
  
  return null
}

/* ── Parallax Scrolling for [data-parallax] elements ───────────── */
export function Parallax() {
  useEffect(() => {
    if (reducedMotion()) return
    
    let raf = 0
    const update = () => {
      raf = 0
      const els = document.querySelectorAll('[data-parallax]')
      const wh = window.innerHeight
      
      els.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < wh && rect.bottom > 0) {
          const progress = (rect.top - wh / 2) / wh
          const img = el.querySelector('img')
          if (img) {
            const speed = parseFloat(el.dataset.parallax || 0.15)
            const y = progress * wh * speed
            img.style.transform = `translateY(${y}px) scale(1.15)`
            img.style.transition = 'transform 0.1s cubic-bezier(0.1, 0.5, 0.5, 1)'
          }
        }
      })
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    setTimeout(update, 100)
    
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  
  return null
}

