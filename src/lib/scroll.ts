import { useEffect } from 'react'
import type { RefObject } from 'react'

type TrackOptions = {
  /** Nombre d'états discrets traversés par le scroll. */
  steps?: number
  onStep?: (index: number) => void
}

/**
 * Épingle une section (le parent sticky) et publie sa progression sur `--p`.
 *
 * Pas de requestAnimationFrame : un scroll event est déjà cadencé par le
 * navigateur, et la progression reste juste dans un onglet en arrière-plan.
 */
export function useTrackProgress(
  trackRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  { steps = 1, onStep }: TrackOptions = {},
) {
  useEffect(() => {
    const track = trackRef.current
    const target = targetRef.current
    if (!track || !target) return

    let shown = -1

    const read = () => {
      const rect = track.getBoundingClientRect()
      // hors champ : rien à calculer, et surtout rien à réveiller
      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      const travel = track.offsetHeight - window.innerHeight
      const passed = Math.min(Math.max(-rect.top, 0), travel)
      const progress = travel > 0 ? passed / travel : 0

      target.style.setProperty('--p', progress.toFixed(4))

      if (steps > 1) {
        const index = Math.min(
          steps - 1,
          Math.max(0, Math.round(progress * (steps - 1))),
        )
        if (index !== shown) {
          shown = index
          onStep?.(index)
        }
      }
    }

    read()
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [trackRef, targetRef, steps, onStep])
}

/** Révèle une section une seule fois, à l'entrée dans le champ. */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  rootMargin = '0px 0px -18% 0px',
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        el.dataset.in = 'true'
        observer.disconnect()
      },
      { rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])
}
