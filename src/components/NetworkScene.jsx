import { useEffect, useRef, useState } from 'react'

/* Deterministic PRNG so the network layout is identical every visit */
function mulberry32(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Abstract distribution network — glowing hubs, arced routes, and
 * freight dots traveling between them. Rendered as a decorative layer
 * behind the Operations stats. pointer-events: none; pauses off-screen.
 */
export default function NetworkScene() {
  const wrapRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    let disposed = false
    let raf = 0
    const cleanups = []
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
        const camera = new THREE.PerspectiveCamera(
          40,
          wrap.clientWidth / wrap.clientHeight,
          0.1,
          100,
        )
        camera.position.set(0, -1.2, 14)
        camera.lookAt(0, 0, 0)

        const group = new THREE.Group()
        group.rotation.x = -0.28 // tilt the map plane back like a table
        scene.add(group)

        /* ── Hubs ───────────────────────────────────────────────── */
        const rand = mulberry32(20030614) // Est. 2003 — stable layout
        const HUBS = 14
        const hubs = []
        for (let i = 0; i < HUBS; i++) {
          hubs.push(
            new THREE.Vector3((rand() - 0.5) * 19, (rand() - 0.5) * 8.5, 0),
          )
        }

        const hubGeo = new THREE.SphereGeometry(0.09, 12, 12)
        const hubMat = new THREE.MeshBasicMaterial({ color: 0x7a9dad })
        const hubMeshes = hubs.map((p, i) => {
          const m = new THREE.Mesh(hubGeo, i % 5 === 0 ? new THREE.MeshBasicMaterial({ color: 0xe57f84 }) : hubMat)
          m.position.copy(p)
          group.add(m)
          return m
        })

        /* ── Routes: each hub connects to its 2 nearest peers ───── */
        const edges = []
        const seen = new Set()
        hubs.forEach((a, i) => {
          const near = hubs
            .map((b, j) => ({ j, d: a.distanceTo(b) }))
            .filter(({ j }) => j !== i)
            .sort((p, q) => p.d - q.d)
            .slice(0, 2)
          near.forEach(({ j }) => {
            const key = i < j ? `${i}-${j}` : `${j}-${i}`
            if (seen.has(key)) return
            seen.add(key)
            const b = hubs[j]
            const mid = a
              .clone()
              .add(b)
              .multiplyScalar(0.5)
              .add(new THREE.Vector3(0, 0, 1 + rand() * 1.4)) // arc toward camera
            edges.push(new THREE.QuadraticBezierCurve3(a, mid, b))
          })
        })

        const lineMat = new THREE.LineBasicMaterial({
          color: 0x7a9dad,
          transparent: true,
          opacity: 0.22,
        })
        const lineGeos = edges.map((curve) => {
          const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(42))
          group.add(new THREE.Line(g, lineMat))
          return g
        })

        /* ── Freight dots traveling the routes ──────────────────── */
        const DOTS = 80
        const dots = Array.from({ length: DOTS }, () => ({
          curve: (rand() * edges.length) | 0,
          offset: rand(),
          speed: 0.035 + rand() * 0.05,
          gold: rand() < 0.15,
        }))
        const dotPos = new Float32Array(DOTS * 3)
        const dotCol = new Float32Array(DOTS * 3)
        const cBlue = new THREE.Color(0x7ab4e8)
        const cGold = new THREE.Color(0xe57f84)
        dots.forEach((d, i) => {
          const c = d.gold ? cGold : cBlue
          dotCol[i * 3] = c.r
          dotCol[i * 3 + 1] = c.g
          dotCol[i * 3 + 2] = c.b
        })
        const dotGeo = new THREE.BufferGeometry()
        dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3))
        dotGeo.setAttribute('color', new THREE.BufferAttribute(dotCol, 3))
        const dotMat = new THREE.PointsMaterial({
          size: 0.16,
          vertexColors: true,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
        group.add(new THREE.Points(dotGeo, dotMat))

        const placeDots = (t) => {
          const v = new THREE.Vector3()
          dots.forEach((d, i) => {
            edges[d.curve].getPointAt((d.offset + t * d.speed) % 1, v)
            dotPos[i * 3] = v.x
            dotPos[i * 3 + 1] = v.y
            dotPos[i * 3 + 2] = v.z
          })
          dotGeo.attributes.position.needsUpdate = true
        }

        /* ── Lifecycle ──────────────────────────────────────────── */
        let inView = false
        const io = new IntersectionObserver(([e]) => {
          inView = e.isIntersecting
          
          if (inView && !reduced) {
            if (!raf) loop()
          }
        })
        io.observe(wrap)
        cleanups.push(() => io.disconnect())

        const ro = new ResizeObserver(() => {
          const w = wrap.clientWidth
          const h = wrap.clientHeight
          if (!w || !h) return
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          renderer.setSize(w, h)
        })
        ro.observe(wrap)
        cleanups.push(() => ro.disconnect())

        const clock = new THREE.Clock()
        let elapsed = 0
        const renderFrame = (t) => {
          placeDots(t)
          hubMeshes.forEach((m, i) => {
            m.scale.setScalar(1 + Math.sin(t * 1.6 + i * 1.3) * 0.25)
          })
          renderer.render(scene, camera)
        }

        const loop = () => {
          if (!inView || disposed || reduced) {
            cancelAnimationFrame(raf)
            raf = 0
            return
          }
          raf = requestAnimationFrame(loop)
          elapsed += clock.getDelta()
          renderFrame(elapsed)
        }

        renderFrame(0)
        setReady(true)
        if (!reduced && inView) loop()

        cleanups.push(() => {
          cancelAnimationFrame(raf)
          hubGeo.dispose()
          hubMat.dispose()
          hubMeshes.forEach((m) => m.material !== hubMat && m.material.dispose())
          lineMat.dispose()
          lineGeos.forEach((g) => g.dispose())
          dotGeo.dispose()
          dotMat.dispose()
          renderer.dispose()
          renderer.domElement.remove()
        })
      })
      .catch(() => {})
    };

    const initIo = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        initIo.disconnect();
        if (!reduced) importThree();
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

  return <div ref={wrapRef} className={`stats__scene ${ready ? 'is-ready' : ''}`} aria-hidden="true" />
}
