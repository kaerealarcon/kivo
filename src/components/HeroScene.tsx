import { useEffect, useRef } from 'react'

const LAYERS = 7
const RGB = '180,255,0' // #B4FF00

export default function HeroScene() {
  const stackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0, mouseY = 0, tX = 0, tY = 0
    let raf: number, elapsed = 0, last = performance.now()

    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const now = performance.now()
      elapsed += (now - last) / 1000
      last = now

      tX += (mouseX - tX) * 0.04
      tY += (mouseY - tY) * 0.04

      const rx = 22 + tY * 8  + Math.sin(elapsed * 0.38) * 3
      const ry = -28 + tX * 11 + Math.cos(elapsed * 0.28) * 2.5

      if (stackRef.current) {
        stackRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
      }
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={stackRef}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(22deg) rotateY(-28deg)',
          width:  'min(42vw, 380px)',
          height: 'min(56vw, 500px)',
          position: 'relative',
        }}
      >
        {Array.from({ length: LAYERS }, (_, i) => {
          const p     = i / (LAYERS - 1)
          const z     = (i - (LAYERS - 1) / 2) * 44
          const alpha = 0.055 + p * 0.72
          const glow  = 3 + p * 28
          const bw    = 0.7 + p * 1.6
          const inset = (LAYERS - 1 - i) * 20

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset,
                borderRadius: 30,
                border: `${bw}px solid rgba(${RGB},${alpha})`,
                boxShadow: [
                  `0 0 ${glow}px rgba(${RGB},${alpha * 0.6})`,
                  `0 0 ${glow * 2.2}px rgba(${RGB},${alpha * 0.18})`,
                  `inset 0 0 ${glow * 0.45}px rgba(${RGB},${alpha * 0.12})`,
                ].join(','),
                transform: `translateZ(${z}px)`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
