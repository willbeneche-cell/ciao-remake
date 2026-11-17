import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'

type Props = {
  children: ReactNode
  href?: string
  className?: string
  arrow?: boolean
  block?: boolean
  onClick?: () => void
  /** Couleur du liquide ; par défaut, la saveur active. */
  fill?: string
  ink?: string
}

type Burst = { x: number; y: number; id: number }

/**
 * Le bouton Ciao : une étiquette de bouteille au coin décollé.
 * Au survol, le liquide monte dedans ; au clic, une bulle s'échappe
 * du coin. Aucune animation ne bloque l'action.
 */
export function LabelButton({
  children,
  href,
  className = '',
  arrow = true,
  block = false,
  onClick,
  fill = 'var(--ambiance)',
  ink = 'var(--on-ambiance)',
}: Props) {
  const [burst, setBurst] = useState<Burst | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handlePointerDown = useCallback((event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setBurst({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      id: Date.now(),
    })
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setBurst(null), 480)
  }, [])

  const style = {
    '--btn-fill': fill,
    '--btn-ink': ink,
    ...(burst ? { '--bx': `${burst.x}px`, '--by': `${burst.y}px` } : null),
  } as CSSProperties

  const classes = [
    'label-btn',
    block ? 'label-btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <svg className="label-btn__arrow" viewBox="0 0 14 14" aria-hidden="true">
          <path
            d="M2 7h9M7.6 3.3 11.3 7l-3.7 3.7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      {burst ? (
        <span key={burst.id} className="label-btn__burst" aria-hidden="true" />
      ) : null}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        onPointerDown={handlePointerDown}
        onClick={onClick}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      style={style}
      onPointerDown={handlePointerDown}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
