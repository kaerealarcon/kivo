import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */`
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vNormal = normalize(normalMatrix * normal);

    vec3 pos = position;
    float t = uTime * 0.3;

    float d  = sin(pos.x * 2.5 + t * 1.1) * sin(pos.y * 2.0 + t * 0.8) * 0.22;
          d += sin(pos.y * 2.8 + t * 0.9) * sin(pos.z * 2.2 + t * 1.3) * 0.16;
          d += sin(pos.z * 2.0 + t * 1.0) * sin(pos.x * 2.6 + t * 0.7) * 0.12;
          d += sin(pos.x * 1.5 - t * 0.6) * sin(pos.z * 1.8 + t * 1.2) * 0.08;

    pos += normal * d;
    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */`
  uniform float uTime;
  uniform vec3  uCamPos;
  varying vec3  vNormal;
  varying vec3  vWorldPos;

  // Brand palette: #B4FF00 = hsl(~75deg, 100%, 50%) → hue ≈ 0.208
  // We cycle within a narrow lime-green band

  vec3 hsl2rgb(float h, float s, float l) {
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h * 6.0, 2.0) - 1.0));
    float m = l - c * 0.5;
    vec3  r = vec3(0.0);
    if      (h < 0.1667) r = vec3(c, x, 0.0);
    else if (h < 0.3333) r = vec3(x, c, 0.0);
    else if (h < 0.5000) r = vec3(0.0, c, x);
    else if (h < 0.6667) r = vec3(0.0, x, c);
    else if (h < 0.8333) r = vec3(x, 0.0, c);
    else                  r = vec3(c, 0.0, x);
    return clamp(r + m, 0.0, 1.0);
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(uCamPos - vWorldPos);

    float fr = pow(1.0 - max(dot(n, v), 0.0), 1.8);

    // Hue stays near lime-green (0.18–0.28), with subtle drift over time
    float hueBase = 0.208 + sin(uTime * 0.04) * 0.025;
    float hue  = hueBase + n.x * 0.04 + n.y * 0.03;
    // Fresnel edge: shift slightly toward yellow-white
    float hueEdge = hueBase - 0.04 + n.z * 0.02;

    vec3 base  = hsl2rgb(hue,     1.0,  0.48);
    vec3 edge  = hsl2rgb(hueEdge, 0.80, 0.72);

    vec3 color = mix(base, edge, fr);
    // Bright specular highlight at rim
    color += fr * fr * vec3(0.6, 1.0, 0.1) * 0.55;

    gl_FragColor = vec4(color, 0.78 + fr * 0.20);
  }
`

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, w / h, 0.1, 100)
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ─── Blob — 50% smaller (radius 1.05 vs original 2.1) ─────────
    const geo = new THREE.SphereGeometry(1.05, 128, 128)
    const uniforms = {
      uTime:   { value: 0 },
      uCamPos: { value: camera.position.clone() },
    }
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.FrontSide,
    })
    const blob = new THREE.Mesh(geo, mat)
    scene.add(blob)

    // ─── Ring — brand lime, 50% smaller ───────────────────────────
    const ringGeo = new THREE.TorusGeometry(1.5, 0.004, 8, 160)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xb4ff00, transparent: true, opacity: 0.12 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 3.5
    scene.add(ring)

    // ─── Particle halo — lime tinted, 50% smaller ─────────────────
    const pCount = 100
    const pPos   = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 1.4 + Math.random() * 0.4
      pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pPos[i * 3 + 2] = r * Math.cos(phi)
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({ color: 0xb4ff00, size: 0.018, transparent: true, opacity: 0.35 })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ─── Animation loop ────────────────────────────────────────────
    let raf: number
    let mouseX = 0, mouseY = 0
    let tX = 0, tY = 0

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 1.6
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.6
    }
    window.addEventListener('mousemove', onMouse)

    const animate = () => {
      raf = requestAnimationFrame(animate)
      uniforms.uTime.value  += 0.01
      uniforms.uCamPos.value = camera.position

      tX += (mouseX - tX) * 0.04
      tY += (-mouseY - tY) * 0.04

      blob.rotation.y += 0.0025 + tX * 0.008
      blob.rotation.x += 0.0010 + tY * 0.008

      ring.rotation.y      += 0.006
      ring.rotation.z      += 0.003
      particles.rotation.y -= 0.002
      particles.rotation.x -= 0.001

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
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      geo.dispose(); mat.dispose()
      ringGeo.dispose(); ringMat.dispose()
      pGeo.dispose(); pMat.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" />
}
