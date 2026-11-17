import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/**
 * Échappatoire de revue : ?motion=full force la version animée même si le
 * système demande de réduire les animations. Sert uniquement à montrer le
 * site complet en recette ; ne change rien pour un visiteur normal.
 */
function motionForced(): boolean {
  try {
    return new URLSearchParams(window.location.search).get('motion') === 'full'
  } catch {
    return false
  }
}

/** Version calme du site : on retire le mouvement, pas la beauté. */
export function useReducedMotion(): boolean {
  const system = useMediaQuery('(prefers-reduced-motion: reduce)')
  return system && !motionForced()
}

/** Curseur et tilt : souris uniquement, jamais au doigt. */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}
