import { EMAIL, INSTAGRAM_URL, LINKEDIN_URL } from '../constants'
import { useLang } from '../context/LanguageContext'
import { t } from '../translations'

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconLinkedin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      {/* Social + email bar */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src="/logo.svg" alt="KIVO" style={{ height: '20px', width: 'auto' }} />
        </a>

        {/* Social links */}
        <div className="flex items-center gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#555] hover:text-[#B4FF00] transition-colors text-sm font-mono"
            aria-label="Instagram"
          >
            <IconInstagram />
            <span className="hidden sm:inline">Instagram</span>
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#555] hover:text-[#B4FF00] transition-colors text-sm font-mono"
            aria-label="LinkedIn"
          >
            <IconLinkedin />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 text-[#555] hover:text-[#B4FF00] transition-colors text-sm font-mono"
          >
            <IconMail />
            <span className="hidden sm:inline">{EMAIL}</span>
          </a>
        </div>

        {/* Nav + copyright */}
        <nav className="flex items-center gap-5 font-mono text-xs text-[#444]">
          <a href="#servicos" className="hover:text-[#B4FF00] transition-colors">{tx.nav.services}</a>
          <a href="#processo" className="hover:text-[#B4FF00] transition-colors">{tx.nav.process}</a>
          <a href="#sobre"    className="hover:text-[#B4FF00] transition-colors">{tx.nav.about}</a>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#111] max-w-7xl mx-auto px-6 py-4">
        <p className="font-mono text-[10px] text-[#333] tracking-widest text-center">
          © {new Date().getFullYear()} KIVO. {tx.footer.rights}
        </p>
      </div>
    </footer>
  )
}
