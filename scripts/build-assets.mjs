/**
 * Génère les dérivés web des bouteilles détourées.
 *
 * - WebP + AVIF, deux largeurs (native et moitié), jamais d'agrandissement.
 * - Écrit src/data/bottle-manifest.json : dimensions intrinsèques par saveur,
 *   pour que le rendu réserve la bonne place (CLS = 0).
 *
 * Usage : npm run assets
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const CUT_DIR = 'assets-work/cut'
const OUT_DIR = 'public/img/bottles'
const MANIFEST = 'src/data/bottle-manifest.json'
const SCENE_SRC = 'image'
const SCENE_OUT = 'public/img/scenes'

/** Scènes studio disponibles (mangue passion et pastèque n'en ont pas). */
const SCENES = [
  'cerise',
  'citron',
  'dragon',
  'fruits_rouges',
  'gingembre_hibiscus',
  'litchi',
  'menthe',
  'peche',
]

const webp = { quality: 84, alphaQuality: 92, effort: 6 }
const avif = { quality: 58, effort: 6, chromaSubsampling: '4:2:0' }

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  await mkdir(path.dirname(MANIFEST), { recursive: true })

  const files = (await readdir(CUT_DIR)).filter((f) => f.endsWith('.png'))
  const manifest = {}

  for (const file of files.sort()) {
    const slug = path.basename(file, '.png')
    const input = path.join(CUT_DIR, file)
    const meta = await sharp(input).metadata()
    const w = meta.width
    const h = meta.height

    const widths = w > 520 ? [w, Math.round(w / 2)] : [w]
    const sizes = []

    for (const target of widths) {
      const base = sharp(input).resize({ width: target, withoutEnlargement: true })
      const webpFile = path.join(OUT_DIR, `${slug}-${target}.webp`)
      const avifFile = path.join(OUT_DIR, `${slug}-${target}.avif`)
      await base.clone().webp(webp).toFile(webpFile)
      await base.clone().avif(avif).toFile(avifFile)
      const info = await sharp(webpFile).metadata()
      sizes.push({ width: info.width, height: info.height })
    }

    const largest = sizes[0]
    manifest[slug] = {
      width: largest.width,
      height: largest.height,
      ratios: +(largest.width / largest.height).toFixed(4),
      widths: sizes.map((s) => s.width),
    }
    console.log(
      `${slug.padEnd(20)} ${w}x${h} -> ${sizes.map((s) => s.width).join(', ')} px`,
    )
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`\n${files.length} bouteilles, manifeste écrit dans ${MANIFEST}`)

  await buildScenes()
}

/**
 * Scènes studio : deux largeurs, WebP. Servent de carte « studio » dans la fiche
 * de la gamme ; jamais en fond plein écran (768 px ne suffisent pas).
 */
async function buildScenes() {
  await mkdir(SCENE_OUT, { recursive: true })
  const sceneManifest = {}

  for (const slug of SCENES) {
    const candidates = [`${SCENE_SRC}/scene_${slug}.jpg`, `${SCENE_SRC}/scene_${slug}.png`]
    let input = null
    for (const file of candidates) {
      try {
        await sharp(file).metadata()
        input = file
        break
      } catch {
        /* on essaie l'extension suivante */
      }
    }
    if (!input) {
      console.warn(`scène manquante : ${slug}`)
      continue
    }

    const meta = await sharp(input).metadata()
    const widths = [420, Math.min(meta.width, 840)].filter(
      (w, i, all) => all.indexOf(w) === i,
    )

    for (const width of widths) {
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 72, effort: 6 })
        .toFile(`${SCENE_OUT}/${slug.replaceAll('_', '-')}-${width}.webp`)
    }

    sceneManifest[slug] = widths
    console.log(`scène ${slug.padEnd(20)} ${meta.width}x${meta.height} -> ${widths.join(', ')} px`)
  }

  await writeFile(
    'src/data/scene-manifest.json',
    JSON.stringify(sceneManifest, null, 2) + '\n',
  )

  await buildPanoramas()
}

/**
 * Les deux shootings « toute la bande ». Ils sont sur fond noir : ils servent
 * de plateau nuit sur l'encre, jamais de fond clair.
 */
async function buildPanoramas() {
  const out = 'public/img/panoramas'
  await mkdir(out, { recursive: true })
  const manifest = {}

  const shots = [
    ['toutes_gammes_02', 'image/shooting_toutes_les_gammes_02.png'],
    ['toutes_gammes_01', 'image/shooting_toutes_les_gammes.png'],
  ]

  for (const [slug, input] of shots) {
    try {
      await sharp(input).metadata()
    } catch {
      console.warn(`panorama manquant : ${slug}`)
      continue
    }

    const meta = await sharp(input).metadata()
    const widths = [...new Set([Math.min(meta.width, 900), Math.min(meta.width, 1600)])]

    for (const width of widths) {
      const base = sharp(input).resize({ width, withoutEnlargement: true })
      await base.clone().webp({ quality: 74, effort: 6 }).toFile(`${out}/${slug}-${width}.webp`)
      await base
        .clone()
        .avif({ quality: 52, effort: 6, chromaSubsampling: '4:2:0' })
        .toFile(`${out}/${slug}-${width}.avif`)
    }

    const largest = await sharp(`${out}/${slug}-${widths.at(-1)}.webp`).metadata()
    manifest[slug] = {
      width: largest.width,
      height: largest.height,
      widths,
    }
    console.log(
      `panorama ${slug.padEnd(16)} ${meta.width}x${meta.height} -> ${widths.join(', ')} px`,
    )
  }

  await writeFile(
    'src/data/panorama-manifest.json',
    JSON.stringify(manifest, null, 2) + '\n',
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
