import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import Reveal from './Reveal'

export default function Services() {
  const { lang } = useLang()
  const tx = t[lang].services

  return (
    <section id="servicos" className="py-24 px-6 bg-[#0C0C0C]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.45em] text-[#B4FF00] uppercase mb-4">
            {'> '}{tx.tag}
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-16">
            {tx.title}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 border border-[#1C1C1C]">
          {tx.items.map((item, i) => (
            <Reveal key={item.n} delay={i * 80}>
              <div
                className={`p-10 border-[#1C1C1C] h-full group cursor-default
                  hover:bg-[#111] transition-colors duration-300
                  ${i % 2 === 0 ? 'border-r' : ''}
                  ${i < 2 ? 'border-b' : ''}`}
                style={{ borderColor: '#1C1C1C' }}
              >
                <span className="font-mono text-xs text-[#B4FF00] opacity-70 block mb-6">
                  {item.n}
                </span>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#B4FF00] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-[#888] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
