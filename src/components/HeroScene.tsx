import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Phase durations in seconds
const BUILD    = 2.8
const HOLD     = 1.4
const DISSOLVE = 2.0
const GAP      = 0.5
const CYCLE    = BUILD + HOLD + DISSOLVE + GAP

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function phaseAt(ct: number): { phase: string; p: number } {
  if (ct < BUILD)                        return { phase: 'build',   p: ct / BUILD }
  if (ct < BUILD + HOLD)                 return { phase: 'hold',    p: (ct - BUILD) / HOLD }
  if (ct < BUILD + HOLD + DISSOLVE)      return { phase: 'dissolve', p: (ct - BUILD - HOLD) / DISSOLVE }
  return { phase: 'gap', p: 1 }
}

// Sort edge pairs top → bottom so lines appear building downward
function sortEdgesTopDown(geo: THREE.EdgesGeometry): THREE.EdgesGeometry {
  const src = geo.attributes.position.array as Float32Array
  const N = src.length / 6
  const order = Array.from({ length: N }, (_, i) => i)
  order.sort((a, b) => {
    const ay = (src[a * 6 + 1] + src[a * 6 + 4]) / 2
    const by = (src[b * 6 + 1] + src[b * 6 + 4]) / 2
    return by - ay
  })
  const out = new Float32Array(src.length)
  for (let i = 0; i < N; i++) {
    const o = order[i]
    for (let j = 0; j < 6; j++) out[i * 6 + j] = src[o * 6 + j]
  }
  geo.setAttribute('position', new THREE.BufferAttribute(out, 3))
  return geo
}

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ─── Outer shape: icosahedron wireframe (lime) ─────────────────
    const outerBase = new THREE.IcosahedronGeometry(1.5, 2)
    const outerEdges = sortEdgesTopDown(new THREE.EdgesGeometry(outerBase))
    outerBase.dispose()
    outerEdges.setDrawRange(0, 0)
    const outerMat = new THREE.LineBasicMaterial({ color: 0xb4ff00, transparent: true, opacity: 0.9 })
    const outer = new THREE.LineSegments(outerEdges, outerMat)
    const outerMax = outerEdges.attributes.position.count
    scene.add(outer)

    // ─── Inner shape: octahedron wireframe (white, phase offset) ───
    const innerBase = new THREE.OctahedronGeometry(0.82, 2)
    const innerEdges = sortEdgesTopDown(new THREE.EdgesGeometry(innerBase))
    innerBase.dispose()
    innerEdges.setDrawRange(0, 0)
    const innerMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
    const inner = new THREE.LineSegments(innerEdges, innerMat)
    const innerMax = innerEdges.attributes.position.count
    scene.add(inner)

    // ─── Ambient particles ─────────────────────────────────────────
    const pCount = 90
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      const r = 2.0 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pPos[i * 3 + 2] = r * Math.cos(phi)
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({ color: 0xb4ff00, size: 0.022, transparent: true, opacity: 0.4 })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ─── Mouse parallax ────────────────────────────────────────────
    let mouseX = 0, mouseY = 0, tX = 0, tY = 0
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2.0
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2.0
    }
    window.addEventListener('mousemove', onMouse)

    // ─── Animation loop ────────────────────────────────────────────
    let raf: number
    let elapsed = 0
    let last = performance.now()

    const animate = () => {
      raf = requestAnimationFrame(animate)

      const now = performance.now()
      elapsed += (now - last) / 1000
      last = now

      tX += (mouseX - tX) * 0.04
      tY += (-mouseY - tY) * 0.04

      // Outer shape — base cycle
      const outerCT = elapsed % CYCLE
      const { phase: op, p: outerP } = phaseAt(outerCT)
      let outerCount = 0
      if      (op === 'build')   outerCount = Math.floor(easeInOut(outerP) * outerMax)
      else if (op === 'hold')    outerCount = outerMax
      else if (op === 'dissolve') outerCount = Math.floor((1 - easeInOut(outerP)) * outerMax)
      if (outerCount % 2 !== 0) outerCount -= 1
      outerEdges.setDrawRange(0, Math.max(0, outerCount))

      // Pulse glow during hold
      outerMat.opacity = op === 'hold'
        ? 0.8 + Math.sin(elapsed * 4.5) * 0.15
        : 0.9

      // Inner shape — offset half a cycle
      const innerCT = (elapsed + CYCLE * 0.5) % CYCLE
      const { phase: ip, p: innerP } = phaseAt(innerCT)
      let innerCount = 0
      if      (ip === 'build')   innerCount = Math.floor(easeInOut(innerP) * innerMax)
      else if (ip === 'hold')    innerCount = innerMax
      else if (ip === 'dissolve') innerCount = Math.floor((1 - easeInOut(innerP)) * innerMax)
      if (innerCount % 2 !== 0) innerCount -= 1
      innerEdges.setDrawRange(0, Math.max(0, innerCount))

      // Slow continuous rotation + mouse tilt
      outer.rotation.y += 0.0030 + tX * 0.004
      outer.rotation.x += 0.0012 + tY * 0.003
      inner.rotation.y -= 0.0025 + tX * 0.003
      inner.rotation.x -= 0.0010 + tY * 0.002

      particles.rotation.y -= 0.0012
      particles.rotation.x += 0.0005

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      outerEdges.dispose(); outerMat.dispose()
      innerEdges.dispose(); innerMat.dispose()
      pGeo.dispose(); pMat.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" />
}
