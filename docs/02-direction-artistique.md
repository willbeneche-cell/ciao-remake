# PHASE 2 — DIRECTION ARTISTIQUE

**Version :** 1.0 — document de travail, à valider avant toute ligne de code.
**Ce document contient :** le monde visuel, la palette complète (base + 10 saveurs, avec contrastes calculés), deux appairages typographiques et une recommandation argumentée, le langage de boutons, le système de motion, la structure section par section, et les dépendances techniques avec leur justification.

---

## 1. Le monde visuel — « Ça bulle »

### L'idée en une phrase

**Le site est un verre qu'on remplit.** La page n'a pas un fond qui change de couleur : elle a **un liquide qui monte et qui se remplace** à chaque saveur.

C'est ce qui nous sépare de la référence. Chez ūm, le fond *change* de couleur (crossfade). Chez Ciao, la couleur **afflue** : elle entre par le bas avec un ménisque qui ondule, elle noie l'écran, elle se retire quand on passe à la saveur suivante. C'est le même geste que servir un verre, et c'est un geste que ton produit fait pour de vrai.

### Les trois matières

Toute la direction artistique découle de trois matières, et rien d'autre. Si un élément ne peut pas se rattacher à l'une des trois, il n'a rien à faire sur le site.

| Matière | Ce que ça donne | Où on la voit |
|---|---|---|
| **Le liquide** | des aplats francs qui montent, ondoiements, teintes saturées, transparence | changement de saveur, fonds de section, barre de progression |
| **La bulle** | des cercles, du vide, du rythme, des micro-explosions | particules WebGL, sélecteur de saveurs, boutons, séparateurs |
| **Le verre** | des reflets, des liserés, une lumière rasante, de la transparence | navbar, cartes, bord du hero, étiquette des boutons |

### Le grain

Un grain fin, **fixe** (pas animé, pas de bruit par frame : c'est un coût GPU pour rien), à 3–4 % d'opacité, en overlay sur toute la page. Il fait tenir ensemble la photo studio, les aplats de couleur et la typo. Il donne aussi au crème sa matière de papier.

### Ce que le site refuse explicitement

- Pas de cartes identiques alignées en grille SaaS. Les blocs d'information seront **asymétriques et de tailles inégales**, comme des objets posés sur une table.
- Pas de dégradé violet/bleu, à aucun endroit, même en lumière d'ambiance.
- Pas d'Inter, Roboto, Arial, pas de police système. Pas de titres condensés en capitales.
- Pas d'ombres molles partout : une seule ombre dans le système, celle de la bouteille (elle porte le poids), plus une ombre très courte sur les éléments cliquables.
- Pas d'emoji comme icône. Les rares icônes seront dessinées (flèche, plus/moins, croix), en trait de 1,5 px.
- Pas de fade-in de toutes les sections au scroll. Une section entre en scène **quand elle a quelque chose à raconter**, pas parce qu'elle existe.
- Pas de parallaxe sur le texte (illisible), pas de scroll-jacking.

### Ce qu'on emprunte à la référence — et ce qu'on en fait

| L'esprit de ūm | Notre version Ciao |
|---|---|
| Compteur de chargement | compteur **réel** (décodage des images + polices), avec bulles qui montent et le logo qui se remplit de liquide |
| Titre géant traversé par la bouteille | identique dans le principe, mais **le titre est rond, gourmand, en bas de casse** — pas de condensé capitales |
| Fond qui prend la couleur de la saveur | **la marée** : le liquide monte, ondule et se retire. Plus physique, plus lent, plus gourmand |
| Grille de blocs à gros mots-clés | blocs **asymétriques**, mots-clés en Fraunces, chiffres en tabulaire |
| Marquee incliné | marquee incliné **mais en deux bandes contre-rotatives**, et il s'arrête au survol |
| Curseur personnalisé | un point + un anneau à ressort, qui **grossit sur les zones cliquables** et disparaît sur mobile |
| Navbar pleine largeur en capitales condensées | **navbar en deux pastilles flottantes**, typo en bas de casse avec des index chiffrés (voir §4) |
| Bouton noir + pastille citron | **bouton-étiquette** avec coin décollé et remplissage liquide (voir §5) |
| Palette vert/orange/rose/citron saturés | crème + encre, **une seule couleur de saveur à l'écran** (voir §3) |

---

## 2. Le geste signature : « la marée »

C'est le moment qui doit faire dire « ah ». Il se produit **chaque fois qu'on change de saveur**, donc il doit être rapide, interruptible et jamais lassant.

**Ce qui se passe, dans l'ordre :**

1. Le nouveau liquide **entre par le bas** et monte jusqu'à couvrir l'écran. Son bord supérieur est un **ménisque** : une vague légère, une seule oscillation, pas un drapeau qui flotte. 900 ms.
2. La bouteille sortante **s'enfonce** de 12 px et s'efface (180 ms), la nouvelle **remonte** de 40 px avec un léger pivot (−4° → 0°) sur un ressort (≈ 620 ms). Elle émerge du liquide.
3. Le **nom géant** sort par le bas en `clip-path`, le nouveau nom entre **mot par mot** (masque + 6 px), 90 ms entre les mots. Le nom est *derrière* la bouteille.
4. Les **notes de goût** (2–3 lignes) entrent en fade + 6 px, 60 ms d'écart.
5. La **densité de bulles** pulse une fois, synchronisée avec l'arrivée du liquide.
6. Le **compteur de gamme** (03 / 10) roule en chiffres tabulaires.

**Interruptibilité :** si on reclique une saveur pendant la marée, **la marée se réoriente** au lieu de redémarrer. Techniquement : une seule valeur animée (teinte + progression) qu'on retargete, jamais deux animations concurrentes. C'est la règle qui évite l'effet « ça bafouille » quand on clique vite.

**Nom officiel de l'effet** (vocabulaire motion) : un *Reveal* par `clip-path` sur un champ de couleur, avec *spring* et *squash & stretch* sur le ménisque.

---

## 3. Palette

### 3.1 Base neutre chaude

| Token | Valeur | Usage | Contraste |
|---|---|---|---|
| `--creme` | `#F7F2E8` | fond principal, texte sur encre | **16,56:1** avec l'encre |
| `--creme-2` | `#EFE7D8` | surfaces, panneaux, cartes | 1,10:1 avec crème (séparation douce, jamais du texte dessus) |
| `--encre` | `#17130F` | texte, fonds sombres, logo | **16,56:1** |
| `--encre-70` | `#4A423A` | texte secondaire | 8,1:1 sur crème |
| `--encre-40` | `#8B8279` | légendes, états faibles — **jamais du texte essentiel** | 3,1:1 (AA large uniquement) |
| `--verre` | `#FFFFFF` à 12 % + `backdrop-filter: blur(10px)` | navbar, pastilles | — |

**Pas de couleur d'accent fixe.** L'accent, c'est la saveur. C'est la règle qui garantit « une seule couleur dominante à l'écran à la fois » et c'est aussi ce qui rendra la marque reconnaissable sans logo.

### 3.2 Les dix couleurs de saveur

Les couleurs d'ambiance sont **extraites des scènes** (mesure des aplats de sol et de mur), pas des étiquettes — voir l'audit, §6. Le « texte sur ambiance » est la couleur qui passe **AA (4,5:1)** sur chaque fond : c'est calculé, pas choisi à l'œil.

| # | Saveur | Ambiance | Texte sur ambiance | Ratio | Secondaire (étiquette) |
|---|---|---|---|---|---|
| 01 | **Citron** | `#4A6CA8` bleu myosotis | crème | 4,70 | `#F4DB6A` citron |
| 02 | **Menthe** | `#4E9145` vert menthe | encre | 4,80 | `#8AC354` vert clair |
| 03 | **Cerise** | `#C93A55` framboise | crème | 4,46 | `#E9A9B4` rose poudré |
| 04 | **Litchi** | `#E8849B` rose litchi | encre | 7,22 | `#77C3D6` bleu ciel |
| 05 | **Fruits rouges** | `#7A1B2D` bordeaux | crème | 9,31 | `#D79AA6` rose fumé |
| 06 | **Gingembre hibiscus** | `#C0403C` brique | crème | 4,66 | `#E9CD98` sable |
| 07 | **Pêche** | `#C96A2E` terracotta | encre | 4,91 | `#F09946` abricot |
| 08 | **Mangue passion** | `#E08A2B` ambre | encre | 6,90 | `#7F58A7` indigo |
| 09 | **Pastèque** | `#1E8F5A` vert pastèque | encre | 4,52 | `#DE4A48` chair |
| 10 | **Dragon** | `#9C4F7C` magenta prune | crème | 4,92 | `#BE7BA7` lavande fumée |

Trois décisions à valider ici :

1. **Citron = bleu myosotis.** C'est la couleur réelle de ta scène citron (mur et sol bleus, étiquette bleu ciel, logo jaune). Le yellow citron reste présent dans la bouteille, la scène et l'accent secondaire. Résultat : le citron ne ressemble pas à tous les citrons du marché. *C'est le pari le plus visible du document — dis-moi si tu le refuses, je bascule sur un jaune pâle `#E8D06A` et le site perd un peu de sa singularité.*
2. **Trois rouges, deux roses.** Cerise / fruits rouges / gingembre cohabitent, litchi / pastèque se répondent. Pour que ce ne soit pas monotone, la teinte ne suffit pas : chaque saveur reçoit aussi **sa lumière** (angle de dégradé) et **son grain** (densité de bulles). Voir §6.3.
3. **Mangue passion et pastèque sans scène.** Leurs couleurs sont extraites du liquide et de l'étiquette. Elles fonctionnent à l'écran, mais elles n'auront pas de photo studio — je ne peux pas l'inventer.

### 3.3 Règles d'usage de la couleur

- **Une seule saveur à l'écran à la fois.** Pas de dégradé multicolore, pas de « arc-en-ciel » de gamme, sauf dans le sélecteur (où les dix pastilles sont visibles : c'est leur fonction).
- **Le texte long ne se pose jamais sur un aplat de saveur pur.** Il se pose sur crème ou sur encre. L'aplat de saveur porte : le nom géant, la bouteille, la scène. *(Sur un écran 100 % `#E8849B`, 200 mots de texte courant, c'est illisible et fatigant, même en AA.)*
- **Teintes de panneau** : `color-mix(in oklab, var(--ambiance) 10%, var(--creme))` → une surface très légèrement teintée, sur laquelle l'encre reste à 14:1. C'est ce qui unifie les blocs et les fiches.
- **Transitions de couleur** : la teinte de la page est **une variable animée**, pas un changement de classe. Une seule source de vérité, donc pas de décalage entre le fond, le bouton et les bulles.

---

## 4. Typographie

Deux familles maximum. Les deux appairages sont sur Google Fonts (licence libre, usage commercial, auto-hébergement possible), ce qui évite tout risque juridique sur un site de marque.

### Appairage A — **Fraunces** + **Instrument Sans** *(recommandation)*

| Rôle | Police | Réglage |
|---|---|---|
| Titres, noms de saveur, chiffres forts | **Fraunces** (variable) | `wght 700–900`, `opsz 144`, **`SOFT 100`**, **`WONK 1`**, tracking `−0,045em`, interligne `0,82` |
| Texte, interface, navbar | **Instrument Sans** (variable) | `wght 400/500/600`, tracking `0` à `+0,01em` |

**Pourquoi ça marche avec ton logo.** Le « ciao » est gras, rond, avec des **contre-formes ovales** et des **coupes franches**. Fraunces, poussée à `SOFT 100` en grande taille optique, a exactement ces deux traits : des ovales très ouverts et des jonctions coupées net. Le logo et le titre semblent sortis de la même main, sans que ce soit la même police.

**Pourquoi c'est juste pour la marque.** Fraunces est un serif « ancien » avec un axe *soft* : c'est-à-dire **artisanal et gourmand**, pas *startup*. C'est ce que tu vends : de la fermentation, du fruit, du temps. Et son axe `WONK` (activé) donne aux grandes tailles une petite irrégularité réjouissante — l'impertinence du ton vient de là, pas d'une police fantaisie.

**Instrument Sans** apporte l'équilibre : un néo-grotesque chaleureux, avec un « a » à double étage et un « t » légèrement incliné, lisible à 16 px sur mobile, et qui ne ressemble ni à Inter ni à Roboto (les lettres ne sont pas fermées de la même façon, la hauteur d'x est plus généreuse).

**Risque assumé :** Fraunces est très utilisée en ce moment (marques food, cafés). Ce qui la rendra « à nous » : l'instance `SOFT 100 + WONK 1` (rarement utilisée), le tracking très serré, la bascule en bas de casse uniquement, et le fait que le titre est **découpé par la bouteille** — personne ne fait ça avec cette police.

### Appairage B — **Bricolage Grotesque** + **Schibsted Grotesk**

| Rôle | Police | Réglage |
|---|---|---|
| Titres | **Bricolage Grotesque** | `wght 800`, `opsz 96`, tracking `−0,035em` |
| Texte | **Schibsted Grotesk** | `wght 400/500` |

**L'idée :** le plus proche géométriquement du logo — bols ronds, coupes diagonales, petite irrégularité dans les courbes. Très pop, très « jeune marque », et ça donne un site plus **graphique** que gourmand.

**Pourquoi je ne le recommande pas en premier :** Bricolage est devenue la police par défaut de la « marque moderne de 2024 ». Son axe de largeur variable invite aux effets (titres étirés) qui vieillissent vite, et sa personnalité est **plus proche du studio de design que du liquide**. Le site serait joli, mais moins « ça donne envie de boire » et plus « portfolio ».

> Si tu préfères B, tout le système (échelle, tokens, motion) reste identique : seule la famille change.

### 4.1 Échelle typographique

Fluide (`clamp`), mobile-first. Une seule échelle, pas de tailles au cas par cas.

| Token | Desktop | Mobile | Famille | Usage |
|---|---|---|---|---|
| `display-hero` | `clamp(4.5rem, 13vw, 15rem)` | idem (borne basse) | Fraunces 800 | titre du hero |
| `display-flavor` | `clamp(3.5rem, 11vw, 12rem)` | `clamp(4rem, 22vw, 7rem)` | Fraunces 800 | nom de saveur géant |
| `h2` | `clamp(2rem, 4.5vw, 4rem)` | `clamp(1.75rem, 8vw, 2.5rem)` | Fraunces 700 | titres de section |
| `h3` | `1.375rem` | `1.25rem` | Instrument Sans 600 | sous-titres |
| `lead` | `1.375rem / 1.45` | `1.125rem / 1.5` | Instrument Sans 400 | chapeaux |
| `body` | `1.0625rem / 1.6` | `1rem / 1.6` | Instrument Sans 400 | texte courant |
| `label` | `0.8125rem` | `0.8125rem` | Instrument Sans 500, `+0,06em` | navbar, compteurs, étiquettes |
| `num` | `0.8125rem`, `font-variant-numeric: tabular-nums` | idem | Instrument Sans 500 | compteur de gamme, chargement |

Mesure de lecture plafonnée à **62 caractères**. Les titres sont posés en bas de casse, jamais en capitales.

### 4.2 La navbar (typographie et forme)

C'est un des trois points où le cahier des charges demande explicitement de ne pas ressembler à ūm.

**Forme :** deux **pastilles flottantes** détachées du bord haut (16 px de marge), pas une barre pleine largeur.
- À gauche : une pastille crème avec le logo (ratio 3,08:1, hauteur 20 px).
- À droite : une pastille contenant 4 liens + le CTA (le CTA est un **bouton-étiquette**, voir §5, plus petit).
- Au scroll (> 80 px) : les deux pastilles se compactent (hauteur 64 → 48 px) et se rapprochent ; elles ne disparaissent jamais (on n'a pas envie de faire remonter l'utilisateur).
- Mobile : une pastille logo + un bouton **bulle** (52 px) qui ouvre le menu plein écran.

**Typographie :** Instrument Sans 500, **13,5 px**, `letter-spacing: 0.06em`, **bas de casse**, précédée d'un **index en Fraunces italique 11 px** (`01` `02` `03` `04`). L'item actif ne change pas de couleur : son index devient une **petite bulle pleine** (6 px). Discret, précis, et impossible à confondre avec des capitales condensées.

---

## 5. Langage de boutons — « l'étiquette »

### Le raisonnement

La référence utilise un rectangle noir à texte blanc avec une pastille citron. On refuse les deux. Mais surtout, on refuse **le bouton générique** : il faut une forme qui appartienne à Ciao.

Sur les bouteilles, il y a déjà un objet d'interface : **l'étiquette**. C'est elle qu'on prend comme modèle. Un bouton Ciao est une **étiquette de bouteille** : rectangle à coins légèrement arrondis, un **liseré intérieur** (le sceau), et **un coin décollé** — comme une étiquette qu'on commence à soulever. Au survol, le liquide monte dedans et le coin se soulève un peu plus. Au clic, une **bulle s'échappe** du coin.

Aucun autre site de boisson ne fait ça, parce que personne ne regarde l'étiquette comme un objet d'interface.

### Anatomie

```
┌──────────────────────────┐
│  OÙ NOUS TROUVER      ◢  │   ← coin décollé (8 px), ombre courte sous le coin
└──────────────────────────┘
   liseré intérieur 1 px encre @ 18 %
```

- Hauteur : **56 px** desktop / **52 px** mobile (cible tactile réelle ≥ 44 px, largeur min 140 px).
- Padding horizontal : 28 px. Rayon : **14 px** (franchement pas une pilule, franchement pas un rectangle vif).
- Fond au repos : `--creme`. Texte : `--encre`. Liseré : `1px solid rgba(23,19,15,.18)` + `inset 0 0 0 1px` pour le sceau.
- Coin décollé : pseudo-élément `◢` de 8 × 8 px, `clip-path` triangulaire, ombre courte, léger `rotate`.
- **Pas de dégradé**, pas d'ombre portée molle, pas d'icône emoji. Une flèche dessinée (trait 1,5 px, 14 × 14) si besoin.

### Les trois variantes

| Nom | Usage | Forme |
|---|---|---|
| **Étiquette** (primaire) | « Où nous trouver », CTA navbar | fond crème + liseré + coin décollé |
| **Étiquette creuse** (secondaire) | actions secondaires (« Voir la gamme ») | fond transparent, liseré encre 30 %, pas de coin décollé au repos |
| **Bulle** (icône) | flèches du sélecteur, fermeture du menu, retour | cercle 44–52 px, même remplissage liquide, icône centrée |

### États — tous définis, tous testés

| État | Rendu | Détail technique |
|---|---|---|
| **Repos** | fond crème, texte encre, coin décollé 8 px | — |
| **Survol** (≥ 1024 px, `pointer: fine`) | le liquide **monte** depuis le bas (ménisque elliptique), texte → couleur de contraste de la saveur, coin → 12 px | pseudo `::before`, `translateY(100%) → 0`, `180 ms`, `ease-out` ; bulles : 3 points `transform/opacity` |
| **Focus visible** | **double anneau** : 2 px encre offset 2 px + 2 px crème offset 4 px | visible sur les dix couleurs, jamais masqué par la navbar (`z-index` et `scroll-margin`) |
| **Actif (press)** | `scale(0.97)` + l'ombre du coin disparaît + une **bulle éclate** (cercle 0,4 → 1,6, opacité 1 → 0) | `120 ms` sur le scale, `420 ms` sur l'éclat, `ease-out` — le bouton répond avant la fin de l'animation |
| **Désactivé** | opacité 40 %, liseré pointillé, pas de remplissage, `cursor: not-allowed` | `aria-disabled` + `tabindex="-1"` si vraiment inactif |
| **Chargement** | le liquide monte et redescend en boucle lente, texte inchangé | `linear`, uniquement si une action asynchrone existe un jour |

**Contrainte de coût :** tout se fait en `transform` et `opacity`. Pas de `filter`, pas de `box-shadow` animée, pas de `width`. Le ménisque est un `border-radius` asymétrique figé, pas une animation de `d`.

### Pourquoi ce n'est pas la référence

| | ūm | Ciao |
|---|---|---|
| forme | rectangle plein | étiquette à coin décollé, rayon 14 |
| couleur | noir + pastille citron | crème/encre + liquide de la saveur active |
| survol | changement d'état simple | remplissage liquide avec ménisque |
| clic | ripple / rien | bulle qui s'échappe du coin |

---

## 6. Système de motion

### 6.1 Les tokens (fichier `motion.ts` unique)

Tout le site consomme ces valeurs. Aucune durée, aucune courbe n'est écrite en dur dans un composant.

```ts
export const ease = {
  out:    [0.23, 1, 0.32, 1],      // sorties, entrées d'UI, feedback
  inOut:  [0.77, 0, 0.175, 1],     // déplacements à l'écran
  drawer: [0.32, 0.72, 0, 1],      // menu plein écran, panneaux
  liquid: [0.33, 1, 0.68, 1],      // ménisque, remplissages (légèrement plus lent au départ)
  pop:    [0.34, 1.42, 0.64, 1],   // éclat de bulle, coin qui se soulève (dépassement assumé)
} as const

export const duration = {
  press: 120,   // feedback de clic
  hover: 180,   // survols
  micro: 220,   // petits états
  ui: 260,      // plafond pour toute UI (jamais au-delà)
  enter: 560,   // entrées marketing
  section: 760, // révélations de section
  flavor: 900,  // la marée (plafond absolu)
} as const

export const spring = {
  bottle: { type: 'spring', stiffness: 110, damping: 16, mass: 1.1 }, // verre : lourd, s'arrête net
  float:  { type: 'spring', stiffness: 55,  damping: 11 },            // respiration
  cursor: { type: 'spring', stiffness: 280, damping: 30 },            // anneau du curseur
} as const

export const stagger = { hero: 110, words: 90, lines: 60, cap: 480 } as const
```

**Règles qui vont avec :**

- UI < 300 ms, sans exception. Entrées marketing 520–640 ms. La marée ≤ 900 ms.
- **Les sorties sont 20 % plus rapides que les entrées.** L'utilisateur a déjà décidé.
- `ease-in` interdit partout.
- Rien ne bloque l'interaction : tout élément visible est cliquable immédiatement, même si son frère est encore en train d'entrer.
- Stagger **non uniforme** (les écarts diminuent) et plafonné à 480 ms au total ; au-delà de 4 éléments, seuls les 4 premiers sont décalés.

### 6.2 Chorégraphies

**A. Écran de chargement** (max 3 s, réel)

| Élément | Rôle | Début | Durée | Mouvement | Relation |
|---|---|---|---|---|---|
| Compteur (%) | Lead | 0 | 0 → 100 % | chiffres tabulaires, pas de tween décoratif | — |
| Logo | Lead | — | 900 ms | remplissage du logotype par le liquide, `clip-path` montant | synchronisé sur la fin du compteur |
| Bulles | Décoration | 0 | boucle | montée continue, opacité | ensemble |
| Voile | Support | fin | 480 ms | `translateY(0 → -100%)`, `ease-drawer` | séquence après le logo |

*Ce qui ne bouge pas :* la page derrière (aucun mouvement, sinon on ne sait pas ce qui charge). *Sortie :* si les assets sont en cache, on saute le compteur et on ne garde qu'un fondu de 300 ms.

**B. Entrée du hero** (une seule fois, au chargement)

| Élément | Rôle | Début | Durée | Mouvement | Relation |
|---|---|---|---|---|---|
| Titre géant | Lead | 0 | 620 ms | 2 lignes, `clip-path` par ligne + 10 px | — |
| Bouteille | Lead 2 | 140 ms | 700 ms | montée 60 px + `scale(.96 → 1)` + respiration qui démarre ensuite | chevauche le titre |
| Chapeau + CTA | Support | 260 ms | 520 ms | fade + 8 px | chevauche |
| Bulles WebGL | Décoration | 400 ms | fondu 800 ms | densité monte | ensemble |
| Ombre portée | Support | 140 ms | 700 ms | opacité + étalement | ensemble avec la bouteille |

*Ce qui ne bouge pas :* la navbar (déjà là, elle ne doit pas « arriver ») et le grain.

**C. Changement de saveur** — voir §2, timeline détaillée plus bas en implémentation.

**D. Menu mobile**

| Élément | Rôle | Début | Durée | Mouvement | Relation |
|---|---|---|---|---|---|
| Voile plein écran | Support | 0 | 420 ms | `clip-path: circle()` depuis le bouton, `ease-drawer` | — |
| Liens | Support | 120 ms | 380 ms | fade + 8 px, écarts 70 → 40 ms | chevauche (décalage dégressif) |
| CTA + mentions | Support | 260 ms | 320 ms | fade | chevauche |

*Ce qui ne bouge pas :* le contenu de la page (pas de scale de la page derrière — c'est un tic).

*Sortie :* une seule vague, tout part ensemble en 240 ms. On ne rejoue jamais le stagger à l'envers.

### 6.3 Le mouvement propre à chaque saveur

Même système de mouvement, mais une **signature par saveur** (c'est ce qui évite la monotonie des trois rouges) :

| Saveur | Lumière (angle du dégradé radial) | Densité de bulles | Note de mouvement |
|---|---|---|---|
| Citron | 200° (haut gauche), halo froid | haute | bulles vives, montée rapide |
| Menthe | 160°, halo vert clair | moyenne | ménisque plus calme |
| Cerise | 340°, halo rosé | moyenne | respiration lente |
| Litchi | 20°, halo pâle | basse | flottement plus haut (amplitude +2 px) |
| Fruits rouges | 320°, halo sombre | basse | ombre plus profonde |
| Gingembre hibiscus | 10°, halo chaud | haute | pivots plus francs |
| Pêche | 40°, halo sable | moyenne | — |
| Mangue passion | 30°, halo ambré | haute | — |
| Pastèque | 180°, halo mentholé | moyenne | — |
| Dragon | 300°, halo fuchsia | haute | ménisque plus marqué |

### 6.4 `prefers-reduced-motion` — une version calme, complète et belle

Ce n'est pas une version dégradée : c'est **la même page, sans déplacement**.

- Chargement : pas de compteur animé (barre statique qui avance par paliers), pas de bulles.
- Hero : tout est là, d'emblée, opacité à 1. Aucune entrée.
- Marée : **fondu de couleur de 300 ms**, pas de liquide, pas de pivot. La bouteille change par crossfade court.
- Scroll : pas de pinning, pas de scrub, pas de parallaxe. Les sections se lisent dans l'ordre.
- Marquee : statique (le texte est lisible d'un coup), pas de bande qui défile.
- Bulles WebGL : **canvas non monté du tout** (pas de contexte GPU créé).
- Curseur : système natif.

### 6.5 Ce que le motion ne fait jamais

Pas de fade-in de section par défaut ; pas de parallaxe sur du texte ; pas de `scale(0)` (on part de 0,95 + opacité) ; pas d'animation sur une action clavier ; pas d'animation qui dure plus de 900 ms ; pas plus d'**un** contexte WebGL sur la page, jamais dans deux sections à la fois.

---

## 7. Structure du site

Une seule page, plus une page mentions légales (nécessaire au footer). La structure reprend celle du cahier des charges, resserrée : **12 blocs**, avec des hauteurs réelles et des temps calmes assumés.

| # | Section | Intention | Matière | Hauteur | Moment de motion |
|---|---|---|---|---|---|
| 01 | **Chargement** | mise en scène de marque, réelle | bulles + logo qui se remplit | plein écran, ≤ 3 s | compteur + révélation du logo |
| 02 | **Navbar** | présente, discrète, jamais dans le chemin | verre / pastilles | 64 → 48 px | compactage au scroll |
| 03 | **Hero** | « ça bulle » + la bouteille vedette, titre traversé | titre géant + bouteille + bulles | 100 vh | entrée orchestrée, tilt au pointeur, respiration |
| 04 | **Manifeste** | 3 phrases, révélation au scroll | typo seule, beaucoup de vide | 1 écran | révélation ligne par ligne (scrub léger) |
| 05 | **La gamme** | le cœur : 10 saveurs, sélecteur immersif | marée + bouteille + scène + fiche | 2 écrans (sticky interne) | **la marée** + notes qui entrent |
| 06 | **La vraie fermentation** | 4 étapes, pédagogie sans allégation | liquide qui monte, typo, matière | 3 écrans (pin + scrub) | étape active, liquide qui monte |
| 07 | **Marquee** | respiration, message de marque | deux bandes contre-rotatives | 34 vh | défilement continu, pause au survol |
| 08 | **Toute la bande** | les deux panoramiques en gloire | photo + pin horizontal | 2 écrans (pin) | défilement horizontal piloté |
| 09 | **Engagements** | 4 preuves, pas 4 cartes | grille asymétrique sur encre | 1,5 écran | compteurs/mots qui se révèlent |
| 10 | **FAQ** | lever les doutes, ton léger | accordéon restylé | 1 écran | ouverture en hauteur + rotation du + |
| 11 | **Où nous trouver** | le CTA final, utile | liste + rappel fraîcheur | 1 écran | survol des lignes |
| 12 | **Footer** | clore, logo, légal, réseaux | encre | 60 vh | — |

### 7.1 Détail des sections sensibles

**05 — La gamme.** Section la plus construite du site. Architecture :

- un **nom de saveur géant** en fond (`display-flavor`, derrière la bouteille) ;
- la **bouteille** au centre, sur un plan légèrement en avant ;
- la **scène de la saveur** en carte 3:4 sur le côté (desktop) ou juste sous la bouteille (mobile) ;
- la **fiche** : nom, 2–3 notes de goût, ingrédients (`[À VALIDER]`) ;
- le **sélecteur** : dix **pastilles-bulles** en bas, avec le nom au survol ; navigation **clavier** (flèches, `Home`/`End`, tabindex mobile), **swipe** sur mobile, **flèches** sur les côtés ;
- un **compteur** `03 / 10` en chiffres tabulaires, et un `aria-live="polite"` qui annonce le nom.

Pas de carrousel automatique. Jamais. Le rythme, c'est l'utilisateur.

**06 — La fermentation.** Quatre étapes (thé infusé → SCOBY → fermentation → mise en bouteille). Le storytelling est **typographique et matériel** : un liquide monte le long de la colonne au fil du scroll, chaque étape s'allume quand elle est en face. Aucun visuel produit inventé, aucun schéma de laboratoire. Un seul dessin abstrait autorisé : un **cercle qui grandit** (le SCOBY), en trait, pas en faux réalisme.

**08 — Toute la bande.** Un pin horizontal avec trois panneaux :
1. panorama 01 (détouré, sur crème) ;
2. un **panneau typographique** (« dix bouteilles, une seule fermentation ») ;
3. panorama 02, sur fond **encre** (il est sur fond noir opaque — on en fait un choix : un plateau « nuit »).

Sur mobile : pas de pin horizontal (c'est pénible au doigt), mais un **défilement horizontal natif** avec `scroll-snap`, une bouteille visible à la fois.

**09 — Engagements.** Quatre blocs, mais **pas quatre cartes identiques** : deux grands (bio, non pasteurisé) et deux plus petits (faible en sucre, sans additifs), posés en quinconce sur fond encre. Le mot-clé est en Fraunces 3 rem, la ligne explicative en Instrument 1 rem. Aucun chiffre inventé — les formulations chiffrées restent `[À VALIDER]`.

---

## 8. Contenus (à valider)

Ton : joyeux, malin, un peu impertinent, tutoiement, zéro pédanterie, zéro « wellness ». **Aucune allégation santé.** Aucun chiffre nutritionnel inventé.

### 8.1 Hero

- Titre : **« ÇA BULLE. »** *(option : le logotype « ciao » en titre, avec « ça bulle » en chapeau — voir question 3)*
- Chapeau : « Dix saveurs vivantes, fermentées pour de vrai, à garder au frais. » `[À VALIDER]`
- CTA : **Où nous trouver**

### 8.2 Manifeste (3 lignes)

> « On ne t'a pas attendu pour faire du kombucha.
> On t'a attendu pour en faire un qu'on a envie de finir.
> Thé, fruits, temps. C'est tout. » `[À VALIDER]`

### 8.3 Les dix fiches saveur

| Saveur | Accroche | Notes de goût | Ingrédients |
|---|---|---|---|
| Citron | « Le citron qui réveille, sans le vinaigre qui pique. » | citron frais · zeste · finale nette | `[À VALIDER]` thé vert, eau, sucre (consommé par la fermentation), cultures vivantes, citron |
| Menthe | « De la menthe fraîche. Pas du chewing-gum. » | menthe froissée · verdure · finale courte | `[À VALIDER]` |
| Cerise | « Une cerise bien mûre, un peu acidulée. » | cerise noire · amande · finale sèche | `[À VALIDER]` |
| Litchi | « Le litchi, c'est la rose qui se mange. » | litchi frais · rose · douceur | `[À VALIDER]` |
| Fruits rouges | « Trois fruits rouges qui se disputent la cuillère. » | cassis · framboise · myrtille | `[À VALIDER]` |
| Gingembre hibiscus | « Le gingembre pique, l'hibiscus arrondit. » | gingembre frais · hibiscus · chaleur | `[À VALIDER]` |
| Pêche | « La pêche blanche, juste assez mûre pour couler. » | pêche blanche · fleur · rondeur | `[À VALIDER]` |
| Mangue passion | « Mangue bien mûre, passion qui tire sur l'acide. » | mangue · fruit de la passion · acidité | `[À VALIDER]` |
| Pastèque | « La pastèque en fin de pique-nique. » | pastèque · eau fraîche · finale légère | `[À VALIDER]` |
| Dragon | « Le fruit du dragon, rose vif et un peu fleuri. » | pitaya · fleurs · finale vive | `[À VALIDER]` |

### 8.4 Engagements (4)

| Mot-clé | Ligne |
|---|---|
| **BIO** | « Les ingrédients sont bio. Le reste, c'est de la fermentation. » `[À VALIDER — certification exacte]` |
| **NON PASTEURISÉ** | « On ne chauffe pas. C'est ce qui laisse les cultures vivantes dans la bouteille. » |
| **PEU DE SUCRE** | « Le sucre, les levures s'en occupent. Il en reste peu. » `[À VALIDER — grammages]` |
| **SANS ADDITIFS** | « Pas de colorant, pas d'arôme de synthèse, pas de conservateur. » `[À VALIDER]` |

### 8.5 Marquee (2 bandes, contre-rotatives)

- « LE VINAIGRE, C'EST POUR LA SALADE »
- « NON PASTEURISÉ, DONC VIVANT · À GARDER AU FRAIS, COMME NOUS »

`[À VALIDER]`

### 8.6 FAQ (6 questions)

| Question | Réponse (esprit) |
|---|---|
| **C'est quoi ce truc qui flotte ?** | C'est la culture (SCOBY) et un peu de dépôt de levures. C'est le signe que ça a fermenté pour de vrai. Secoue doucement avant d'ouvrir. |
| **Pourquoi à conserver au frais ?** | Parce que ce n'est pas pasteurisé : au frais, la fermentation ralentit et le goût reste stable. |
| **Ça a le goût de vinaigre ?** | Non. Nos recettes sont douces et fruitées — plus proches d'un soda léger que d'un kombucha traditionnel. |
| **C'est sucré ?** | Peu. Une grande partie du sucre a été consommée pendant la fermentation. `[À VALIDER — chiffres]` |
| **Ça se boit quand ?** | À l'apéro, au goûter, avec un plat un peu gras. Bien frais, dans un verre, avec des glaçons si tu veux. |
| **Combien de temps je peux le garder ?** | `[À VALIDER — DDM réelle]`. Au frais, bouteille fermée. |

### 8.7 Où nous trouver

Liste `[ENSEIGNE 1] — [VILLE]` … sur 6 à 8 lignes, dans un fichier de données (`stores.ts`), avec un champ `url` optionnel. Plus le rappel : « **À conserver au frais.** Demande où se trouve le frigo. »

---

## 9. Technique

### 9.1 La stack, et pourquoi

| Brique | Choix | Pourquoi |
|---|---|---|
| Build | **Vite + React + TypeScript** | site vitrine d'une page : pas de SSR, pas de routing serveur, pas de coût d'hydration. Next.js serait une dépendance lourde pour zéro bénéfice ici. |
| Styles | **Tailwind v4** (`@theme`) | les tokens du §3 deviennent des variables CSS natives ; pas de config JS, build instantané. |
| Scroll | **GSAP + ScrollTrigger** | pinning, scrub et timelines chorégraphiées fiables, et gratuits depuis 2025. |
| Smooth scroll | **Lenis** | inertie douce, s'intègre proprement avec ScrollTrigger, ~3 ko. |
| Micro-interactions | **Motion** (`motion/react`) | ressorts interruptibles, `useSpring` pour le tilt au pointeur ; c'est là qu'il est meilleur que GSAP. |
| Accordéon + menu | **Radix UI** (copié via le modèle shadcn, **entièrement restylé**) | l'accessibilité clavier/ARIA d'un accordéon est un piège ; Radix la donne pour ~4 ko. Aucun style par défaut conservé. |
| Effet WebGL | **shader maison** (OGL, ~9 ko, ou WebGL2 brut) | voir ci-dessous. |
| Images | **sharp** au build | AVIF + WebP, tailles responsives, poids divisé par 4 à 7. |
| Polices | auto-hébergées, `woff2` sous-ensemblées latin | pas de CDN tiers, pas de FOUT, `preload` sur la seule police du hero. |

### 9.2 Ce que je refuse d'installer, et pourquoi

| Écarté | Poids | Raison |
|---|---|---|
| **Three.js + React Three Fiber** | ~150–180 ko gzip | ils servent à charger des scènes, des matériaux, un moteur de rendu complet. Ici, l'effet est **un champ de bulles** : un shader de 4 ko fait mieux, 40 × moins lourd, et tient 60 fps sur un téléphone moyen de gamme. Les skills de motion disent explicitement de prendre l'outil le plus léger qui exprime le besoin. |
| **Lottie** | 60–80 ko + fichiers | aucune animation vectorielle fournie, et les animations seront pilotées par le code (elles doivent réagir au pointeur et au scroll). |
| **Framer Motion en plus de Motion** | doublon | c'est le même paquet, renommé. |
| **Une librairie de carrousel** | 20–40 ko | le sélecteur de saveurs est un état de page, pas un carrousel : 80 lignes de React suffisent, et on contrôle la marée. |
| **Une librairie de curseur** | 10 ko | 25 lignes avec un ressort Motion. |

### 9.3 La 3D, concrètement

- **Bouteille** : PNG sur un plan CSS 3D (`transform-style: preserve-3d`), tilt ≤ 12° au pointeur avec ressort, ombre portée séparée (ellipse floutée, qui s'écarte et s'adoucit selon le tilt), reflet en `::after` dégradé radial qui suit la souris. Aucune rotation au-delà de 12° (voir audit §5).
- **Bulles** : **un seul** `<canvas>` fixé en arrière-plan, shader de particules (positions en attribut, déplacement en vertex shader, pas de JS par frame). 900 particules desktop, 320 mobile, `DPR` plafonné à 1,5.
- **Repli** : si `prefers-reduced-motion`, si l'appareil déclare `deviceMemory ≤ 4` ou si le contexte WebGL échoue → **aucun canvas**, un champ de couleur + grain. Le site reste complet. Pas de message d'erreur, pas de trou.
- **Jamais plus d'un contexte WebGL** sur la page.

### 9.4 Budget performance (cibles, mesurées en fin de phase 5)

| Métrique | Cible | Moyen |
|---|---|---|
| LCP (4G, mobile) | **< 2,5 s** | bouteille AVIF en `priority`, préchargée, dimensions intrinsèques |
| CLS | **< 0,01** | toutes les images dimensionnées, polices `size-adjust` |
| JS initial | **< 170 ko gzip** | Vite + React 19 + GSAP/ST + Lenis + Motion, Tree-shaké |
| Poids du hero | **< 450 ko** | 1 AVIF bouteille + 1 police + 1 scène floue 64 px |
| Images hors hero | lazy + `decoding=async` | + AVIF/WebP responsive |
| 60 fps | téléphone moyen de gamme | transform/opacity uniquement, un seul canvas, pas de backdrop-filter sur mobile |

### 9.5 Accessibilité

- Contraste : tableaux du §3 calculés (tous ≥ 4,5:1 pour le texte, ≥ 3:1 pour le géant).
- Navigation clavier complète : skip-link, navbar, sélecteur de saveurs (`roving tabindex`, flèches, `Home/End`), accordéon (Radix), menu mobile (piège de focus). `tabindex` jamais > 0.
- `aria-live="polite"` sur le nom de la saveur active.
- `aria-expanded` sur l'accordéon et le bouton de menu ; le bouton dit son état.
- Images : `alt` descriptif et utile (`Bouteille Ciao cerise, 330 ml`), décoratif = `alt=""`.
- Focus visible : double anneau, jamais masqué, `scroll-margin` pour la navbar flottante.
- `prefers-reduced-motion` : §6.4.
- Cibles tactiles ≥ 44 px, écart ≥ 8 px.

### 9.6 Contenu modifiable sans toucher aux animations

```
src/
  data/
    flavors.ts     ← les 10 saveurs : nom, couleur, notes, ingrédients, scène, ordre
    stores.ts      ← les enseignes
    faq.ts         ← les questions/réponses
    copy.ts        ← tous les textes de section
  motion/
    motion.ts      ← les tokens
    choreography.ts← les timelines (hero, marée, menu)
```

Tu modifies un texte ou une couleur dans `data/`, l'animation s'adapte : aucune durée ni courbe n'est écrite dans un composant.

---

## 10. Ce qu'on reprend des skills, et ce qu'on surcharge

Pour être transparent sur la méthode (les skills cités dans le cahier des charges se contredisent parfois avec ton brief) :

| Règle d'un skill | Décision | Raison |
|---|---|---|
| « Une section par écran, jamais de chevauchement » (design-taste-frontend) | **suivie** pour les sections de contenu | c'est ce qui donne l'air « composé » et pas « rempli » |
| « Aucun shader, scène ou effet hors tech / gaming » | **surchargée** | ton brief demande explicitement WebGL et de la matière. Le brief gagne : c'est un site de marque immmersif, pas un café de quartier. |
| « Jamais de violet / lavande dans le design » | **surchargée** pour 2 saveurs | `dragon` (magenta prune) et l'accent indigo de mangue passion **sont les couleurs réelles du produit**. Ce n'est pas un choix d'ambiance : c'est le produit. Aucun violet décoratif ailleurs. |
| « Pas de dégradés, pas de grain » (anti-slop) | **surchargée** | le grain et la lumière sont le sujet (le verre, la fermentation). Le grain reste fixe et très léger. |
| UI < 300 ms, sorties plus rapides, pas de `ease-in`, pas de `scale(0)` | **suivies** | §6.1 |
| Un seul point d'entrée par conteneur, stagger non uniforme | **suivies** | §6.2 |
| Deux familles maximum, pas de police système | **suivies** | §4 |

---

## 11. Décisions à valider avant la phase 3

1. **Le concept** : « le site est un verre qu'on remplit », la marée comme geste signature.
2. **La palette** : crème/encre + 10 couleurs de saveur, **citron en bleu myosotis** (le pari).
3. **La typo** : A (Fraunces `SOFT 100` + Instrument Sans) ou B (Bricolage + Schibsted).
4. **Les boutons** : l'étiquette à coin décollé, remplissage liquide, bulle au clic.
5. **La navbar** : deux pastilles flottantes, bas de casse, index chiffrés.
6. **La structure** : 12 blocs, la gamme en 2 écrans avec sélecteur collant, la fermentation en 3 écrans pinnés.
7. **La stack** : Vite (pas Next), shader maison (pas Three.js), Radix pour l'accordéon.
8. **Les textes** : accroches des 10 saveurs, manifeste, marquee, FAQ.

**Ce que je ne ferai pas sans ton accord explicite :** installer une dépendance non listée au §9, utiliser un visuel produit que je n'ai pas, inventer un chiffre nutritionnel ou une certification.
