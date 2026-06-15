import { WA_NUMBER } from '../constants'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import KivoLogo from './KivoLogo'

export default function Header() {
  const { lang, setLang } = useLang()
  const tx = t[lang].nav

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#1C1C1C]"
      style={{ background: 'rgba(7,7,7,0.88)', backdropFilter: 'blur(14px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <a href="#" className="flex items-center">
          <KivoLogo height={26} />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#666]">
          <a href="#servicos" className="hover:text-[#B4FF00] transition-colors duration-200">{tx.services}</a>
          <a href="#processo" className="hover:text-[#B4FF00] transition-colors duration-200">{tx.process}</a>
          <a href="#cases"    className="hover:text-[#B4FF00] transition-colors duration-200">{tx.cases}</a>
          <a href="#sobre"    className="hover:text-[#B4FF00] transition-colors duration-200">{tx.about}</a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setLang('pt')}
              className={`px-1.5 py-0.5 transition-colors ${lang === 'pt' ? 'text-[#B4FF00]' : 'text-[#444] hover:text-[#888]'}`}
            >
              PT
            </button>
            <span className="text-[#2A2A2A]">/</span>
            <button
              onClick={() => setLang('en')}
              className={`px-1.5 py-0.5 transition-colors ${lang === 'en' ? 'text-[#B4FF00]' : 'text-[#444] hover:text-[#888]'}`}
            >
              EN
            </button>
          </div>

          {/* CTA */}
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#B4FF00] text-[#070707] text-sm font-bold px-4 py-2 hover:bg-white transition-colors"
          >
            {tx.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
