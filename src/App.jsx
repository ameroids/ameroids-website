import { useState, useEffect, Suspense, lazy } from 'react'
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

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setCurrentRoute(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

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
        {currentRoute === '#terms' ? (
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><Terms /></Suspense>
        ) : (
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
        )}
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
