import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  bottleSources,
  flavors,
  nameWidthEm,
  sceneSources,
} from '../data/flavors'
import { useReducedMotion } from '../lib/hooks'

/** Durée de la marée : le plafond du système de motion. */
const RISE_MS = 720
/** Le contenu change quand le liquide a déjà couvert le bas de l'écran. */
const SWAP_MS = 320

const pad = (index: number) => String(index + 1).padStart(2, '0')

const onAmbiance = (flavor: (typeof flavors)[number]) =>
  flavor.onAmbiance === 'encre' ? 'var(--encre)' : 'var(--creme)'

/**
 * La gamme — le cœur du site.
 *
 * Ce n'est pas un sélecteur, c'est une séquence : la section s'épingle
 * (`position: sticky`) et le scroll la traverse. Chaque cran de scroll amène
 * la bouteille suivante — elle glisse et pivote, la scène de la saveur
 * apparaît, le fond transitionne vers sa couleur et son nom devient le titre
 * géant. On avance en descendant, on recule en remontant.
 *
 * La marée : un liquide de la couleur de la nouvelle saveur monte depuis le
 * bas et recouvre la section. Une seule animation à la fois — si le scroll
 * traverse deux crans d'un coup, la couleur change en cours de route et la
 * marée se termine sur la dernière saveur, sans redémarrer.
 *
 * Le fond n'est commité qu'à la fin de la marée : c'est ce qui évite tout
 * clignotement quand le liquide se retire.
 */
export function Gamme() {
  const reduced = useReducedMotion()

  /** Saveur choisie par le scroll (la marée part tout de suite). */
  const [selected, setSelected] = useState(0)
  /** Saveur à l'écran (suit la marée). */
  const [active, setActive] = useState(0)
  /** Bouteille qui s'en va, le temps de son effacement. */
  const [outgoing, setOutgoing] = useState<number | null>(null)
  /** Couleur de fond commitée (ne change qu'à la fin de la marée). */
  const [base, setBase] = useState(0)

  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const liquidRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const swapTimer = useRef<number | undefined>(undefined)
  const commitTimer = useRef<number | undefined>(undefined)
  /** Fin prévue de la marée : le commit ne dépend pas d'un callback de frame. */
  const riseEndRef = useRef(0)
  const selectedRef = useRef(0)
  const activeRef = useRef(0)
  const shownRef = useRef(-1)

  const select = useCallback(
    (index: number) => {
      if (index === selectedRef.current) return
      selectedRef.current = index
      setSelected(index)

      window.clearTimeout(swapTimer.current)
      swapTimer.current = window.setTimeout(
        () => {
          // l'ancienne bouteille reste le temps de s'effacer sous la nouvelle
          setOutgoing(activeRef.current)
          activeRef.current = index
          setActive(index)
        },
        reduced ? 0 : SWAP_MS,
      )

      if (reduced || !liquidRef.current) {
        setBase(index)
        return
      }

      // Une marée est déjà en route : elle garde son élan et sa fin programmée.
      // Sa couleur, elle, a déjà changé : c'est ça, l'interruptibilité.
      if (!animationRef.current) {
        animationRef.current = liquidRef.current.animate(
          [
            {
              transform: 'translate3d(0, 100%, 0)',
              borderRadius: '46% 54% 0 0 / 44px 38px 0 0',
            },
            {
              transform: 'translate3d(0, 0, 0)',
              borderRadius: '0% 0% 0 0 / 0px 0px 0 0',
            },
          ],
          {
            duration: RISE_MS,
            easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
            fill: 'both',
          },
        )
        riseEndRef.current = performance.now() + RISE_MS
      }

      // Commit sur un minuteur, pas sur la fin d'animation : le fond bascule
      // même si l'onglet ne peint pas (onglet en arrière-plan, machine chargée).
      window.clearTimeout(commitTimer.current)
      commitTimer.current = window.setTimeout(
        () => {
          animationRef.current?.cancel()
          animationRef.current = null
          setBase(selectedRef.current)
        },
        Math.max(120, riseEndRef.current - performance.now() + 40),
      )
    },
    [reduced],
  )

  useEffect(() => {
    return () => {
      window.clearTimeout(swapTimer.current)
      window.clearTimeout(commitTimer.current)
      animationRef.current?.cancel()
      animationRef.current = null
    }
  }, [])

  /**
   * Le scroll pilote la séquence. `--raw` est la position continue sur la
   * gamme (0 → 9) : elle sert au remplissage de la barre de progression et à
   * l'effet de profondeur entre la bouteille et le titre. `--seg` va de 0 à 1
   * et revient à 0 dans chaque cran, pour un mouvement continu sans saut au
   * moment où la saveur change.
   */
  useEffect(() => {
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    const read = () => {
      const rect = track.getBoundingClientRect()
      // section hors champ : rien à calculer
      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      const travel = track.offsetHeight - window.innerHeight
      const passed = Math.min(Math.max(-rect.top, 0), travel)
      const progress = travel > 0 ? passed / travel : 0
      const raw = progress * (flavors.length - 1)

      section.style.setProperty('--raw', raw.toFixed(3))

      const frac = raw - Math.floor(raw)
      const seg = frac < 0.5 ? frac * 2 : (1 - frac) * 2
      section.style.setProperty('--seg', seg.toFixed(3))

      const index = Math.min(
        flavors.length - 1,
        Math.max(0, Math.round(raw)),
      )
      if (index !== shownRef.current) {
        shownRef.current = index
        select(index)
      }
    }

    read()
    // pas de rAF : un scroll event est déjà cadencé par le navigateur, et
    // l'onglet en arrière-plan doit rester cohérent
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [select])

  const current = flavors[active]
  const chosen = flavors[selected]
  const bottle = bottleSources(current.slug)
  const outBottle =
    outgoing !== null && outgoing !== active
      ? bottleSources(flavors[outgoing].slug)
      : null
  const scene = sceneSources(current.slug)

  const words = current.name.split(' ')
  // largeur : le mot le plus long doit occuper ~82 vw, mesuré sur la vraie police
  const sizeVw = Math.min(40, 82 / nameWidthEm(current))
  // hauteur : deux mots tiennent sur deux lignes sans écraser la bouteille
  const sizeVh = words.length === 1 ? 50 : 28

  const sectionStyle = {
    backgroundColor: flavors[base].ambiance,
    '--ambiance': current.ambiance,
    '--on-ambiance': onAmbiance(current),
  } as CSSProperties

  return (
    <div
      className="gamme-track"
      ref={trackRef}
      style={{ '--steps': flavors.length - 1 } as CSSProperties}
    >
      <section
        id="gamme"
        ref={sectionRef}
        className="gamme"
        aria-labelledby="gamme-title"
        style={sectionStyle}
      >
        <div
          ref={liquidRef}
          className="gamme__liquid"
          aria-hidden="true"
          style={{ backgroundColor: chosen.ambiance }}
        />

        <header className="gamme__head">
          <h2 className="gamme__kicker" id="gamme-title">
            La gamme
          </h2>
          <p className="gamme__count" aria-hidden="true">
            <b>{pad(active)}</b>
            <span>/ {flavors.length}</span>
          </p>
        </header>

        <div className="gamme__stage">
          <div className="gamme__poster">
            <p
              className="gamme__name"
              key={`name-${current.slug}`}
              aria-hidden="true"
              style={{
                fontSize: `clamp(2.2rem, min(${sizeVw.toFixed(2)}vw, ${sizeVh.toFixed(2)}svh), 26rem)`,
              }}
            >
              {words.map((word, index) => (
                <span
                  className="gamme__word"
                  key={`${word}-${index}`}
                  style={{ '--d': `${index * 90}ms` } as CSSProperties}
                >
                  <span>{word}</span>
                </span>
              ))}
            </p>

            <div className="gamme__bottle-holder">
              {outBottle ? (
                <img
                  className="gamme__bottle gamme__bottle--out"
                  key={`out-${outgoing}`}
                  src={outBottle.src}
                  width={outBottle.width}
                  height={outBottle.height}
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                />
              ) : null}

              <img
                className="gamme__bottle"
                key={`in-${current.slug}`}
                src={bottle.src}
                width={bottle.width}
                height={bottle.height}
                alt={`Bouteille Ciao ${current.name}, 330 ml`}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="gamme__fiche" key={`fiche-${current.slug}`}>
            <div className="gamme__fiche-text">
              <p className="gamme__hook">{current.hook}</p>

              <ul className="gamme__notes">
                {current.notes.map((note, index) => (
                  <li key={note} style={{ '--i': index } as CSSProperties}>
                    {note}
                  </li>
                ))}
              </ul>

              <p className="gamme__ingredients">
                <span className="gamme__label">Ingrédients</span>{' '}
                {current.ingredients.replace('[À VALIDER] ', '')}
              </p>
            </div>

            {scene ? (
              <figure className="gamme__card">
                <img
                  src={scene.src}
                  srcSet={scene.srcset}
                  sizes="(max-width: 900px) 96px, 150px"
                  alt={`La saveur ${current.name} photographiée en studio`}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ) : null}
          </div>
        </div>

        <div className="gamme__foot">
          <p className="gamme__hint">Défile pour changer de saveur</p>

          <div className="gamme__progress" aria-hidden="true">
            {flavors.map((flavor, index) => (
              <span
                className="gamme__seg"
                key={flavor.slug}
                style={{ '--k': index } as CSSProperties}
              />
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {current.name}, saveur {active + 1} sur {flavors.length}
        </p>
      </section>
    </div>
  )
}
