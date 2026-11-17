/**
 * Les enseignes — tout est placeholder : noms, villes et liens sont à remplacer.
 * `url` est optionnel : sans lien, la ligne reste du texte.
 */
export type Store = {
  name: string
  city: string
  /** Épicerie, café, restaurant… */
  kind: string
  url?: string
}

export const stores: Store[] = [
  { name: '[ENSEIGNE 01]', city: '[VILLE]', kind: 'Épicerie' },
  { name: '[ENSEIGNE 02]', city: '[VILLE]', kind: 'Café' },
  { name: '[ENSEIGNE 03]', city: '[VILLE]', kind: 'Bio' },
  { name: '[ENSEIGNE 04]', city: '[VILLE]', kind: 'Restaurant' },
  { name: '[ENSEIGNE 05]', city: '[VILLE]', kind: 'Épicerie' },
  { name: '[ENSEIGNE 06]', city: '[VILLE]', kind: 'Marché' },
  { name: '[ENSEIGNE 07]', city: '[VILLE]', kind: 'Caviste' },
  { name: '[ENSEIGNE 08]', city: '[VILLE]', kind: 'Bio' },
]
