import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import IntroAnimation from './components/IntroAnimation'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Cases from './components/Cases'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [introPlayed, setIntroPlayed] = useState(false)

  return (
    <LanguageProvider>
      {/* CRT scanlines overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
        }}
      />

      <IntroAnimation onDone={() => setIntroPlayed(true)} />

      <div
        className={`bg-[#070707] text-white min-h-screen transition-opacity duration-700 ${
          introPlayed ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header />
        <main>
          <Hero />
          <Services />
          <HowItWorks />
          <Cases />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
