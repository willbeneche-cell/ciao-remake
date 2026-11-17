import manifest from './panorama-manifest.json'

type Entry = {
  width: number
  height: number
  widths: number[]
}

const panos = manifest as Record<string, Entry | undefined>

export type Panorama = {
  src: string
  srcset: string
  width: number
  height: number
}

/** Les deux shootings « toute la bande », réduits au format web. */
export function panoramaSources(slug: string): Panorama | null {
  const entry = panos[slug]
  if (!entry) return null

  const widest = entry.widths[entry.widths.length - 1]
  return {
    src: `/img/panoramas/${slug}-${widest}.webp`,
    srcset: entry.widths
      .map((width) => `/img/panoramas/${slug}-${width}.webp ${width}w`)
      .join(', '),
    width: entry.width,
    height: entry.height,
  }
}
