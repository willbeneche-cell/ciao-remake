import { useRef } from 'react'
import { bande } from '../data/copy'
import { panoramaSources } from '../data/panoramas'
import { useTrackProgress } from '../lib/scroll'
import { useReducedMotion } from '../lib/hooks'

/**
 * Toute la bande — trois panneaux qui défilent à l'horizontale.
 *
 * Desktop : pin vertical converti en translation horizontale (sticky + --p).
 * Mobile : défilement natif avec snap, une planche à la fois — c'est plus
 * agréable au doigt qu'un pin qui confisque le scroll.
 *
 * Les deux shootings sont sur fond noir : on en fait un plateau nuit, sur
 * l'encre, et le panneau typographique crème vient casser le noir.
 */
export function Bande() {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useTrackProgress(trackRef, sectionRef)

  const second = panoramaSources('toutes_gammes_02')
  const first = panoramaSources('toutes_gammes_01')

  return (
    <div
      className={reduced ? 'bande-track bande-track--static' : 'bande-track'}
      ref={trackRef}
    >
      <section
        id="bande"
        ref={sectionRef}
        className="bande"
        aria-labelledby="bande-title"
      >
        <div className="bande__rail">
          {second ? (
            <figure className="bande__panel bande__panel--shot">
              <img
                src={second.src}
                srcSet={second.srcset}
                sizes="100vw"
                width={second.width}
                height={second.height}
                alt="Les dix bouteilles Ciao alignées sur fond noir"
                loading="lazy"
                decoding="async"
              />
            </figure>
          ) : null}

          <div className="bande__panel bande__panel--type">
            <p className="bande__kicker">{bande.kicker}</p>
            <h2 className="bande__title" id="bande-title">
              {bande.title}
            </h2>
            <p className="bande__line">{bande.line}</p>
          </div>

          {first ? (
            <figure className="bande__panel bande__panel--shot">
              <img
                src={first.src}
                srcSet={first.srcset}
                sizes="100vw"
                width={first.width}
                height={first.height}
                alt="La gamme Ciao au complet, bouteilles posées au sol"
                loading="lazy"
                decoding="async"
              />
            </figure>
          ) : null}
        </div>
      </section>
    </div>
  )
}
