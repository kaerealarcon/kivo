import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import Reveal from './Reveal'

export default function HowItWorks() {
  const { lang } = useLang()
  const tx = t[lang].how

  return (
    <section id="processo" className="py-24 px-6 bg-[#070707] grid-bg">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.45em] text-[#B4FF00] uppercase mb-4">
            {'> '}{tx.tag}
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-16">
            {tx.title}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-8">
          {tx.steps.map((item, i) => (
            <Reveal key={item.s} delay={i * 100} from="bottom">
              <div className="group">
                <div className="font-mono text-[#B4FF00] text-4xl font-bold mb-6 opacity-25 group-hover:opacity-100 transition-opacity duration-300">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-base font-bold text-white mb-3">{item.title}</h3>
                <p className="text-[#777] text-sm leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
