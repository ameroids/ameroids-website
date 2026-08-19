import { useState, useEffect, Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { Preloader, ScrollProgress, Cursor, Magnetic, Tilt, DynamicSounds, Parallax } from './components/Experience.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Brands from './components/Brands.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Infrastructure from './components/Infrastructure.jsx'
import Stats from './components/Stats.jsx'
import WhyUs from './components/WhyUs.jsx'
import Process from './components/Process.jsx'
import Gallery from './components/Gallery.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

// Lazy load non-critical / heavy functional components to defer JS execution
const Chatbot = lazy(() => import('./components/Chatbot.jsx'))
const Terms = lazy(() => import('./components/Terms.jsx'))
const AudioPlayer = lazy(() => import('./components/AudioPlayer.jsx'))
const EasterEgg = lazy(() => import('./components/EasterEgg.jsx'))
const BlogIndex = lazy(() => import('./pages/BlogIndex.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))

function Home() {
  const location = useLocation()
  
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.substring(1)
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  if (location.hash === '#terms') {
    return <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><Terms /></Suspense>
  }

  return (
    <>
      <Hero />
      <Brands />
      <About />
      <Services />
      <Infrastructure />
      <Stats />
      <WhyUs />
      <Process />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  )
}

export default function App() {
  // removed currentRoute hash listening since we use react-router-dom now

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    let rafId;
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <Magnetic />
      <Tilt />
      <DynamicSounds />
      <Parallax />
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Suspense fallback={<div style={{ minHeight: '100vh' }} />}><BlogIndex /></Suspense>} />
          <Route path="/blog/:slug" element={<Suspense fallback={<div style={{ minHeight: '100vh' }} />}><BlogPost /></Suspense>} />
        </Routes>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <Chatbot />
        <AudioPlayer />
        <EasterEgg />
      </Suspense>
    </>
  )
}
