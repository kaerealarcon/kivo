import { useState, useCallback } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
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
  const [ready, setReady] = useState(false)
  const handleIntroDone = useCallback(() => setReady(true), [])

  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* CRT scanlines */}
        <div
          className="fixed inset-0 pointer-events-none z-9998"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
          }}
        />

        {/* Intro — desmonta sozinho quando termina */}
        {!ready && <IntroAnimation onDone={handleIntroDone} />}

        {/* Conteúdo principal — inline style para evitar dependência de classe Tailwind */}
        <div
          className="bg-[#070707] text-white min-h-screen"
          style={{ opacity: ready ? 1 : 0, transition: 'opacity 700ms ease' }}
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
    </ThemeProvider>
  )
}
