import { useRef, useState } from 'react'
import { faq } from '../data/faq'

/**
 * Accordéon maison : bouton + région, `aria-expanded` / `aria-controls`.
 * L'ouverture anime `grid-template-rows` (0fr → 1fr), le contenu replié est
 * `inert` — donc hors du focus et de l'arbre d'accessibilité.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const listRef = useRef<HTMLUListElement>(null)

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <header className="faq__head">
        <h2 className="faq__kicker" id="faq-title">
          Questions
        </h2>
        <p className="faq__lede">Celles qu’on nous pose vraiment.</p>
      </header>

      <ul className="faq__list" ref={listRef}>
        {faq.map((item, index) => {
          const isOpen = open === index
          return (
            <li className="faq__item" data-open={isOpen} key={item.q}>
              <h3 className="faq__title">
                <button
                  type="button"
                  className="faq__q"
                  id={`faq-q-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="faq__num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="faq__label">{item.q}</span>
                  <span className="faq__sign" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </button>
              </h3>

              <div
                className="faq__panel"
                id={`faq-a-${index}`}
                role="region"
                aria-labelledby={`faq-q-${index}`}
              >
                <div className="faq__panel-inner" inert={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
