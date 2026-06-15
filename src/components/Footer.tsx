import { EMAIL, INSTAGRAM_URL, LINKEDIN_URL } from '../constants'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'
import KivoLogo from './KivoLogo'

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconLinkedin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export default function Footer() {
  const { lang } = useLang()
  const tx = t[lang]

  return (
    <footer className="border-t border-[#1C1C1C] bg-[#070707]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        <a href="#" className="flex items-center">
          <KivoLogo height={20} />
        </a>

        {/* Social — ícones apenas */}
        <div className="flex items-center gap-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 flex items-center justify-center text-[#555] hover:text-accent border border-border hover:border-accent transition-colors duration-200"
          >
            <IconInstagram />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 flex items-center justify-center text-[#555] hover:text-accent border border-border hover:border-accent transition-colors duration-200"
          >
            <IconLinkedin />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="w-9 h-9 flex items-center justify-center text-[#555] hover:text-accent border border-border hover:border-accent transition-colors duration-200"
          >
            <IconMail />
          </a>
        </div>

        <nav className="flex items-center gap-5 font-mono text-xs text-[#444]">
          <a href="#servicos" className="hover:text-accent transition-colors">{tx.nav.services}</a>
          <a href="#processo" className="hover:text-accent transition-colors">{tx.nav.process}</a>
          <a href="#sobre"    className="hover:text-accent transition-colors">{tx.nav.about}</a>
        </nav>
      </div>

      <div className="border-t border-[#111] max-w-7xl mx-auto px-6 py-4">
        <p className="font-mono text-[10px] text-[#333] tracking-widest text-center">
          © {new Date().getFullYear()} KIVO. {tx.footer.rights}
        </p>
      </div>
    </footer>
  )
}
