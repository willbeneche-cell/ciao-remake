import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { spring } from '../motion/motion'
import { useFinePointer, useReducedMotion } from '../lib/hooks'

/**
 * Curseur Ciao : un point net + un anneau qui traîne légèrement.
 * Il grossit sur les zones cliquables, disparaît sur mobile et en
 * mouvement réduit, et ne s'active jamais si le JS ne tourne pas.
 */
export function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const enabled = fine && !reduced
  const [active, setActive] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, spring.cursor)
  const ringY = useSpring(y, spring.cursor)

  useEffect(() => {
    if (!enabled) return

    const root = document.documentElement
    root.classList.add('has-cursor')

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      setActive(
        Boolean(
          target.closest('a, button, [role="button"], input, textarea, select'),
        ),
      )
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })

    return () => {
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div className="cursor" style={{ x, y }} aria-hidden="true">
        <span className="cursor__dot" />
      </motion.div>
      <motion.div
        className="cursor"
        style={{ x: ringX, y: ringY }}
        data-active={active}
        aria-hidden="true"
      >
        <span className="cursor__ring" />
      </motion.div>
    </>
  )
}
