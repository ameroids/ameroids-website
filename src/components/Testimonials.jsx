import { useEffect, useRef, useState } from 'react'
import { testimonials } from '../data/content.js'
import { SectionHead } from '../hooks/useReveal.jsx'
import Icon from './Icons.jsx'

export default function Testimonials() {
  const mountRef = useRef(null)
  const cardsRef = useRef([])
  const [positions, setPositions] = useState([])

  useEffect(() => {
    const wrap = mountRef.current
    if (!wrap) return

    let disposed = false
    let raf = 0
    const cleanups = []
    
    // Store original 3D positions for the cards
    const cardPositions = testimonials.map((_, i) => {
      // Distribute evenly around the equator/sphere
      const phi = Math.acos(-1 + (2 * i) / testimonials.length)
      const theta = Math.sqrt(testimonials.length * Math.PI) * phi
      
      // Radius of 5.5 to sit just outside the 5.0 globe
      const r = 5.5
      return {
        x: r * Math.cos(theta) * Math.sin(phi),
        y: r * Math.sin(theta) * Math.sin(phi),
        z: r * Math.cos(phi)
      }
    })

    const importThree = () => {
      import('three')
        .then((THREE) => {
          if (disposed) return

        let renderer
        try {
          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        } catch {
          return
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        renderer.setSize(wrap.clientWidth, wrap.clientHeight)
        renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;'
        wrap.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, wrap.clientWidth / wrap.clientHeight, 0.1, 100)
        camera.position.set(0, 0, 16) // Pulled back a bit to see cards

        const group = new THREE.Group()
        scene.add(group)

        // Create a dotted globe
        const radius = 5
        const segments = 42
        const rings = 42
        
        const geometry = new THREE.SphereGeometry(radius, segments, rings)
        const vertices = geometry.attributes.position.array
        
        const dotGeo = new THREE.BufferGeometry()
        dotGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
        
        const dotMat = new THREE.PointsMaterial({
          color: 0x7ab4e8,
          size: 0.08,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending
        })
        
        const globe = new THREE.Points(dotGeo, dotMat)
        group.add(globe)

        const orbitGeo = new THREE.TorusGeometry(radius + 0.4, 0.02, 16, 100)
        const orbitMat = new THREE.MeshBasicMaterial({ color: 0xe57f84, transparent: true, opacity: 0.3 })
        const orbit1 = new THREE.Mesh(orbitGeo, orbitMat)
        orbit1.rotation.x = Math.PI / 3
        group.add(orbit1)
        
        const orbit2 = new THREE.Mesh(orbitGeo, orbitMat)
        orbit2.rotation.y = Math.PI / 3
        group.add(orbit2)

        const ro = new ResizeObserver(() => {
          const w = wrap.clientWidth
          const h = wrap.clientHeight
          if (!w || !h) return
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          renderer.setSize(w, h)
          
          // Pull camera back on smaller screens so the globe fits
          if (w < 768) {
            camera.position.z = 24
          } else {
            camera.position.z = 16
          }
        })
        ro.observe(wrap)
        cleanups.push(() => ro.disconnect())

        // Mouse and Touch interaction for rotation
        let targetRotationY = 0
        let targetRotationX = 0
        let isDragging = false
        let previousMousePosition = { x: 0, y: 0 }
        
        const onMouseDown = (e) => {
          isDragging = true
          previousMousePosition = { x: e.clientX, y: e.clientY }
        }
        const onMouseMove = (e) => {
          if (!isDragging) return
          const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
          }
          targetRotationY += deltaMove.x * 0.01
          targetRotationX += deltaMove.y * 0.01
          previousMousePosition = { x: e.clientX, y: e.clientY }
        }
        const onMouseUp = () => {
          isDragging = false
        }
        
        const onTouchStart = (e) => {
          if (e.touches.length > 0) {
            isDragging = true
            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
          }
        }
        const onTouchMove = (e) => {
          if (!isDragging || e.touches.length === 0) return
          const deltaMove = {
            x: e.touches[0].clientX - previousMousePosition.x,
            y: e.touches[0].clientY - previousMousePosition.y
          }
          targetRotationY += deltaMove.x * 0.01
          targetRotationX += deltaMove.y * 0.01
          previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }
        const onTouchEnd = () => {
          isDragging = false
        }
        
        wrap.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
        
        wrap.addEventListener('touchstart', onTouchStart, { passive: true })
        window.addEventListener('touchmove', onTouchMove, { passive: true })
        window.addEventListener('touchend', onTouchEnd)
        
        cleanups.push(() => {
          wrap.removeEventListener('mousedown', onMouseDown)
          window.removeEventListener('mousemove', onMouseMove)
          window.removeEventListener('mouseup', onMouseUp)
          wrap.removeEventListener('touchstart', onTouchStart)
          window.removeEventListener('touchmove', onTouchMove)
          window.removeEventListener('touchend', onTouchEnd)
        })

        const renderFrame = () => {
          // Auto rotate slightly, plus drag rotation
          globe.rotation.y += (targetRotationY - globe.rotation.y) * 0.1 + 0.001
          globe.rotation.x += (targetRotationX - globe.rotation.x) * 0.1
          
          orbit1.rotation.z += 0.005
          orbit2.rotation.z -= 0.003
          
          group.position.y = Math.sin(Date.now() * 0.001) * 0.3

          renderer.render(scene, camera)
          
          // Project 3D points to 2D for the HTML cards
          const hw = wrap.clientWidth / 2
          const hh = wrap.clientHeight / 2
          
          cardsRef.current.forEach((card, i) => {
            if (!card) return
            
            // Apply globe's rotation to the original coordinate
            const vec = new THREE.Vector3(cardPositions[i].x, cardPositions[i].y, cardPositions[i].z)
            
            // We want cards to orbit around the globe, so we rotate them by the globe's rotation
            vec.applyEuler(globe.rotation)
            
            // Also apply the group's bobbing position
            vec.add(group.position)

            vec.project(camera)
            
            const x = (vec.x * hw) + hw
            const y = -(vec.y * hh) + hh
            
            // Calculate scale and opacity based on depth (z)
            // If z < 0, it's behind the globe (further away).
            const isBehind = vec.z > 1 || vec.z < 0 // vec.z in NDC is depth. 
            // Better to check actual distance or transformed z
            const transformedZ = new THREE.Vector3(cardPositions[i].x, cardPositions[i].y, cardPositions[i].z)
            transformedZ.applyEuler(globe.rotation)
            
            const depth = transformedZ.z
            const scale = Math.max(0.4, 1 + depth * 0.1)
            const opacity = depth < -2 ? 0.1 : depth < 0 ? 0.4 : Math.min(1, 0.7 + depth * 0.1)
            const zIndex = Math.floor(depth * 100)

            card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`
            card.style.opacity = opacity
            card.style.zIndex = zIndex
            
            // Pointer events only for front cards
            card.style.pointerEvents = depth > 0 ? 'auto' : 'none'
          })
        }

        let inView = false
        const io = new IntersectionObserver(([e]) => {
          inView = e.isIntersecting
          if (inView && !raf) {
             loop()
          }
        })
        io.observe(wrap)
        cleanups.push(() => io.disconnect())

        const loop = () => {
          if (!inView || disposed) {
            cancelAnimationFrame(raf)
            raf = 0
            return
          }
          raf = requestAnimationFrame(loop)
          renderFrame()
        }

        if (inView) loop()

        cleanups.push(() => {
          cancelAnimationFrame(raf)
          geometry.dispose()
          dotGeo.dispose()
          dotMat.dispose()
          orbitGeo.dispose()
          orbitMat.dispose()
          renderer.dispose()
          renderer.domElement.remove()
        })
      })
      .catch(() => {})
    };

    const initIo = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        initIo.disconnect();
        importThree();
      }
    });
    initIo.observe(wrap);

    return () => {
      disposed = true
      initIo.disconnect();
      cancelAnimationFrame(raf)
      cleanups.forEach((f) => f())
    }
  }, [])

  return (
    <section className="globe-section" id="testimonials">
      <div className="globe-header-fixed">
        <SectionHead eyebrow="Testimonials" title="What our partners say" light center />
        <p className="globe-hint">Drag to spin the globe</p>
      </div>
      
      <div className="globe-canvas" ref={mountRef} aria-hidden="true" style={{ cursor: 'grab' }}>
        <div className="globe-reviews-container">
          {testimonials.map((t, i) => (
            <div 
              key={t.name} 
              ref={el => cardsRef.current[i] = el}
              className="globe-review-orbit-card"
            >
              <span className="globe-review-quote">
                <Icon name="quote" size={24} />
              </span>
              <p className="globe-review-text">“{t.quote}”</p>
              <div className="globe-review-footer">
                <span className="globe-review-avatar" aria-hidden="true">
                  {t.name.split(' ').map((w) => w[0]).join('')}
                </span>
                <div className="globe-review-author">
                  <strong>{t.name}</strong>
                  <small>{t.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
