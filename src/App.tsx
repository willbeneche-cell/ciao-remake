import { useCallback, useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import Lenis from 'lenis'
import { Bande } from './components/Bande'
import { BubbleField } from './components/BubbleField'
import { Cursor } from './components/Cursor'
import { Engagements } from './components/Engagements'
import { Faq } from './components/Faq'
import { Fermentation } from './components/Fermentation'
import { Footer } from './components/Footer'
import { Gamme } from './components/Gamme'
import { Hero } from './components/Hero'
import { Manifeste } from './components/Manifeste'
import { Loader } from './components/Loader'
import { Marquee } from './components/Marquee'
import { MentionsLegales } from './components/MentionsLegales'
import { Navbar } from './components/Navbar'
import { Trouver } from './components/Trouver'
import { heroFlavor } from './data/flavors'
import { useReducedMotion } from './lib/hooks'
import { useRoute } from './lib/route'

const theme = {
  '--ambiance': heroFlavor.ambiance,
  '--on-ambiance':
    heroFlavor.onAmbiance === 'encre' ? 'var(--encre)' : 'var(--creme)',
} as CSSProperties

export default function App() {
  const [loading, setLoading] = useState(true)
  const [started, setStarted] = useState(false)
  const reduced = useReducedMotion()
  const route = useRoute()
  const legal = route.endsWith('/mentions-legales')

  const handleLoaded = useCallback(() => {
    setLoading(false)
    setStarted(true)
  }, [])

  // Scroll doux ; désactivé en mouvement réduit (le natif suffit alors).
  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // les liens d'ancre (navbar, CTA) passent par le scroll doux
      anchors: true,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [reduced])

  return (
    <div style={theme}>
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>

      {loading ? <Loader onDone={handleLoaded} /> : null}

      <Navbar />

      {legal ? (
        <MentionsLegales />
      ) : (
        <main id="main" className="relative z-10" data-started={started}>
          <Hero />
          <Manifeste />
          <Gamme />
          <Fermentation />
          <Marquee />
          <Bande />
          <Engagements />
          <Faq />
          <Trouver />
        </main>
      )}

      <Footer />

      <BubbleField />
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </div>
  )
}
