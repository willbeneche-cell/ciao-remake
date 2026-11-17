/**
 * Système de motion — source unique de vérité.
 * Voir docs/02-direction-artistique.md §6.
 *
 * Règles :
 * - aucune durée ni courbe n'est écrite en dur ailleurs ;
 * - UI < 300 ms ; entrées marketing 520–640 ms ; marée ≤ 900 ms ;
 * - les sorties sont ~20 % plus rapides que les entrées ;
 * - ease-in interdit ; rien ne bloque l'interaction.
 */

/** Courbes cubic-bezier, utilisables en CSS et par Motion (tableau de 4). */
export const ease = {
  /** sorties, entrées d'UI, feedback — la courbe de référence */
  out: [0.23, 1, 0.32, 1],
  /** déplacements à l'écran */
  inOut: [0.77, 0, 0.175, 1],
  /** menu plein écran, panneaux */
  drawer: [0.32, 0.72, 0, 1],
  /** ménisque, remplissages liquides */
  liquid: [0.33, 1, 0.68, 1],
  /** éclat de bulle, coin d'étiquette qui se soulève (dépassement assumé) */
  pop: [0.34, 1.42, 0.64, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>

/** Durées en millisecondes. */
export const duration = {
  press: 120,
  hover: 180,
  micro: 220,
  ui: 260,
  enter: 560,
  section: 760,
  flavor: 900,
} as const

/** Ressorts Motion. */
export const spring = {
  /** le verre est lourd : il démarre doucement et s'arrête net */
  bottle: { stiffness: 110, damping: 16, mass: 1.1 },
  /** respiration au repos */
  float: { stiffness: 55, damping: 11 },
  /** anneau du curseur */
  cursor: { stiffness: 260, damping: 26, mass: 0.35 },
} as const

/** Décalages de chorégraphie (ms). Non uniformes, plafonnés. */
export const stagger = {
  hero: 110,
  words: 90,
  lines: 60,
  cap: 480,
} as const

/** Version CSS d'une courbe, pour les styles inline. */
export const css = (curve: readonly number[]): string =>
  `cubic-bezier(${curve.join(', ')})`
