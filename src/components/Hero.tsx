import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { LabelButton } from './LabelButton'
import { bottleSources, heroFlavor } from '../data/flavors'
import { spring } from '../motion/motion'
import { useFinePointer, useReducedMotion } from '../lib/hooks'

const bottle = bottleSources(heroFlavor.slug)

/** Décalage d'un élément dans la chorégraphie d'entrée. */
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

export function Hero() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const tilt = fine && !reduced

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [3.5, -3.5]),
    spring.bottle,
  )
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-6, 6]),
    spring.bottle,
  )
  const shiftX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-9, 9]),
    spring.bottle,
  )
  const shiftY = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [-6, 6]),
    spring.bottle,
  )

  useEffect(() => {
    if (!tilt) return
    const onMove = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5)
      pointerY.set(event.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [tilt, pointerX, pointerY])

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__stage" aria-hidden="true">
        <div className="hero__glow" />
        <div className="hero__circle" />
      </div>

      <h1 className="hero__title" id="hero-title">
        <span className="hero__line" style={delay(0)}>
          <span>ça</span>
        </span>{' '}
        <span className="hero__line" style={delay(80)}>
          <span>
            bulle<span className="dot">.</span>
          </span>
        </span>
      </h1>

      <div className="hero__bottle-wrap">
        <div className="hero__shadow" aria-hidden="true" />
        <div className="hero__bottle-idle">
          <motion.div
            className="hero__bottle-tilt"
            style={{
              rotateX,
              rotateY,
              x: shiftX,
              y: shiftY,
              transformPerspective: 900,
            }}
          >
            <img
              className="hero__bottle"
              src={bottle.src}
              width={bottle.width}
              height={bottle.height}
              alt={`Bouteille Ciao ${heroFlavor.name}, 330 ml`}
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>
        </div>
      </div>

      <div className="hero__meta">
        <p className="hero__lede anim" style={delay(260)}>
          Dix saveurs vivantes, fermentées pour de vrai, à garder au frais.
        </p>
        <div className="anim" style={delay(360)}>
          <LabelButton href="#ou-nous-trouver">Où nous trouver</LabelButton>
        </div>
      </div>

      <p className="hero__hint anim" style={delay(520)} aria-hidden="true">
        <span className="hero__hint-line" />
        La gamme · 10 saveurs
      </p>
    </section>
  )
}
