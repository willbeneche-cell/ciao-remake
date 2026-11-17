/** Six questions, ton léger, zéro allégation santé. `[À VALIDER]` */

export type Question = {
  q: string
  a: string
}

export const faq: Question[] = [
  {
    q: 'C’est quoi ce truc qui flotte ?',
    a: 'C’est la culture — le SCOBY — et un peu de dépôt de levures. C’est le signe que ça a fermenté pour de vrai. Secoue doucement la bouteille avant d’ouvrir.',
  },
  {
    q: 'Pourquoi à conserver au frais ?',
    a: 'Parce que ce n’est pas pasteurisé. Au frais, la fermentation ralentit et le goût reste stable. Sur l’étagère du salon, elle continue de travailler — et ça finit par se sentir.',
  },
  {
    q: 'Ça a le goût de vinaigre ?',
    a: 'Non. Nos recettes sont douces et fruitées, plus proches d’un soda léger que d’un kombucha traditionnel. Si tu cherches l’acidité qui pique, ce n’est pas nous.',
  },
  {
    q: 'C’est sucré ?',
    a: 'Peu. Une grande partie du sucre a été mangée pendant la fermentation. [À VALIDER — grammages exacts]',
  },
  {
    q: 'Ça se boit quand ?',
    a: 'À l’apéro, au goûter, avec un plat un peu gras. Bien frais, dans un verre, avec des glaçons si tu veux.',
  },
  {
    q: 'Combien de temps je peux la garder ?',
    a: 'Bouteille fermée, au frais : [À VALIDER — DDM réelle]. Une fois ouverte, finis-la dans les jours qui suivent : elle perd ses bulles.',
  },
]
