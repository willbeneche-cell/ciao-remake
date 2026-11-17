import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Logo } from './Logo'
import { bottleSources, heroFlavor } from '../data/flavors'

const HERO_IMAGE = bottleSources(heroFlavor.slug).src

/** Durées : court, réel, jamais artificiel. */
const MIN_MS = 900
const MIN_CACHED_MS = 220
const EXIT_MS = 540

/**
 * Premier acte de la marque : un compteur qui correspond à un vrai travail
 * (polices + image du hero décodées), et le logo qui se remplit de liquide.
 * Si la page a déjà été vue dans la session, on passe presque directement.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const doneRef = useRef(onDone)

  useEffect(() => {
    doneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    let frame = 0
    let cancelled = false
    let current = 0

    let cached = false
    try {
      cached = sessionStorage.getItem('ciao:loaded') === '1'
    } catch {
      cached = false
    }

    const signals = { fonts: false, image: false }

    document.fonts.ready.then(() => {
      signals.fonts = true
    })

    const image = new Image()
    image.src = HERO_IMAGE
    const decoded = typeof image.decode === 'function'
      ? image.decode()
      : Promise.resolve()
    decoded
      .then(() => {
        signals.image = true
      })
      .catch(() => {
        signals.image = true
      })

    const start = performance.now()
    const floor = cached ? MIN_CACHED_MS : MIN_MS
    let finished = false

    const finish = () => {
      if (finished || cancelled) return
      finished = true
      setProgress(1)
      setLeaving(true)
      try {
        sessionStorage.setItem('ciao:loaded', '1')
      } catch {
        /* navigation privée : on réessaiera, sans casser la page */
      }
      window.setTimeout(() => {
        if (!cancelled) doneRef.current()
      }, EXIT_MS)
    }

    // Filet de sécurité : si l'onglet est en arrière-plan, rAF ne tourne pas.
    // La page doit s'ouvrir quand même, pas rester sur le chargeur.
    const backstop = window.setTimeout(() => finish(), floor + 900)

    const tick = () => {
      if (cancelled) return

      const ready = document.readyState === 'complete'
      let target =
        (signals.fonts ? 0.5 : 0) + (signals.image ? 0.4 : 0) + (ready ? 0.1 : 0)
      if (cached) target = 1

      current += (target - current) * 0.12
      if (target - current < 0.004) current = target
      setProgress(current)

      if (current >= 0.999 && performance.now() - start >= floor) {
        finish()
        return
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.clearTimeout(backstop)
    }
  }, [])

  const percent = Math.round(progress * 100)
  const style = { '--p': `${progress * 100}%` } as CSSProperties

  return (
    <div
      className="loader"
      data-state={leaving ? 'out' : 'in'}
      style={style}
      role="status"
      aria-live="polite"
    >
      <div className="loader__inner">
        <div className="loader__mark">
          <Logo className="loader__mark-base" label="" />
          <span className="loader__mark-fill">
            <Logo label="" />
          </span>
        </div>
        <p className="loader__label">Fermentation en cours</p>
      </div>

      <div className="loader__count" aria-hidden="true">
        <b>{percent}</b>
        <span>%</span>
      </div>
      <div className="loader__bar" aria-hidden="true" />
      {/* une seule annonce : le pourcentage visible change trop souvent pour être lu */}
      <span className="sr-only">Chargement du site</span>
    </div>
  )
}
