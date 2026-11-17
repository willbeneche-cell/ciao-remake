# PHASE 1 — AUDIT DES ASSETS

**Projet :** site vitrine Ciao Kombucha
**Périmètre :** `image/` (21 fichiers)
**Méthode :** ouverture de chaque fichier, mesure des dimensions, analyse du canal alpha, calcul de la boîte englobante du produit, extraction des couleurs dominantes (labels, fonds de scène, liquides), calcul des ratios de contraste WCAG. Aucune appréciation à l'œil seul : chaque défaut ci-dessous est mesuré.

---

## Verdict en une ligne

La **direction photo est excellente et cohérente** (lumière studio, un fond par saveur, logo superbe), mais le **matériel est insuffisant pour un site de ce niveau en l'état** : les bouteilles détourées sont trop petites (120 × 332 px utiles), deux détourages manquent, deux scènes manquent, et le premier bandeau panoramique contient une erreur de composition visible.

Rien n'est bloquant pour démarrer la direction artistique. Deux points le sont pour la phase 3 si tu veux le rendu « primé » : la résolution des bouteilles et les deux détourages manquants.

---

## 1. Inventaire mesuré

### 1.1 Bouteilles détourées

| Fichier | Format réel | Dimensions | Poids | Alpha | Produit utile (boîte englobante) | État |
|---|---|---|---|---|---|---|
| `kombucha_citron.png` | PNG RGBA | 388 × 388 | 71 Ko | oui | 120 × 332 px | détouré propre |
| `kombucha_dragon.png` | PNG RGBA | 388 × 388 | 72 Ko | oui | 120 × 332 px | détouré propre |
| `kombucha_fruits_rouges.png` | PNG RGBA | 388 × 388 | 75 Ko | oui | 120 × 332 px | détouré propre |
| `kombucha_gingembre_hibiscus.png` | PNG RGBA | 388 × 388 | 73 Ko | oui | 120 × 332 px | détouré propre |
| `kombucha_mangue_passion.png` | PNG RGBA | 388 × 388 | 81 Ko | oui | 120 × 332 px | détouré propre |
| `kombucha_menthe.png` | PNG RGBA | 388 × 388 | 74 Ko | oui | 120 × 332 px | détouré propre |
| `kombucha_pasteque.png` | PNG RGBA | 388 × 388 | 86 Ko | oui | 120 × 332 px | détouré propre |
| `kombucha_peche.png` | PNG RGBA | 388 × 388 | 71 Ko | oui | 120 × 332 px | détouré propre |
| `kombucha_cerise.png` | PNG **RGB** | 800 × 800 | 265 Ko | **non** | fond blanc plein cadre | **NON détouré** |
| `kombucha_litchi.png` | PNG **RGB** | 452 × 452 | 80 Ko | **non** | fond blanc plein cadre | **NON détouré** + liseré blanc |

Deux constats importants :

1. **Les huit bouteilles détourées ont exactement la même boîte englobante** (`134,27 → 254,359`) : c'est la même bouteille source, seul l'habillage change. Le produit occupe **120 × 332 px** dans un carré de 388 px : **78 % du fichier est du vide**, et la définition réelle de la bouteille est celle d'une vignette.
2. `kombucha_cerise.png` et `kombucha_litchi.png` sont sur **fond blanc opaque** : ce sont les deux fichiers les plus grands du lot (800 px et 452 px) et les deux seuls inutilisables tels quels en superposition. Le litchi porte en plus un **liseré blanc** sur tout son contour et des bords rongés (artefacts de détourage précédent sur fond blanc).

### 1.2 Scènes d'ambiance

| Fichier | Format réel | Dimensions | Poids | Fond | État |
|---|---|---|---|---|---|
| `scene_citron.jpg` | JPEG | 768 × 940 | 49 Ko | bleu myosotis | OK, définition moyenne |
| `scene_dragon.jpg` | JPEG | 768 × 947 | 53 Ko | magenta prune | OK, définition moyenne |
| `scene_fruits_rouges.jpg` | JPEG | 768 × 940 | 52 Ko | bordeaux | OK, définition moyenne |
| `scene_gingembre_hibiscus.jpg` | JPEG | 768 × 958 | 56 Ko | rouge hibiscus | OK, définition moyenne |
| `scene_menthe.jpg` | JPEG | 1290 × 1579 | 969 Ko | vert menthe | OK, lourde |
| `scene_peche.jpg` | JPEG | 1290 × 1586 | 1,06 Mo | terracotta | OK, lourde |
| `scene_cerise.png` | PNG **RGB** | 1131 × 1391 | 1,89 Mo | rose cerise | **trop lourde** (PNG inutile) |
| `scene_litchi.png` | PNG **RGB** | 1131 × 1391 | 1,72 Mo | rose corail | **trop lourde** (PNG inutile) |
| `scene_mangue_passion` | — | — | — | — | **MANQUANTE** |
| `scene_pasteque` | — | — | — | — | **MANQUANTE** |

Bon point : les huit scènes existantes suivent **la même grammaire** (sol en plateau, cercle mural, éclairage doux identique). C'est cette régularité qui rendra le changement de saveur crédible.

### 1.3 Bandeaux panoramiques

| Fichier | Format réel | Dimensions | Poids | Fond | État |
|---|---|---|---|---|---|
| `shooting_toutes_les_gammes.png` | PNG RGBA | 1920 × 963 | 1,44 Mo | transparent | **défaut de composition** (voir §2.E) |
| `shooting_toutes_les_gammes_02.png` | PNG RGB | 1774 × 887 | 1,36 Mo | **noir opaque** | utilisable seulement sur fond encre |

Bonne nouvelle : les bouteilles du panorama 01 mesurent **~520 px de haut**, soit **1,6 × mieux** que les détourages individuels. Elles sont donc plus exploitables, mais elles sont soudées les unes aux autres (colonnes contiguës) : on ne peut pas les isoler proprement.

### 1.4 Logo

| Fichier | Format réel | Dimensions | Poids | Trace | Ratio |
|---|---|---|---|---|---|
| `logo_ciao.jpg` | **WebP** (malgré l'extension `.jpg`) | 800 × 800 | 8 Ko | 666 × 216 px, noir pur `#000000` sur blanc `#FFFFFF` | **3,08 : 1** |

- Le fichier est un **WebP renommé en `.jpg`** : mauvais type MIME, mauvaise extension, compression visible sur les courbes du « c » et du « a ».
- Noir pur, pas de version blanche, pas de version monochrome, pas de SVG.
- Ratio utile du logotype : **3,08 : 1** (à respecter partout dans la mise en page).

---

## 2. Défauts, par ordre de gravité

### A. Bloquant pour le rendu visé — la définition des bouteilles

Une bouteille de 332 px de haut, affichée à 60–70 vh sur un écran de bureau (≈ 620 px), c'est un **agrandissement × 1,9**. Sur les bords du verre, sur le bouchon métallique et sur le petit texte de l'étiquette, ça se voit immédiatement : contours mous, moiré sur les stries du bouchon, étiquette illisible.

Or le cahier des charges place la bouteille au centre du dispositif : titre géant, bouteille par-dessus, texte en partie derrière. C'est le poste où la définition compte le plus.

**Trois options, par ordre de préférence :**

1. **Tu me fournis un re-export détouré ≥ 1200 px de haut** (idéal 1600, même cadrage, même lumière, fond transparent). C'est la seule voie qui donne un rendu net sur grand écran. *(recommandé)*
2. Je re-détoure les bouteilles **depuis les scènes** (≈ 1000 px de haut, donc 3 × mieux) : faisable, mais le verre transparent est posé sur un fond coloré — le détourage perd les reflets et laisse une frange colorée. Résultat inégal d'une saveur à l'autre, et pour mangue passion / pastèque il n'y a pas de scène du tout.
3. **Contrainte de mise en page** : je plafonne la bouteille à ~ 420 px de haut, j'ajoute un halo très léger et une ombre portée douce qui absorbent le flou, et je ne la fais jamais dépasser 1,3 × sa taille native. Le site reste beau, mais la bouteille ne peut pas devenir le très grand objet que décrit le cahier des charges.

Je pars par défaut sur l'option 3 tant que je n'ai pas mieux, et je bascule sur l'option 1 dès que tu me l'envoies (aucun code à refaire : un seul fichier de données).

### B. Bloquant — deux détourages manquants

`cerise` et `litchi` sont sur fond blanc opaque.
Je peux les détourer (matte depuis le blanc), **mais** : sur une bouteille en verre transparent, tout ce qui était blanc *dans* le verre et *derrière* lui a la même valeur que le fond. Le détourage mangera les reflets du verre, ou les gardera avec un halo blanc. Sur les deux saveurs les plus « liquide clair » de la gamme, c'est précisément là que ça se verra.

→ Même demande que ci-dessus : re-export détouré pour ces deux-là en priorité.

### C. Important — deux scènes manquantes

`mangue_passion` et `pastèque` n'ont pas de scène. Je **n'inventerai aucun visuel produit** : pour ces deux saveurs, l'ambiance sera un champ de couleur construit à partir de la teinte de la saveur (dégradé + grain + bulles), sans photo studio. La rupture sera visible : huit saveurs ont un décor photo, deux ont un fond abstrait.
→ Si tu peux faire shooter ces deux scènes dans la même grammaire (plateau + cercle mural), l'ensemble devient homogène.

### D. Important — la scène contient déjà la bouteille

Chaque scène est une photo produit complète (bouteille sur son plateau). Conséquences :

- **On ne peut pas** mettre la scène en plein écran *et* la bouteille détourée par-dessus : on aurait deux bouteilles.
- Les scènes font 768 à 1290 px de large : en plein écran à 1440 ou 1920 px, elles s'agrandissent et perdent leur netteté.

**Traitement que je propose** (et que je détaillerai en phase 2) :

| Usage | Fichier | Pourquoi ça marche |
|---|---|---|
| Ambiance de fond | scène **floutée** (blur 40–60 px) ou champ de couleur dérivé | le flou masque la définition ; la lumière et la teinte restent exactes |
| Visuel « studio » de la fiche saveur | scène nette, affichée en **carte 3:4 de 320–480 px** | à cette taille, 768 px suffisent largement |
| Bouteille vedette | détourage individuel | jamais deux fois la même bouteille à l'écran |

### E. Important — panorama 01 : une bouteille flotte

Mesure des dix bouteilles (colonnes d'alpha) :

| # | largeur | haut | bas | hauteur |
|---|---|---|---|---|
| 1–3 | 183–184 | 282–284 | 799–802 | 516–521 |
| **5 (litchi)** | **198** | **145** | **666** | **522** |
| 6–10 | 182–184 | 282–284 | 799–803 | 516–522 |

La cinquième bouteille (litchi, étiquette bleu clair) est **137 px plus haut** que les autres (elle flotte au-dessus du sol), **~8 % plus large** (donc à une autre échelle), et son détourage est plus net que celui des autres. C'est visible en un regard, au milieu du bandeau qui doit justement être un moment de fierté.
→ Re-export nécessaire, ou je recadre le bandeau pour ne montrer que les groupes cohérents (solution de repli, moins bien).

### F. Moyen — panorama 02 sur fond noir opaque

Pas de transparence : collé sur du crème, il affiche un rectangle noir. Utilisable **uniquement** sur un fond encre (ce qui est une possibilité assumée : un « bandeau nuit » dans le récit). À confirmer dans la structure.

### G. Moyen — poids et formats

- `scene_cerise.png` (1,89 Mo) et `scene_litchi.png` (1,72 Mo) sont des **PNG** pour des photos : format inadapté, poids × 20 par rapport à un WebP équivalent.
- `scene_menthe.jpg` (969 Ko) et `scene_peche.jpg` (1,06 Mo) sont des JPEG peu compressés.
- `logo_ciao.jpg` est un **WebP** mal nommé.
- Les 10 bouteilles en PNG 388² (~ 80 Ko) sont correctes en poids mais inutilement lourdes pour leur définition réelle.

**Pipeline prévu (aucune perte visible) :** sharp au build → AVIF + WebP, 3 largeurs responsives, `sizes` correct, `loading="lazy"` partout hors hero, `decoding="async"`, dimensions intrinsèques déclarées (CLS 0). Gain attendu : **−70 à −85 %** de poids sur les scènes, ~ −40 % sur les bouteilles.

### H. Moyen — le logo n'est pas vectoriel

Un logo de marque doit être un SVG : net à toutes les tailles, teintable, utilisable en favicon, en filigrane, en version blanche sur fond coloré. Aujourd'hui : un bitmap 800 px compressé, noir pur sur blanc, sans version claire.

**Prévu :** vectorisation propre (tracé des quatre lettres, contrôle des courbes et des contre-formes) → `ciao.svg` (encre), `ciao-blanc.svg`, `favicon`. Le logo sera ensuite traité comme une forme, pas comme une image : il pourra passer derrière la bouteille, changer de couleur avec la saveur, être découpé par le liquide.

Si tu as le fichier source (AI, SVG, PSD), c'est évidemment préférable à un tracé : envoie-le.

---

## 3. Ce que je peux faire sans aucun nouvel asset

Pour être clair sur ce qui bloque et ce qui ne bloque pas :

| Tâche | Faisable sans toi | Qualité |
|---|---|---|
| Détourer cerise et litchi depuis le fond blanc | oui | moyenne (halo sur le verre transparent) |
| Re-détourer les 8 bouteilles depuis les scènes (≈ 1000 px) | oui | moyenne, inégale, impossible pour 2 saveurs |
| Vectoriser le logo | oui | bonne (tracé manuel) |
| Nettoyer les panoramas (recadrage, suppression du noir) | oui | bonne, sauf la bouteille flottante |
| Pipeline AVIF/WebP + responsive | oui | parfaite |
| Ambiances couleur pour mangue passion et pastèque | oui | bonne, mais sans photo studio |
| **Bouteille nette en très grand** | **non** | nécessite un meilleur fichier |

---

## 4. Ce dont j'ai besoin de toi

Par ordre d'impact sur le résultat final :

1. **Les 10 bouteilles détourées en haute définition** (≥ 1200 px de haut, fond transparent, même cadrage). Priorité absolue sur `cerise` et `litchi`. Les exports depuis les fichiers source suffisent, pas besoin de re-shooter.
2. **Les 2 scènes manquantes** (`mangue_passion`, `pasteque`) dans la même grammaire que les autres.
3. **Le panorama 01 corrigé** (la bouteille litchi remise au sol, à la bonne échelle), et si possible le panorama 02 détouré.
4. **Le logo en SVG** (ou AI/PSD).
5. Plus tard, pour les contenus : les **enseignes réelles** de « Où nous trouver », les **ingrédients exacts** par saveur, et les **mentions légales**. Tant que je ne les ai pas, je mets des placeholders explicites — je n'inventerai aucun fait vérifiable.

Si tu n'as rien de tout ça et que tu ne peux pas les obtenir : dis-le maintenant, je pars sur les options de repli et j'assume les limites (elles seront visibles sur grand écran, surtout sur la bouteille du hero).

---

## 5. Limites de la « 3D truquée » — à valider

Tu n'as pas de modèle 3D et je n'en fabriquerai pas. Voici **exactement** ce que le PNG permet, et ce qu'il ne permet pas. Autant le dire avant de le construire :

**Ce que je peux faire avec le PNG :**

- profondeur multi-plans (bouteille / titre / bulles avant / bulles arrière) avec parallaxe au pointeur et au scroll ;
- **tilt 3D CSS** (`rotateX/rotateY` avec perspective) sur ±12° maximum, avec inertie ;
- ombre portée crédible et **réactive** (ellipse floutée qui s'écarte et se floute selon le tilt) ;
- respiration de la bouteille (idle float lent, 6–8 s, amplitude 4–6 px) ;
- glissement + pivot lors du changement de saveur (spring, avec follow-through) ;
- flou de profondeur de champ simulé (bulles floues devant, nettes derrière) ;
- lumière qui suit la souris (dégradé radial très doux par-dessus, en `screen`).

**Ce que je ne peux pas faire, et que je ne ferai pas semblant de faire :**

- faire tourner la bouteille au-delà de ~15° : au-delà, l'absence de face arrière se voit instantanément ;
- éclairer le verre de façon dynamique (les reflets sont peints dans le PNG) ;
- une réfraction réelle à travers le liquide (le contenu de l'étiquette ne se déforme pas) ;
- un rendu net au-delà de ~1,3 × la définition native (voir §2.A).

Conséquence de mise en scène : le tilt reste **subtil** (≤ 12°), la profondeur vient du **décor et des particules**, pas de la rotation du produit. C'est aussi ce qui évite l'effet « vignette 3D cheap ».

---

## 6. Ce que je retiens de l'audit pour la direction artistique

Trois choses utiles, découvertes en mesurant les fichiers :

1. **La couleur d'ambiance d'une saveur n'est pas la couleur de son étiquette.** L'étiquette citron est **bleu ciel** (logo jaune), l'étiquette cerise est **bleu marine**, l'étiquette dragon est **lavande**, l'étiquette mangue passion est **indigo**. Les couleurs de scène, elles, sont franches et cohérentes. → **La couleur d'ambiance se prend dans la scène**, l'étiquette apporte l'accent secondaire. C'est ce qui évitera un site « vert citron / rose » cliché.
2. **Trois familles de rouges** cohabitent dans la gamme (cerise framboise, fruits rouges bordeaux, gingembre hibiscus brique) plus deux roses (litchi, pastèque). C'est le vrai risque de monotonie du site : il faudra les **séparer par la lumière et la texture**, pas seulement par le code couleur. Détail en phase 2.
3. **La scène citron est bleue.** C'est une chance : un kombucha citron en bleu myosotis est immédiatement plus singulier que le sempiternel jaune citron. Je le propose comme couleur d'ambiance (question en fin de phase 2).
