import { useEffect, useRef, useState } from 'react'

/* ── Professional, realistic 3D robot ────────────────────────────
   Mist Blue (#2f5061) brushed-metal chassis with Coral Pink
   (#e57f84) emissive trim. PBR materials + a baked room environment
   for believable reflections, soft grounded shadow, idle breathing
   / mouse-tracking animation. */
export default function Hero3D() {
  const wrapRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    let disposed = false
    let raf = 0
    const cleanups = []
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const initThreeJs = () => {
      if (disposed) return;
      Promise.all([
        import('three'),
        import('three/examples/jsm/geometries/RoundedBoxGeometry.js'),
        import('three/examples/jsm/environments/RoomEnvironment.js'),
      ])
        .then(([THREE, { RoundedBoxGeometry }, { RoomEnvironment }]) => {
        if (disposed) return

        const isMobile = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;

        let renderer
        try {
          renderer = new THREE.WebGLRenderer({
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
          })
        } catch {
          return
        }
        renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1) : Math.min(window.devicePixelRatio, 1.75))
        renderer.setSize(wrap.clientWidth, wrap.clientHeight)
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.08
        renderer.outputColorSpace = THREE.SRGBColorSpace
        
        if (!isMobile) {
          renderer.shadowMap.enabled = true
          renderer.shadowMap.type = THREE.PCFShadowMap
        }
        
        renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;'
        wrap.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
          38,
          wrap.clientWidth / wrap.clientHeight,
          0.1,
          100,
        )
        camera.position.set(0.3, 0.65, 10.5)
        camera.lookAt(0, 0.35, 0)

        /* ── Baked studio environment for believable PBR reflections ── */
        let pmrem, envRT;
        pmrem = new THREE.PMREMGenerator(renderer)
        envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
        scene.environment = envRT.texture

        /* ── Lighting ── */
        scene.add(new THREE.AmbientLight(0xbcd2df, isMobile ? 0.75 : 0.35))
        const key = new THREE.DirectionalLight(0xffffff, 2.1)
        key.position.set(4.5, 7, 6)
        if (!isMobile) {
          key.castShadow = true
          key.shadow.mapSize.set(1024, 1024)
          key.shadow.camera.left = -4
          key.shadow.camera.right = 4
          key.shadow.camera.top = 4
          key.shadow.camera.bottom = -4
          key.shadow.bias = -0.002
        }
        scene.add(key)
        const rim = new THREE.DirectionalLight(0x9fc3d6, 1.1)
        rim.position.set(-6, 3, -5)
        scene.add(rim)
        const coralFill = new THREE.PointLight(0xe57f84, isMobile ? 3 : 6, 9, 2)
        coralFill.position.set(0.4, 0.2, 2.8)
        scene.add(coralFill)

        /* ── Materials ── */
        const chassis = new THREE.MeshPhysicalMaterial({
          color: 0x2f5061,
          roughness: 0.32,
          metalness: 0.88,
          clearcoat: 0.5,
          clearcoatRoughness: 0.28,
        })
        const chassisLight = new THREE.MeshPhysicalMaterial({
          color: 0x7a9dad,
          roughness: 0.28,
          metalness: 0.82,
          clearcoat: 0.4,
          clearcoatRoughness: 0.3,
        })
        const jointDark = new THREE.MeshPhysicalMaterial({
          color: 0x1b2e39,
          roughness: 0.45,
          metalness: 0.7,
        })
        const trim = new THREE.MeshPhysicalMaterial({
          color: 0xe3ebee,
          roughness: 0.2,
          metalness: 0.9,
        })
        const coral = new THREE.MeshStandardMaterial({
          color: 0xe57f84,
          emissive: 0xe57f84,
          emissiveIntensity: 1.4,
          roughness: 0.35,
          metalness: 0.1,
        })

        const robot = new THREE.Group()
        robot.position.y = -0.35
        scene.add(robot)

        const addShadow = (m) => {
          if (!isMobile) {
            m.castShadow = true
            m.receiveShadow = true
          }
          return m
        }

        /* ── Head ── */
        const headGroup = new THREE.Group()
        headGroup.position.y = 2.55
        const head = addShadow(
          new THREE.Mesh(new RoundedBoxGeometry(1.05, 0.95, 1.0, 4, 0.22), chassisLight),
        )
        const visor = new THREE.Mesh(new RoundedBoxGeometry(1.02, 0.26, 0.14, 4, 0.08), coral)
        visor.position.set(0, 0.06, 0.5)
        const crown = new THREE.Mesh(new RoundedBoxGeometry(0.9, 0.14, 0.86, 3, 0.05), trim)
        crown.position.y = 0.48
        const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.5, 10), jointDark)
        antenna.position.set(0, 0.78, 0)
        const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), coral)
        antennaTip.position.set(0, 1.03, 0)
        const earGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.22, 20)
        earGeo.rotateZ(Math.PI / 2)
        const earL = addShadow(new THREE.Mesh(earGeo, jointDark))
        earL.position.set(-0.58, -0.04, 0)
        const earR = addShadow(new THREE.Mesh(earGeo, jointDark))
        earR.position.set(0.58, -0.04, 0)
        headGroup.add(head, visor, crown, antenna, antennaTip, earL, earR)
        robot.add(headGroup)

        /* ── Neck ── */
        const neck = addShadow(
          new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.3, 16), jointDark),
        )
        neck.position.y = 2.0
        robot.add(neck)

        /* ── Torso ── */
        const torsoGroup = new THREE.Group()
        torsoGroup.position.y = 1.15
        const torso = addShadow(
          new THREE.Mesh(new RoundedBoxGeometry(1.72, 1.9, 0.98, 4, 0.26), chassis),
        )
        const chestPlate = new THREE.Mesh(new RoundedBoxGeometry(1.1, 1.1, 0.16, 4, 0.14), chassisLight)
        chestPlate.position.set(0, 0.18, 0.52)
        const coreRing = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.045, 16, 40), coral)
        coreRing.position.set(0, 0.18, 0.62)
        const coreDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.05, 32), coral)
        coreDisc.rotation.x = Math.PI / 2
        coreDisc.position.set(0, 0.18, 0.6)
        const trimStripL = new THREE.Mesh(new RoundedBoxGeometry(0.08, 1.5, 0.05, 2, 0.02), trim)
        trimStripL.position.set(-0.7, -0.05, 0.51)
        const trimStripR = trimStripL.clone()
        trimStripR.position.x = 0.7
        const collar = new THREE.Mesh(new RoundedBoxGeometry(1.3, 0.22, 1.02, 3, 0.08), jointDark)
        collar.position.y = 0.98
        torsoGroup.add(torso, chestPlate, coreRing, coreDisc, trimStripL, trimStripR, collar)
        robot.add(torsoGroup)

        /* ── Shoulders + arms (each arm is its own pivot group for swing) ── */
        const buildArm = (side) => {
          const pivot = new THREE.Group()
          pivot.position.set(side * 0.98, 1.9, 0)

          const shoulder = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 20), jointDark))
          const pad = addShadow(
            new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.42, 0.5, 3, 0.14), chassisLight),
          )
          pad.position.set(side * 0.14, -0.02, 0)

          const upperGroup = new THREE.Group()
          upperGroup.position.set(side * 0.1, -0.18, 0)
          const upperArm = addShadow(
            new THREE.Mesh(new THREE.CapsuleGeometry(0.19, 0.62, 6, 12), chassis),
          )
          upperArm.position.y = -0.34
          upperGroup.add(upperArm)

          const elbow = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.18, 18, 18), jointDark))
          elbow.position.y = -0.7
          upperGroup.add(elbow)

          const lowerGroup = new THREE.Group()
          lowerGroup.position.y = -0.7
          const lowerArm = addShadow(
            new THREE.Mesh(new THREE.CapsuleGeometry(0.155, 0.58, 6, 12), chassisLight),
          )
          lowerArm.position.y = -0.32
          const wristBand = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 10, 24), coral)
          wristBand.rotation.x = Math.PI / 2
          wristBand.position.y = -0.58
          const hand = addShadow(
            new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.3, 0.2, 2, 0.09), jointDark),
          )
          hand.position.y = -0.76
          lowerGroup.add(lowerArm, wristBand, hand)
          upperGroup.add(lowerGroup)

          pivot.add(shoulder, pad, upperGroup)
          return { pivot, upperGroup, lowerGroup }
        }
        const armL = buildArm(-1)
        const armR = buildArm(1)
        robot.add(armL.pivot, armR.pivot)

        /* ── Pelvis + legs ── */
        const pelvis = addShadow(
          new THREE.Mesh(new RoundedBoxGeometry(1.3, 0.5, 0.85, 3, 0.16), jointDark),
        )
        pelvis.position.y = 0.02
        robot.add(pelvis)

        const buildLeg = (side) => {
          const pivot = new THREE.Group()
          pivot.position.set(side * 0.36, -0.2, 0)

          const hip = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 18), jointDark))
          const upperLeg = addShadow(
            new THREE.Mesh(new THREE.CapsuleGeometry(0.19, 0.68, 6, 12), chassis),
          )
          upperLeg.position.y = -0.44
          const knee = addShadow(new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 18), jointDark))
          knee.position.y = -0.82

          const lowerGroup = new THREE.Group()
          lowerGroup.position.y = -0.82
          const lowerLeg = addShadow(
            new THREE.Mesh(new THREE.CapsuleGeometry(0.165, 0.6, 6, 12), chassisLight),
          )
          lowerLeg.position.y = -0.34
          const shin = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.025, 8, 20), coral)
          shin.rotation.x = Math.PI / 2
          shin.position.y = -0.5
          const foot = addShadow(
            new THREE.Mesh(new RoundedBoxGeometry(0.32, 0.16, 0.5, 2, 0.07), jointDark),
          )
          foot.position.set(0, -0.72, 0.09)
          lowerGroup.add(lowerLeg, shin, foot)

          pivot.add(hip, upperLeg, knee, lowerGroup)
          return pivot
        }
        const legL = buildLeg(-1)
        const legR = buildLeg(1)
        robot.add(legL, legR)

        /* ── Floating halo rings ── */
        const rings = new THREE.Group()
        rings.position.y = 0.55
        const ringGeo = new THREE.TorusGeometry(2.5, 0.018, 8, 64)
        const ring1 = new THREE.Mesh(ringGeo, coral)
        ring1.rotation.x = Math.PI / 2 - 0.18
        const ring2 = new THREE.Mesh(ringGeo, trim)
        ring2.rotation.x = Math.PI / 2 + 0.18
        rings.add(ring1, ring2)
        robot.add(rings)

        /* ── Grounded soft shadow catcher (blends into the page) ── */
        const ground = new THREE.Mesh(
          new THREE.CircleGeometry(3.6, 48),
          new THREE.ShadowMaterial({ opacity: 0.28 }),
        )
        ground.rotation.x = -Math.PI / 2
        ground.position.y = -1.42
        ground.receiveShadow = true
        scene.add(ground)

        /* ── Mouse interaction ── */
        let mx = 0
        let my = 0
        let tx = 0
        let ty = 0
        const onMouse = (e) => {
          tx = (e.clientX / window.innerWidth - 0.5) * 2
          ty = (e.clientY / window.innerHeight - 0.5) * 2
        }
        if (!reduced && window.matchMedia('(pointer: fine)').matches) {
          window.addEventListener('mousemove', onMouse, { passive: true })
          cleanups.push(() => window.removeEventListener('mousemove', onMouse))
        }

        let isWaving = false
        let waveStartTime = 0
        const onClick = () => {
          if (!isWaving) {
            isWaving = true
            waveStartTime = (performance.now() - startTime) / 1000
            
            const audio = new Audio('/robot-hello.mp3');
            audio.play().catch(e => console.log('Audio play failed:', e));
          }
        }
        wrap.addEventListener('click', onClick)
        cleanups.push(() => wrap.removeEventListener('click', onClick))

        let inView = true
        const io = new IntersectionObserver(([e]) => {
          inView = e.isIntersecting
          if (inView) {
            if (!raf) loop() // Resume loop when it comes back into view
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

        const startTime = performance.now()

        const loop = () => {
          if (!inView || disposed) {
            cancelAnimationFrame(raf)
            raf = 0
            return
          }
          raf = requestAnimationFrame(loop)

          const t = (performance.now() - startTime) / 1000

          if (!reduced) {
            mx += (tx - mx) * 0.05
            my += (ty - my) * 0.05

            const bob = Math.sin(t * 1.4) * 0.14
            robot.position.y = -0.35 + bob
            ground.material.opacity = 0.28 - bob * 0.14

            robot.rotation.y = mx * 0.42
            robot.rotation.x = my * 0.16

            headGroup.rotation.y = mx * 0.28 + Math.sin(t * 0.6) * 0.02
            headGroup.rotation.x = my * 0.24

            if (Math.abs(tx) < 0.4 && Math.abs(ty) < 0.4) {
              wrap.style.cursor = 'pointer'
            } else {
              wrap.style.cursor = 'default'
            }

            let waveAmount = 0
            let waveOscillation = 0
            if (isWaving) {
              const waveElapsed = t - waveStartTime
              if (waveElapsed < 2.5) {
                // Math.sin(0 to PI) gives a smooth 0 -> 1 -> 0 curve
                const phase = (waveElapsed / 2.5) * Math.PI
                waveAmount = Math.sin(phase)
                waveOscillation = Math.sin(waveElapsed * 15) * 0.4
              } else {
                isWaving = false
              }
            }

            armL.pivot.rotation.z = 0.16 + Math.sin(t * 1.6) * 0.08
            armL.pivot.rotation.x = Math.sin(t * 1.1) * 0.05
            
            let armR_Z = -0.16 - Math.sin(t * 1.6 + Math.PI) * 0.08
            let armR_X = Math.sin(t * 1.1 + Math.PI) * 0.05
            
            if (waveAmount > 0) {
              const targetZ = 2.5 + waveOscillation
              const targetX = 0.5
              const blend = waveAmount ** 0.5 // ease-out feeling
              armR_Z = armR_Z * (1 - blend) + targetZ * blend
              armR_X = armR_X * (1 - blend) + targetX * blend
            }

            armR.pivot.rotation.z = armR_Z
            armR.pivot.rotation.x = armR_X

            legL.rotation.x = Math.sin(t * 1.2) * 0.03
            legR.rotation.x = Math.sin(t * 1.2 + Math.PI) * 0.03

            const pulse = 1.2 + Math.sin(t * 2.4) * 0.4
            coral.emissiveIntensity = pulse
            coralFill.intensity = 5 + Math.sin(t * 2.4) * 2

            ring1.rotation.z = t * 0.32
            ring2.rotation.z = -t * 0.24
            ring1.rotation.y = Math.sin(t * 0.5) * 0.16
            ring2.rotation.y = Math.cos(t * 0.6) * 0.16
          }

          renderer.render(scene, camera)
        }

        setReady(true)
        if (inView) loop()

        cleanups.push(() => {
          cancelAnimationFrame(raf)
          if (envRT) envRT.dispose()
          if (pmrem) pmrem.dispose()
          scene.traverse((obj) => {
            if (obj.geometry) obj.geometry.dispose()
          })
          ;[chassis, chassisLight, jointDark, trim, coral].forEach((m) => m.dispose())
          renderer.dispose()
          renderer.domElement.remove()
        })
      })
      .catch(() => {})
    };

    initThreeJs();

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      cleanups.forEach((f) => f())
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`hero__three ${ready ? 'is-ready' : ''}`}
    />
  )
}
