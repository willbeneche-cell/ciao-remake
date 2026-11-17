/** Tous les textes de section, hors saveurs, enseignes et FAQ. `[À VALIDER]` */

export const marquee = [
  'Le vinaigre, c’est pour la salade',
  'Non pasteurisé, donc vivant · à garder au frais, comme nous',
]

export const bande = {
  kicker: 'Toute la bande',
  title: 'Dix bouteilles, une seule fermentation.',
  line: 'Même thé, même culture, même patience. Après, chacune prend sa couleur.',
}

export type Engagement = {
  word: string
  line: string
  size: 'big' | 'small'
}

export const engagements: Engagement[] = [
  {
    word: 'Bio',
    line: 'Les ingrédients sont bio. Le reste, c’est de la fermentation. [À VALIDER — certification exacte]',
    size: 'big',
  },
  {
    word: 'Non pasteurisé',
    line: 'On ne chauffe pas. C’est ce qui laisse les cultures vivantes dans la bouteille.',
    size: 'big',
  },
  {
    word: 'Peu de sucre',
    line: 'Le sucre, les levures s’en occupent. Il en reste peu. [À VALIDER — grammages]',
    size: 'small',
  },
  {
    word: 'Sans additifs',
    line: 'Pas de colorant, pas d’arôme de synthèse, pas de conservateur. [À VALIDER]',
    size: 'small',
  },
]

export const trouver = {
  kicker: 'Où nous trouver',
  title: 'On est quelque part près de chez toi.',
  note: 'À conserver au frais. Demande où se trouve le frigo.',
}

export const footer = {
  baseline: 'Kombucha vivant, fait pour être fini.',
  legal: 'Mentions légales',
  socials: ['Instagram', 'TikTok'],
  note: 'Réseaux et mentions : contenus de démonstration. [À VALIDER]',
}
