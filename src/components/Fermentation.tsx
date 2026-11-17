import { useRef, useState } from 'react'
import { steps } from '../data/fermentation'
import { useTrackProgress } from '../lib/scroll'
import { useReducedMotion } from '../lib/hooks'

/**
 * La vraie fermentation — trois écrans épinglés.
 *
 * Le scroll fait monter un trait de liquide le long de la colonne ; chaque
 * étape s'allume quand son tour arrive. Un seul dessin autorisé : le cercle
 * qui grandit, la culture, en trait, jamais en faux réalisme.
 */
export function Fermentation() {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)

  useTrackProgress(trackRef, sectionRef, {
    steps: steps.length,
    onStep: setIndex,
  })

  return (
    <div
      className={reduced ? 'ferm-track ferm-track--static' : 'ferm-track'}
      ref={trackRef}
    >
      <section
        id="fermentation"
        ref={sectionRef}
        className="ferm"
        aria-labelledby="ferm-title"
      >
        <header className="ferm__head">
          <h2 className="ferm__kicker" id="ferm-title">
            La vraie fermentation
          </h2>
          <p className="ferm__lede">
            Quatre étapes. Aucune pasteurisation. La culture fait le travail,
            nous on attend.
          </p>
        </header>

        <div className="ferm__body">
          <div className="ferm__rail" aria-hidden="true">
            <span className="ferm__fill" />
            <svg className="ferm__scoby" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          </div>

          <ol className="ferm__steps">
            {steps.map((step, position) => (
              <li
                key={step.title}
                className="ferm__step"
                data-on={reduced || position <= index}
                data-active={!reduced && position === index}
              >
                <span className="ferm__num">
                  {String(position + 1).padStart(2, '0')}
                </span>
                <h3 className="ferm__title">{step.title}</h3>
                <p className="ferm__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
