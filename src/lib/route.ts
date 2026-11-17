import { useEffect, useState } from 'react'

const EVENT = 'ciao:route'

/** Navigation client, sans rechargement. */
export function navigate(to: string) {
  if (window.location.pathname === to) {
    window.scrollTo(0, 0)
    return
  }
  window.history.pushState({}, '', to)
  window.dispatchEvent(new Event(EVENT))
  window.scrollTo(0, 0)
}

/** Chemin courant. Deux pages : `/` et `/mentions-legales`. */
export function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const update = () => setPath(window.location.pathname)
    window.addEventListener(EVENT, update)
    window.addEventListener('popstate', update)
    return () => {
      window.removeEventListener(EVENT, update)
      window.removeEventListener('popstate', update)
    }
  }, [])

  return path.replace(/\/+$/, '') || '/'
}
