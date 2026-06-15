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
              <div className="bg-[#0C0C0C] p-8 hover:bg-[#111] transition-colors duration-300 h-full group">
                {/* Tag badge — visível */}
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#888] border border-[#333] px-3 py-1 block w-fit mb-6 uppercase group-hover:border-[#B4FF00] group-hover:text-[#B4FF00] transition-colors duration-200">
                  {item.tag}
                </span>

                {/* Image placeholder */}
                <div className="h-44 bg-[#111] border border-[#252525] mb-6 flex items-center justify-center group-hover:border-[#2A2A2A] transition-colors">
                  <span className="font-mono text-[10px] tracking-widest text-[#555] uppercase">
                    {tx.imgLabel}
                  </span>
                </div>

                {/* Label + desc */}
                <h3 className="font-mono text-sm font-bold text-[#999] mb-1 group-hover:text-accent transition-colors duration-200">
                  {tx.coming}
                </h3>
                <p className="text-[#666] text-xs leading-relaxed">{tx.comingDesc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
