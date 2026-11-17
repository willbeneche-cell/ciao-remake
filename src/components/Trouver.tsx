import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { trouver } from '../data/copy'
import { stores } from '../data/stores'
import { LabelButton } from './LabelButton'
import { useReveal } from '../lib/scroll'

/**
 * Où nous trouver — le vrai CTA du site.
 * Une liste, pas des cartes : les lignes s'allument au survol, la ville reste
 * alignée à droite pour se lire en colonne.
 */
export function Trouver() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      id="ou-nous-trouver"
      ref={ref}
      className="trouver"
      aria-labelledby="trouver-title"
    >
      <header className="trouver__head">
        <p className="trouver__kicker">{trouver.kicker}</p>
        <h2 className="trouver__title" id="trouver-title">
          {trouver.title}
        </h2>
      </header>

      <ul className="trouver__list">
        {stores.map((store, index) => {
          const content = (
            <>
              <span className="trouver__name">{store.name}</span>
              <span className="trouver__kind">{store.kind}</span>
              <span className="trouver__city">{store.city}</span>
            </>
          )

          return (
            <li
              className="trouver__row"
              key={`${store.name}-${index}`}
              style={{ '--i': index } as CSSProperties}
            >
              {store.url ? (
                <a
                  className="trouver__entry"
                  href={store.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {content}
                </a>
              ) : (
                <span className="trouver__entry">{content}</span>
              )}
            </li>
          )
        })}
      </ul>

      <div className="trouver__foot">
        <p className="trouver__note">{trouver.note}</p>
        <LabelButton href="#faq">Une question ?</LabelButton>
      </div>
    </section>
  )
}
