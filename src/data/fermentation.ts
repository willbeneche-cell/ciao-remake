/**
 * La vraie fermentation — quatre étapes, aucune allégation santé.
 * `[À VALIDER]` : les durées et températures réelles sont de toi.
 */
export type Step = {
  title: string
  text: string
}

export const steps: Step[] = [
  {
    title: 'Le thé',
    text: "Thé vert, eau, un peu de sucre. On infuse, on laisse tiédir. C'est le petit-déjeuner des cultures.",
  },
  {
    title: 'La culture',
    text: "Un SCOBY : levures et bactéries vivantes dans une même galette. Elle mange le sucre, elle rend de l'acidité et des bulles. C'est elle qui travaille.",
  },
  {
    title: 'La fermentation',
    text: "Une à deux semaines à température ambiante. On goûte, on attend, on goûte encore. Jamais de chauffage : on ne pasteurise pas. [À VALIDER — durée]",
  },
  {
    title: 'La mise en bouteille',
    text: 'Fruits pressés ou macérés, puis bouchon. La fermentation continue doucement, au frais. C’est pour ça que ça pétille.',
  },
]
