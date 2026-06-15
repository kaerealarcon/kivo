import { WA_NUMBER } from '../constants'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { t } from '../translations'
import KivoLogo from './KivoLogo'

function IconSun() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"  x2="12" y2="3"  />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"   />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1"  y1="12" x2="3"  y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Header() {
  const { lang, setLang } = useLang()
  const { theme, toggleTheme } = useTheme()
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
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="w-8 h-8 flex items-center justify-center text-[#555] hover:text-[#B4FF00] transition-colors border border-[#1C1C1C] hover:border-[#B4FF00]"
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>

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
