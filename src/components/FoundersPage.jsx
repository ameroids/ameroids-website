import { useEffect, useRef, useState } from 'react';
import { Reveal, SectionHead } from '../hooks/useReveal.jsx';
import './FoundersPage.css';

function FounderCard({ name, role, text, imgSrc, delay, imgStyle }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const follow = useRef({ tx: 0, ty: 0, x: 0, y: 0, raf: 0, inside: false });
  const shotNo = useRef(0);
  const [shots, setShots] = useState([]);
  const [flash, setFlash] = useState(0);
  const [snap, setSnap] = useState(false);

  const reduced = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => () => cancelAnimationFrame(follow.current.raf), []);

  const tick = () => {
    const f = follow.current;
    f.x += (f.tx - f.x) * 0.14;
    f.y += (f.ty - f.y) * 0.14;
    if (frameRef.current) frameRef.current.style.translate = `${f.x}px ${f.y}px`;
    if (f.inside || Math.hypot(f.tx - f.x, f.ty - f.y) > 0.5) {
      f.raf = requestAnimationFrame(tick);
    } else {
      f.raf = 0;
      if (frameRef.current) frameRef.current.style.translate = '0px 0px';
    }
  };
  const wake = () => {
    if (!follow.current.raf) follow.current.raf = requestAnimationFrame(tick);
  };

  const onMove = e => {
    if (reduced()) return;
    const r = cardRef.current.getBoundingClientRect();
    
    // We want the frame to follow the cursor within the card
    const fw = r.width * 0.5; // frame is half width of card
    const fh = r.height * 0.4;
    const homeX = r.width / 2;
    const homeY = r.height / 2;
    
    const cx = Math.max(fw / 2 + 6, Math.min(r.width - fw / 2 - 6, e.clientX - r.left));
    const cy = Math.max(fh / 2 + 6, Math.min(r.height - fh / 2 - 6, e.clientY - r.top));
    
    const f = follow.current;
    f.tx = cx - homeX;
    f.ty = cy - homeY;
    f.inside = true;
    wake();
  };

  const onLeave = () => {
    const f = follow.current;
    f.inside = false;
    f.tx = 0;
    f.ty = 0;
    wake();
  };

  const onShoot = e => {
    if (e.target.closest('.fp-shot')) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    const id = ++shotNo.current;
    setShots(s => [...s, {
      id,
      x: Math.round(x),
      y: Math.round(y),
      rot: (Math.random() * 9 - 4.5).toFixed(1)
    }].slice(-3));
    setFlash(id);
    setSnap(true);
  };

  return (
    <Reveal className="founder-card" delay={delay} dir="up">
      <div 
        className="founder-card__interactive"
        ref={cardRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={onShoot}
      >
        <div className="founder-card__img-wrap">
          <img src={imgSrc} alt={name} className="founder-card__img" style={imgStyle} />
        </div>
        
        <div
          className={`fp-frame ${snap ? 'fp-snap' : ''}`}
          ref={frameRef}
          onAnimationEnd={e => e.animationName === 'fp-snap' && setSnap(false)}
        >
          <span className="fp-dot fp-dot-tl" /><span className="fp-dot fp-dot-tr" />
          <span className="fp-dot fp-dot-bl" /><span className="fp-dot fp-dot-br" />
          <span className="fp-scanline" />
          <span className="fp-frame-tag">
            {shots.length ? `${String(shots.length).padStart(2, '0')} PINNED` : 'REC / CLICK TO SHOOT'}
          </span>
        </div>

        {flash !== 0 && (
          <span className="fp-flash" key={flash} onAnimationEnd={() => setFlash(0)} />
        )}
      </div>

      <div className="founder-card__content">
        <h3>{name}</h3>
        <p className="founder-card__role">{role}</p>
        <p className="founder-card__text">{text}</p>
      </div>

      {shots.length > 0 && (
        <div className="fp-shots">
          {shots.map((s, idx) => (
            <button
              type="button"
              className="fp-shot"
              key={s.id}
              style={{ '--i': idx, '--rot': `${s.rot}deg` }}
              aria-label={`Unpin shot ${s.id}`}
              title="Unpin this shot"
              onClick={() => setShots(prev => prev.filter(p => p.id !== s.id))}
            >
              <span
                className="fp-shot-img"
                style={{ backgroundImage: `url(${imgSrc})`, backgroundPosition: `${s.x}% ${s.y}%` }}
              />
              <span className="fp-shot-cap">{name.split(' ')[0]} · {String(s.id).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      )}
    </Reveal>
  );
}

export default function FoundersPage() {
  return (
    <section className="section" id="founders">
      <div className="container">
        <SectionHead
          eyebrow="Leadership"
          title="Meet the Founders"
          lead="Building the next generation of business through innovation and intelligent automation."
          center
        />

        <div className="founders__grid">
          <FounderCard 
            name="Ammar Rampura" 
            role="Co-Founder"
            text="Driven by innovation, Ammar helps businesses unlock growth through AI and automation. He creates systems that simplify operations and help teams focus on what matters."
            imgSrc="/founder1.jpeg"
            delay={0}
          />
          <FounderCard 
            name="Mustafa Ezzy" 
            role="Co-Founder"
            text="Mustafa turns complex problems into clear, practical roadmaps for sustainable growth. He anticipates challenges and designs solutions that future-proof businesses."
            imgSrc="/founder2.jpeg"
            delay={100}
            imgStyle={{ transform: 'scale(1.6)', transformOrigin: 'center 10%' }}
          />
        </div>
      </div>
    </section>
  );
}
