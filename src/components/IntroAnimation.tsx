import { useState, useEffect, useCallback } from 'react'

type Phase = 'flash' | 'show' | 'load' | 'exit' | 'done'

export default function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('flash')
  const [progress, setProgress] = useState(0)

  const finish = useCallback(() => {
    setPhase('exit')
    setTimeout(() => { setPhase('done'); onDone() }, 600)
  }, [onDone])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('show'), 300)
    const t2 = setTimeout(() => setPhase('load'), 800)
    const t3 = setTimeout(finish, 2400)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [finish])

  useEffect(() => {
    if (phase !== 'load') return
    const start = Date.now()
    const duration = 1400

    let raf: number
    const tick = () => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100)
      setProgress(p)
      if (p < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase])

  if (phase === 'done') return null

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center cursor-pointer select-none ${
        phase === 'exit' ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-500`}
      onClick={finish}
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)',
        }}
      />

      {/* Flash overlay */}
      {phase === 'flash' && (
        <div className="absolute inset-0 bg-white opacity-80 animate-pulse" />
      )}

      <div
        className={`text-center relative z-10 transition-all duration-500 ${
          phase === 'flash' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* System badge */}
        <p className="font-mono text-[10px] tracking-[0.5em] text-[#B4FF00] mb-6 opacity-70 uppercase">
          SYS.BOOT v1.0.0
        </p>

        {/* Logo */}
        <h1
          className={`text-white font-bold tracking-tight mb-10 ${
            phase === 'load' ? 'glitch' : ''
          }`}
          style={{ fontSize: 'clamp(4rem, 14vw, 10rem)', lineHeight: 1 }}
        >
          KIVO
        </h1>

        {/* Loading bar */}
        <div
          className={`w-64 mx-auto transition-opacity duration-300 ${
            phase === 'load' || phase === 'exit' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="h-px bg-[#1C1C1C] overflow-hidden mb-2">
            <div
              className="h-full bg-[#B4FF00]"
              style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] tracking-[0.3em] text-[#333]">
            <span>{progress < 100 ? 'LOADING...' : 'SYSTEM READY'}</span>
            <span>{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Skip hint */}
        <p className="font-mono text-[9px] tracking-widest text-[#2A2A2A] mt-10 uppercase">
          clique para pular
        </p>
      </div>
    </div>
  )
}
