import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import Reveal from './Reveal'

export default function About() {
  const { lang } = useLang()
  const tx = t[lang].about

  return (
    <section id="sobre" className="py-24 px-6 bg-[#070707]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <Reveal from="left">
          <p className="font-mono text-[11px] tracking-[0.45em] text-[#B4FF00] uppercase mb-4">
            {'> '}{tx.tag}
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-8 leading-tight">
            {tx.title[0]}<br />
            <span className="text-[#333]">{tx.title[1]}</span>
          </h2>
          <p className="text-[#888] leading-relaxed mb-4">{tx.p1}</p>
          <p className="text-[#666] leading-relaxed text-sm">{tx.p2}</p>
        </Reveal>

        {/* Highlights */}
        <Reveal from="right">
          <div className="flex flex-col gap-px bg-[#1C1C1C]">
            {tx.highlights.map((item, i) => (
              <div
                key={item.value}
                className="bg-[#070707] px-8 py-6 flex items-center gap-6 group hover:bg-[#0C0C0C] transition-colors duration-200"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="font-mono font-bold text-white text-lg group-hover:text-[#B4FF00] transition-colors duration-200 min-w-[110px]">
                  {item.value}
                </span>
                <span className="text-[#666] text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
