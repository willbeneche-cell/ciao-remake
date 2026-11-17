import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { engagements } from '../data/copy'
import { useReveal } from '../lib/scroll'

/**
 * Quatre preuves, pas quatre cartes. Deux blocs larges, deux plus petits,
 * posés en quinconce sur l'encre : c'est la grille qui fait le rythme.
 */
export function Engagements() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      id="engagements"
      ref={ref}
      className="engage"
      aria-labelledby="engage-title"
    >
      <header className="engage__head">
        <h2 className="engage__kicker" id="engage-title">
          Engagements
        </h2>
        <p className="engage__lede">
          Quatre choses qu’on ne négocie pas. Le reste, c’est du goût.
        </p>
      </header>

      <ul className="engage__grid">
        {engagements.map((item, index) => (
          <li
            key={item.word}
            className={`engage__item engage__item--${item.size}`}
            style={{ '--i': index } as CSSProperties}
          >
            <p className="engage__word">{item.word}</p>
            <p className="engage__line">{item.line}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
