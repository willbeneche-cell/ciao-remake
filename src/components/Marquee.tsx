import { marquee } from '../data/copy'

/**
 * Deux bandes inclinées, contre-rotatives, qui défilent en continu.
 * Pause au survol : le message se lit quand on s'y arrête.
 */
export function Marquee() {
  return (
    <section className="marquee" aria-label="Le mot d’ordre Ciao">
      {marquee.map((phrase, band) => (
        <div
          className="marquee__band"
          data-band={band === 0 ? 'a' : 'b'}
          key={phrase}
        >
          <div className="marquee__flow">
            {[0, 1, 2, 3].map((copy) => (
              <span
                className="marquee__item"
                key={copy}
                aria-hidden={copy > 0 ? 'true' : undefined}
              >
                {phrase}
                <span className="marquee__sep" aria-hidden="true">
                  ✳
                </span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
