import ciao from '../assets/ciao.svg?raw'

type Props = {
  className?: string
  /** Nom accessible. Vide = décoratif (le parent porte déjà le nom). */
  label?: string
}

/**
 * Logotype Ciao, inline : il prend la couleur du texte et peut être
 * découpé par le liquide du chargement.
 */
export function Logo({ className = '', label = 'Ciao' }: Props) {
  return (
    <span
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: ciao }}
    />
  )
}
