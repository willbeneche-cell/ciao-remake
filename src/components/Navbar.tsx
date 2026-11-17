import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Logo } from './Logo'
import { LabelButton } from './LabelButton'

const LINKS = [
  { index: '01', label: 'La gamme', href: '#gamme' },
  { index: '02', label: 'La fermentation', href: '#fermentation' },
  { index: '03', label: 'Engagements', href: '#engagements' },
  { index: '04', label: 'FAQ', href: '#faq' },
]

export function Navbar() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setCompact(window.scrollY > 70))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    burgerRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    if (!open) {
      document.documentElement.style.removeProperty('overflow')
      return
    }

    document.documentElement.style.overflow = 'hidden'
    firstLinkRef.current?.focus({ preventScroll: true })

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key !== 'Tab') return

      // piège de focus : deux éléments, on boucle proprement
      const focusables = document.querySelectorAll<HTMLElement>(
        '.menu a, .menu button, .nav__burger',
      )
      const list = Array.from(focusables)
      const first = list[0]
      const last = list[list.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.removeProperty('overflow')
    }
  }, [open, close])

  return (
    <>
      <header className="nav" data-compact={compact}>
        <div className="nav__pill">
          <a href="#top" className="nav__logo" aria-label="Ciao Kombucha, accueil">
            <Logo label="" />
          </a>
        </div>

        <div className="nav__pill nav__pill--links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav__link">
              <span className="nav__index">
                {link.index}
                <span className="nav__dot" aria-hidden="true" />
              </span>
              {link.label}
            </a>
          ))}
          <LabelButton href="#ou-nous-trouver" className="label-btn--sm">
            Où nous trouver
          </LabelButton>
        </div>

        <button
          ref={burgerRef}
          type="button"
          className="nav__burger"
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" />
          <span className="sr-only">
            {open ? 'Fermer le menu' : 'Ouvrir le menu'}
          </span>
        </button>
      </header>

      <nav
        id="menu-principal"
        className="menu"
        data-open={open}
        aria-label="Menu principal"
        aria-hidden={!open}
        inert={!open}
      >
        {LINKS.map((link, position) => (
          <a
            key={link.href}
            ref={position === 0 ? firstLinkRef : undefined}
            href={link.href}
            className="menu__link"
            style={{ '--d': `${120 + position * 60}ms` } as CSSProperties}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            <span className="menu__index">{link.index}</span>
            {link.label}
          </a>
        ))}

        <div className="menu__foot">
          <LabelButton href="#ou-nous-trouver" block onClick={() => setOpen(false)}>
            Où nous trouver
          </LabelButton>
          <p>À conserver au frais. Demande où se trouve le frigo.</p>
        </div>
      </nav>
    </>
  )
}
