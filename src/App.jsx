import { useState, useEffect } from 'react'
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
import Chatbot from './components/Chatbot.jsx'
import Terms from './components/Terms.jsx'
import AudioPlayer from './components/AudioPlayer.jsx'
import EasterEgg from './components/EasterEgg.jsx'

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

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
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
          <Terms />
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
      <Chatbot />
      <AudioPlayer />
      <EasterEgg />
    </>
  )
}
