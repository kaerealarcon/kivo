import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import Reveal from './Reveal'

export default function Cases() {
  const { lang } = useLang()
  const tx = t[lang].cases

  return (
    <section id="cases" className="py-24 px-6 bg-[#0C0C0C]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.45em] text-[#B4FF00] uppercase mb-4">
            {'> '}{tx.tag}
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-16">
            {tx.title}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-px bg-[#1C1C1C]">
          {tx.items.map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-[#0C0C0C] p-8 hover:bg-[#0F0F0F] transition-colors duration-300 h-full group">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#555] border border-[#222] px-3 py-1 block w-fit mb-6 uppercase group-hover:border-[#B4FF00] group-hover:text-[#B4FF00] transition-colors duration-200">
                  {item.tag}
                </span>
                <div className="h-40 bg-[#0A0A0A] border border-[#1A1A1A] mb-6 flex items-center justify-center">
                  <span className="font-mono text-[10px] tracking-widest text-[#333] uppercase">
                    {tx.imgLabel}
                  </span>
                </div>
                <h3 className="font-mono text-sm text-[#555] mb-1">{tx.coming}</h3>
                <p className="text-[#3A3A3A] text-xs">{tx.comingDesc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
