import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { manifeste } from '../data/manifeste'

/**
 * Manifeste — typographie seule, beaucoup de vide.
 * Les phrases montent une à une quand la section entre dans le champ.
 */
export function Manifeste() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        el.dataset.in = 'true'
        observer.disconnect()
      },
      { rootMargin: '0px 0px -22% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="manifeste"
      className="manifeste"
      aria-labelledby="manifeste-title"
    >
      <header>
        <h2 className="manifeste__kicker" id="manifeste-title">
          Manifeste
        </h2>
      </header>

      <div className="manifeste__body">
        {manifeste.map((line, index) => (
          <p
            key={line}
            className={
              index === manifeste.length - 1
                ? 'manifeste__line manifeste__line--aside'
                : 'manifeste__line'
            }
            style={{ '--d': `${index * 130}ms` } as CSSProperties}
          >
            <span>{line}</span>
          </p>
        ))}
      </div>
    </section>
  )
}
