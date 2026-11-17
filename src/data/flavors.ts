import manifest from './bottle-manifest.json'
import scenes from './scene-manifest.json'

export type Flavor = {
  slug: string
  /** Nom affiché, tel qu'il devient le titre géant. */
  name: string
  /** Couleur d'ambiance, extraite de la scène studio. */
  ambiance: string
  /** Couleur de texte qui passe AA sur cette ambiance. */
  onAmbiance: 'creme' | 'encre'
  /** Accent secondaire (étiquette, fruit). */
  secondary: string
  /** Accroche de la fiche. */
  hook: string
  /** 2 à 3 notes de goût. */
  notes: string[]
  /** Ingrédients — contenu à valider côté client. */
  ingredients: string
  /** Scène studio, quand elle existe. */
  scene?: string
}

export const flavors: Flavor[] = [
  {
    slug: 'citron',
    name: 'citron',
    ambiance: 'var(--c-citron)',
    onAmbiance: 'creme',
    secondary: '#f4db6a',
    hook: 'Le citron qui réveille, sans le vinaigre qui pique.',
    notes: ['citron frais', 'zeste', 'finale nette'],
    ingredients: '[À VALIDER] thé vert, eau, sucre, cultures vivantes, citron',
    scene: '/img/scenes/citron.webp',
  },
  {
    slug: 'menthe',
    name: 'menthe',
    ambiance: 'var(--c-menthe)',
    onAmbiance: 'encre',
    secondary: '#8ac354',
    hook: 'De la menthe fraîche. Pas du chewing-gum.',
    notes: ['menthe froissée', 'verdure', 'finale courte'],
    ingredients: '[À VALIDER] thé vert, eau, sucre, cultures vivantes, menthe',
    scene: '/img/scenes/menthe.webp',
  },
  {
    slug: 'cerise',
    name: 'cerise',
    ambiance: 'var(--c-cerise)',
    onAmbiance: 'creme',
    secondary: '#e9a9b4',
    hook: 'Une cerise bien mûre, un peu acidulée.',
    notes: ['cerise noire', 'amande', 'finale sèche'],
    ingredients: '[À VALIDER] thé vert, eau, sucre, cultures vivantes, cerise',
    scene: '/img/scenes/cerise.webp',
  },
  {
    slug: 'litchi',
    name: 'litchi',
    ambiance: 'var(--c-litchi)',
    onAmbiance: 'encre',
    secondary: '#77c3d6',
    hook: "Le litchi, c'est la rose qui se mange.",
    notes: ['litchi frais', 'rose', 'douceur'],
    ingredients: '[À VALIDER] thé vert, eau, sucre, cultures vivantes, litchi',
    scene: '/img/scenes/litchi.webp',
  },
  {
    slug: 'fruits_rouges',
    name: 'fruits rouges',
    ambiance: 'var(--c-fruits-rouges)',
    onAmbiance: 'creme',
    secondary: '#d79aa6',
    hook: 'Trois fruits rouges qui se disputent la cuillère.',
    notes: ['cassis', 'framboise', 'myrtille'],
    ingredients:
      '[À VALIDER] thé vert, eau, sucre, cultures vivantes, cassis, framboise, myrtille',
    scene: '/img/scenes/fruits-rouges.webp',
  },
  {
    slug: 'gingembre_hibiscus',
    name: 'gingembre hibiscus',
    ambiance: 'var(--c-gingembre)',
    onAmbiance: 'creme',
    secondary: '#e9cd98',
    hook: "Le gingembre pique, l'hibiscus arrondit.",
    notes: ['gingembre frais', 'hibiscus', 'chaleur'],
    ingredients:
      '[À VALIDER] thé vert, eau, sucre, cultures vivantes, gingembre, hibiscus',
    scene: '/img/scenes/gingembre-hibiscus.webp',
  },
  {
    slug: 'peche',
    name: 'pêche',
    ambiance: 'var(--c-peche)',
    onAmbiance: 'encre',
    secondary: '#f09946',
    hook: 'La pêche blanche, juste assez mûre pour couler.',
    notes: ['pêche blanche', 'fleur', 'rondeur'],
    ingredients: '[À VALIDER] thé vert, eau, sucre, cultures vivantes, pêche',
    scene: '/img/scenes/peche.webp',
  },
  {
    slug: 'mangue_passion',
    name: 'mangue passion',
    ambiance: 'var(--c-mangue)',
    onAmbiance: 'encre',
    secondary: '#7f58a7',
    hook: "Mangue bien mûre, passion qui tire sur l'acide.",
    notes: ['mangue', 'fruit de la passion', 'acidité'],
    ingredients:
      '[À VALIDER] thé vert, eau, sucre, cultures vivantes, mangue, fruit de la passion',
  },
  {
    slug: 'pasteque',
    name: 'pastèque',
    ambiance: 'var(--c-pasteque)',
    onAmbiance: 'encre',
    secondary: '#de4a48',
    hook: 'La pastèque en fin de pique-nique.',
    notes: ['pastèque', 'eau fraîche', 'finale légère'],
    ingredients: '[À VALIDER] thé vert, eau, sucre, cultures vivantes, pastèque',
  },
  {
    slug: 'dragon',
    name: 'dragon',
    ambiance: 'var(--c-dragon)',
    onAmbiance: 'creme',
    secondary: '#be7ba7',
    hook: 'Le fruit du dragon, rose vif et un peu fleuri.',
    notes: ['pitaya', 'fleurs', 'finale vive'],
    ingredients:
      '[À VALIDER] thé vert, eau, sucre, cultures vivantes, fruit du dragon',
    scene: '/img/scenes/dragon.webp',
  },
]

export type BottleMeta = {
  width: number
  height: number
  ratios: number
  widths: number[]
}

const bottles = manifest as Record<string, BottleMeta>

export function bottleMeta(slug: string): BottleMeta {
  const meta = bottles[slug]
  if (!meta) throw new Error(`Bouteille manquante pour « ${slug} »`)
  return meta
}

/** src et srcset des bouteilles détourées (WebP, largeurs natives). */
export function bottleSources(slug: string) {
  const meta = bottleMeta(slug)
  const srcset = meta.widths
    .map((w) => `/img/bottles/${slug}-${w}.webp ${w}w`)
    .join(', ')
  return {
    src: `/img/bottles/${slug}-${meta.widths[0]}.webp`,
    srcset,
    width: meta.width,
    height: meta.height,
  }
}

/** Sources de la scène studio, quand elle existe (mangue passion et pastèque : non). */
export function sceneSources(slug: string) {
  const widths = (scenes as Record<string, number[]>)[slug]
  if (!widths?.length) return null
  const file = slug.replaceAll('_', '-')
  return {
    src: `/img/scenes/${file}-${widths[0]}.webp`,
    srcset: widths.map((w) => `/img/scenes/${file}-${w}.webp ${w}w`).join(', '),
  }
}

/**
 * Largeur du mot le plus long de chaque nom, en em, mesurée sur le vrai
 * Bricolage Grotesque 800 avec le tracking du site (-0,045 em).
 * Sert à dimensionner le nom géant pour qu'il remplisse toujours la largeur.
 */
const NAME_EM: Record<string, number> = {
  citron: 2.694,
  menthe: 3.557,
  cerise: 2.762,
  litchi: 2.203,
  fruits_rouges: 3.159,
  gingembre_hibiscus: 4.958,
  peche: 2.817,
  mangue_passion: 3.759,
  pasteque: 4.301,
  dragon: 3.263,
}

export function nameWidthEm(flavor: Flavor): number {
  return NAME_EM[flavor.slug] ?? 3.4
}

/** La bouteille du hero : la mieux définie du lot. */
export const heroFlavor = flavors.find((f) => f.slug === 'cerise') ?? flavors[0]
