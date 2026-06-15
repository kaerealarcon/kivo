import { lazy, Suspense } from 'react'
import { WA_NUMBER } from '../constants'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero() {
  const { lang } = useLang()
  const tx = t[lang].hero

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 72% 52%, rgba(180,255,0,0.055) 0%, transparent 70%)',
        }}
      />

      {/* 3D scene — right half */}
      <div className="absolute right-0 top-0 w-full md:w-[56%] h-full opacity-90">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Gradient: left keeps text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, #070707 42%, rgba(7,7,7,0.55) 68%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="max-w-2xl">
          {/* Tag */}
          <p className="font-mono text-[11px] tracking-[0.45em] text-[#B4FF00] uppercase mb-8">
            {'> '}{tx.tag}
          </p>

          {/* Headline */}
          <h1
            className="font-black leading-[0.95] tracking-tight mb-8"
            style={{ fontSize: 'clamp(3rem, 7.5vw, 6.5rem)' }}
          >
            <span className="block text-white">{tx.lines[0]}</span>
            <span className="block text-[#3A3A3A]">{tx.lines[1]}</span>
            <span className="block text-[#B4FF00]">{tx.lines[2]}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#888] text-lg leading-relaxed max-w-xl mb-12">
            {tx.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#B4FF00] text-[#070707] font-bold px-8 py-4 text-sm tracking-wide hover:bg-white transition-colors"
            >
              {tx.cta}
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center border border-[#2A2A2A] text-[#888] font-medium px-8 py-4 text-sm tracking-wide hover:border-[#555] hover:text-white transition-colors"
            >
              {tx.ctaAlt}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-6 flex items-center gap-3">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#2A2A2A]" />
          <span className="font-mono text-[9px] tracking-[0.4em] text-[#333] uppercase rotate-90 origin-left translate-y-6">
            scroll
          </span>
        </div>
      </div>
    </section>
  )
}
