import { WA_NUMBER } from '../constants'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import Reveal from './Reveal'

export default function Contact() {
  const { lang } = useLang()
  const tx = t[lang].contact

  return (
    <section id="contato" className="py-32 px-6 bg-[#0C0C0C] border-t border-[#1C1C1C]">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.45em] text-[#B4FF00] uppercase mb-8">
            {'> '}{tx.tag}
          </p>
          <h2
            className="font-black tracking-tight text-white mb-8"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', lineHeight: '0.95' }}
          >
            {tx.title}
          </h2>
          <p className="text-[#888] text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            {tx.sub}
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#B4FF00] text-[#070707] font-bold px-10 py-5 text-base tracking-wide hover:bg-white transition-colors"
          >
            {tx.cta}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
