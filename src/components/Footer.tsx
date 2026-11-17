import { footer } from '../data/copy'
import { navigate } from '../lib/route'
import { Logo } from './Logo'

const LINKS = [
  { label: 'La gamme', href: '#gamme' },
  { label: 'La fermentation', href: '#fermentation' },
  { label: 'Engagements', href: '#engagements' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Où nous trouver', href: '#ou-nous-trouver' },
]

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot__top">
        <div className="foot__brand">
          <Logo className="foot__logo" label="Ciao Kombucha" />
          <p className="foot__baseline">{footer.baseline}</p>
        </div>

        <nav className="foot__nav" aria-label="Pied de page">
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="foot__aside">
          <ul className="foot__socials">
            {footer.socials.map((name) => (
              <li key={name}>
                <a href="#footer" aria-disabled="true" title="[À VALIDER]">
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="foot__legal"
            href="/mentions-legales"
            onClick={(event) => {
              event.preventDefault()
              navigate('/mentions-legales')
            }}
          >
            {footer.legal}
          </a>
        </div>
      </div>

      <div className="foot__bottom">
        <p>© {new Date().getFullYear()} Ciao Kombucha</p>
        <p>{footer.note}</p>
      </div>
    </footer>
  )
}
