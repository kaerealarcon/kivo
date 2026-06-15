import { useState, useEffect, useCallback, useRef } from 'react'
import KivoLogo from './KivoLogo'

type Phase = 'flash' | 'show' | 'load' | 'exit' | 'done'

export default function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('flash')
  const [progress, setProgress] = useState(0)

  // Ref garante que onDone nunca recria o finish callback
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  const finish = useCallback(() => {
    setPhase('exit')
    setTimeout(() => {
      setPhase('done')
      onDoneRef.current()
    }, 500)
  }, []) // sem dependências — finish é estável

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('show'), 200)
    const t2 = setTimeout(() => setPhase('load'), 700)
    const t3 = setTimeout(finish,                 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [finish])

  useEffect(() => {
    if (phase !== 'load') return
    const start = Date.now()
    const duration = 1200
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
      className="fixed inset-0 z-9999 bg-[#050505] flex flex-col items-center justify-center cursor-pointer select-none"
      style={{ opacity: phase === 'exit' ? 0 : 1, transition: 'opacity 500ms ease' }}
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
        className="text-center relative z-10"
        style={{
          opacity:    phase === 'flash' ? 0 : 1,
          transform:  phase === 'flash' ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 500ms, transform 500ms',
        }}
      >
        <p className="font-mono text-[10px] tracking-[0.5em] text-accent mb-6 uppercase" style={{ opacity: 0.7 }}>
          SYS.BOOT v1.0.0
        </p>

        <div className={`flex justify-center mb-10 ${phase === 'load' ? 'glitch' : ''}`}>
          <KivoLogo height={80} />
        </div>

        <div
          className="w-64 mx-auto"
          style={{ opacity: phase === 'load' || phase === 'exit' ? 1 : 0, transition: 'opacity 300ms' }}
        >
          <div className="h-px bg-border overflow-hidden mb-2">
            <div
              className="h-full bg-accent"
              style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] tracking-[0.3em] text-[#555]">
            <span>{progress < 100 ? 'LOADING...' : 'SYSTEM READY'}</span>
            <span>{Math.floor(progress)}%</span>
          </div>
        </div>

        <p className="font-mono text-[9px] tracking-widest text-[#333] mt-10 uppercase">
          clique para pular
        </p>
      </div>
    </div>
  )
}
