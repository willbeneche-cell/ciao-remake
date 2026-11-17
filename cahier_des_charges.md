# CAHIER DES CHARGES — SITE VITRINE CIAO KOMBUCHA

## 0. RÔLE ET MÉTHODE

Tu es une équipe de studio : un directeur artistique exigeant et des développeurs front-end seniors (motion, WebGL, performance). Tu ne livres pas un template : tu livres un site de marque avec un point de vue visuel fort, comparable à ce qu'un studio facturerait très cher.

### Skills à utiliser (lis-les AVANT de coder, applique-les activement)
- Direction artistique et anti-générique : frontend-design, design-taste-frontend, impeccable, unslop
- Philosophie d'interface et de mouvement : emil-design-eng, apple-design
- Chorégraphie et transitions : choreograph, animate, transitions-dev, transitions-polish, gestures
- Vocabulaire : animation-vocabulary (pour nommer précisément les effets)
- Choix techniques : pick-ui-library, shadcn-ui (uniquement pour les primitives d'accessibilité : accordéon, menu, dialog, entièrement restylées, jamais le style par défaut)
- Contrôle qualité : review-animations, find-animation-opportunities, improve-animations, animation-performance, performance, web-design-guidelines
- Utilitaires : prototype (pour tester une idée d'interaction avant de l'intégrer), break-ui (pour tester la robustesse de l'interface), learn-taste (pour intégrer mes retours de goût au fil des itérations)

### Skills à ignorer (hors sujet pour un site web)
animate-expo, mobile-native, write-swift (mobile natif), ask-sonner (toasts, inutile ici), remove-animations (contraire à l'objectif), ask-emil (redondant avec emil-design-eng).

### Workflow obligatoire, par phases
Après chaque phase, résume ce que tu as fait et ATTENDS MA VALIDATION avant de passer à la suivante. Ne génère jamais tout le site d'un coup.
1. AUDIT des assets
2. DIRECTION ARTISTIQUE (document, sans code)
3. FONDATIONS (projet, tokens, layout, chargement, navbar, hero)
4. SECTIONS, une par une
5. REVUE FINALE (motion, performance, accessibilité, responsive, robustesse)

## 1. LA MARQUE, LA CIBLE, L'OBJECTIF

Ciao Kombucha : kombucha issu d'une vraie fermentation (thé, eau, sucre consommé en grande partie par les levures et bactéries, SCOBY), non pasteurisé, faible en sucre, sans additifs artificiels, ingrédients bio, à conserver au frais. Recettes douces, fruitées et désaltérantes, plus proches d'un soda léger que du kombucha vinaigré traditionnel, avec la complexité de la fermentation. Image moderne, pop, décomplexée, accessible. Mission : démystifier le kombucha.

Cibles :
- Jeunes adultes sensibles aux marques modernes, originales et créatives.
- Consommateurs de produits naturels, artisanaux et de qualité.

Objectif du site : faire découvrir la marque et ses saveurs, et séduire. C'est un site VITRINE. Pas de e-commerce, pas de panier. Le CTA principal est « Où nous trouver ».

Ton éditorial : joyeux, malin, un peu impertinent, jamais pédant, jamais « wellness » fade. Tutoiement. Langue : français.

Règle absolue : AUCUNE allégation santé (détox, immunité, soigne, booste, etc.). On parle de goût, de fermentation, d'ingrédients et de plaisir. Aucun chiffre nutritionnel inventé.

## 2. CE QUE JE VEUX, CE QUE JE NE VEUX PAS

### Je veux
Un site immersif, au niveau d'un site de marque primé :
- Scroll fluide et récit au scroll.
- 3D / WebGL, animations chorégraphiées, effets de matière (bulles, liquide, grain, lumière).
- Une vraie personnalité de directeur artistique, pas un assemblage de composants.

### Je ne veux PAS
- Un rendu générique : layouts de type SaaS, cartes toutes identiques, dégradés violet/bleu, polices Inter, Roboto ou Arial, ombres molles partout, emojis comme icônes, animations gratuites.
- Du « beau mais froid » : le site doit donner envie de boire, pas seulement d'admirer.

### Référence : site « ūm » (vidéo jointe)
J'aime l'esprit général : 3D, animations, effets, énergie. Détail de ce que j'ai vu et de ce que j'en pense.

À reprendre dans l'esprit (réinventé pour Ciao, jamais copié) :
- Écran de chargement avec compteur de pourcentage, utilisé comme première mise en scène de la marque.
- Hero : titre géant qui occupe l'écran, avec le produit qui chevauche le texte (le texte passe en partie DERRIÈRE la bouteille, effet de profondeur).
- Changement de saveur : le fond entier prend la couleur de la saveur, et le NOM de la saveur devient le titre géant, avec la bouteille par-dessus.
- Grille de blocs d'information avec de gros mots-clés ou chiffres.
- Bandeau défilant (marquee) incliné, utilisé comme séparateur de section.
- Moments ludiques : la bouteille traverse un titre, curseur personnalisé, accordéon pour la FAQ.

À NE PAS reprendre (je n'aime pas) :
- La navbar : barre pleine largeur compacte, en petites capitales condensées. Propose une navbar différente (par exemple flottante, ou minimale avec le logo et un bouton de menu) avec une autre typographie.
- Les boutons : rectangle noir à texte blanc et pastille citron. Invente un langage de boutons propre à Ciao.
- La palette : vert, orange, rose et citron très saturés, qui correspondent à la marque ūm, pas à Ciao.
- La police condensée ultra-bold en majuscules des titres. Choisis une typographie plus proche de l'univers du logo Ciao.

Différenciation visée : l'univers de Ciao est la fermentation, l'effervescence, la matière vivante (bulles, liquide, reflets, grain). Il doit être plus rond, plus joyeux et plus gourmand que brutal ou « énergie ».

## 3. ASSETS FOURNIS (dans le dossier du projet)

- 10 bouteilles détourées (PNG) : kombucha_cerise, citron, dragon, fruits_rouges, gingembre_hibiscus, litchi, mangue_passion, menthe, pasteque, peche
- 10 scènes d'ambiance, une par saveur, avec fond coloré : scene_cerise, citron, dragon, fruits_rouges, gingembre_hibiscus, litchi, menthe, peche (vérifie lesquelles existent, il peut en manquer pour mangue_passion et pastèque)
- 2 shootings « toutes les gammes » côte à côte (bandeaux panoramiques) : shooting_toutes_les_gammes.png et shooting_toutes_les_gammes_02.png
- logo_ciao.jpg (logo noir sur fond blanc, typographie ronde et épaisse)

Règles :
- N'invente aucun visuel de produit. Pas de fausses bouteilles, pas d'étiquettes générées.
- Si une image est insuffisante (résolution, détourage imparfait, fond blanc), dis-le en phase d'audit au lieu de la contourner en silence.
- Vectorise ou redessine proprement le logo si nécessaire (fond transparent, version blanche et version noire).
- Convertis en WebP/AVIF, génère des tailles responsives, lazy-load tout ce qui est hors hero.

## 4. DIRECTION ARTISTIQUE

### Système chromatique
- Base neutre chaude (blanc cassé crème et noir encre), cohérente avec le logo.
- Chaque saveur a UNE couleur dominante, extraite de sa bouteille et de sa scène. Le site change d'ambiance (fond, lumière, accents) quand on passe d'une saveur à l'autre.
- Une seule couleur dominante à l'écran à la fois. Pas d'arc-en-ciel permanent.
- Propose la palette de base et les 10 couleurs de saveur en phase 2, avec leurs valeurs, pour validation.

### Typographie
- 2 familles maximum, avec du caractère, qui dialoguent avec le logo rond et gras.
- Titres expressifs, grande échelle, tracking serré, ronds et généreux (pas de condensé brutal).
- Texte courant très lisible.
- Navbar : typographie soignée et distinctive, discrète en taille, différente de la référence.
- Pas de police système, pas d'Inter, pas de Roboto.
- Propose 2 appairages différents en phase 2, avec une recommandation argumentée.

### Boutons et interactions
- Propose un langage original (forme, comportement au survol, micro-interaction au press) cohérent avec l'univers « bulles et fermentation » (par exemple une forme organique, un remplissage liquide au survol, une bulle qui éclate au clic).
- Pas de rectangle noir standard, pas de pilule grise générique.
- États complets : hover, focus-visible, active, disabled, avec cibles tactiles suffisantes.
- Curseur personnalisé discret (desktop uniquement), jamais au détriment de l'usabilité.

### Matière et lumière
- Grain léger, lumière douce, bulles, reflets, brillance du verre.
- La bouteille est la star : respiration subtile, ombre portée crédible, jamais écrasée par le décor.

### Rythme
- Alternance de moments denses (grand visuel + titre géant) et de moments calmes.
- Des vides assumés. Pas de remplissage.

## 5. STRUCTURE DU SITE (à affiner avec moi en phase 2)

1. **Écran de chargement** : compteur de pourcentage, bulles qui montent, logo Ciao qui se révèle. Court (3 secondes max, réel et pas artificiel). Passage direct si les assets sont déjà en cache.
2. **Navbar** : logo, 4 à 5 liens maximum (La gamme, La fermentation, Engagements, Où nous trouver), CTA « Où nous trouver ». Réduite au scroll. Menu plein écran animé sur mobile. Différente de la référence (voir §2).
3. **Hero** : titre géant avec la bouteille en vedette, qui chevauche le texte (texte partiellement derrière). Réaction à la souris ou au gyroscope (tilt, parallax en profondeur, 3D truquée à partir du PNG). Bulles et particules WebGL. Entrée orchestrée.
4. **Manifeste** : 2 à 3 phrases fortes révélées au scroll.
5. **La gamme (cœur du site)** : sélecteur immersif des 10 saveurs.
   - Au changement : la bouteille glisse et pivote, la scène de la saveur apparaît en décor, le fond transitionne vers la couleur de la saveur, le NOM de la saveur devient le titre géant, les notes de goût s'animent.
   - Navigation : souris, clavier, swipe, flèches.
   - Chaque saveur a une fiche courte : nom, 2 à 3 notes de goût, ingrédients (textes [À VALIDER]).
6. **La vraie fermentation** : explication en 3 à 4 étapes (thé, SCOBY, fermentation, mise en bouteille), en storytelling au scroll, avec effets de matière (bulles, liquide).
7. **Bandeau défilant incliné** (marquee) comme séparateur, avec un message de marque (formulation propre à Ciao, pas copiée).
8. **« Toute la bande »** : les shootings panoramiques en défilement horizontal avec pinning.
9. **Engagements** : bio, non pasteurisé, faible en sucre, sans additifs artificiels (4 blocs maximum, grille type « blocs » inspirée de la référence mais dans le style Ciao).
10. **FAQ** en accordéon, ton léger (« C'est quoi ce truc qui flotte ? », « Pourquoi à conserver au frais ? », « Ça a le goût de vinaigre ? »), sans allégation santé.
11. **Où nous trouver** : liste d'enseignes (placeholder facilement modifiable), rappel « à conserver au frais ».
12. **Footer** : logo, liens, mentions légales, réseaux (placeholders).

Textes : rédige-les toi-même en français, courts et percutants, marqués [À VALIDER]. N'invente aucun fait vérifiable (chiffres de vente, certifications, noms d'enseignes réels) : utilise des placeholders signalés.

## 6. MOTION (applique les skills de motion)

- Un système cohérent : mêmes courbes d'easing, mêmes durées par catégorie, mêmes principes partout. Documente-le dans un fichier dédié (par exemple motion.ts).
- Chorégraphie : décalages (stagger) maîtrisés, hiérarchie claire de ce qui entre en premier.
- Interactions physiques et interruptibles (springs, inertie). Aucune transition qui bloque l'utilisateur ou qui ne peut pas être interrompue.
- Chaque animation doit avoir une raison. Supprime ce qui est décoratif sans fonction (passe find-animation-opportunities, puis review-animations).
- Smooth scroll doux, pinning et scrub là où ils servent le récit, pas partout.
- prefers-reduced-motion respecté : une version calme, complète et belle du site.
- Animer en priorité transform et opacity. Cible : 60 fps sur un téléphone moyen de gamme.

## 7. TECHNIQUE

- Stack suggérée (tu peux proposer mieux, en justifiant, après avoir utilisé pick-ui-library) : Next.js ou Vite, React, TypeScript, Tailwind pour les design tokens, GSAP et ScrollTrigger pour le scroll, Lenis pour le smooth scroll, Three.js / React Three Fiber pour les effets WebGL, Motion pour les micro-interactions.
- 3D : je n'ai pas de modèles 3D des bouteilles. Utilise les PNG sur des plans avec profondeur, parallax, tilt, ombres, bulles et shaders. Ne fabrique pas de fausse bouteille 3D. Signale-moi les limites de cet effet.
- WebGL léger, avec repli statique si WebGL est indisponible ou l'appareil faible.
- Performance : LCP < 2,5 s sur 4G, CLS proche de 0, JS minimal, polices optimisées (subset, preload), images modernes. Applique le skill performance.
- Accessibilité : contraste AA, navigation clavier complète, focus visibles, alt pertinents, structure sémantique, aria sur l'accordéon et le menu.
- Responsive : conçu mobile-first, pas « réduit » depuis le desktop. Effets lourds allégés sur mobile.
- SEO : balises meta, Open Graph, données structurées Organization, sitemap.
- Code propre : composants réutilisables, contenu (saveurs, textes, enseignes) séparé dans des fichiers de données pour que je modifie sans toucher aux animations.
- Ne jamais installer de dépendance sans me dire pourquoi.

## 8. CRITÈRES DE RÉUSSITE

- Au premier regard, on ne dirait pas un template.
- On reconnaît Ciao sans voir le logo.
- Chaque saveur a sa personnalité sans casser la cohérence globale.
- La navbar, les boutons et la palette ne ressemblent pas à la référence ūm.
- Fluide sur un téléphone moyen de gamme.
- Je peux modifier textes et saveurs sans toucher au code des animations.
- Passe review-animations, performance et web-design-guidelines sans problème majeur.

## 9. PREMIÈRE ACTION

Commence par la PHASE 1 (audit des assets) et la PHASE 2 (direction artistique : palette, 2 appairages typographiques, langage de boutons, système de motion, structure validée). Ne code rien avant ma validation. Pose-moi au maximum 5 questions si quelque chose te bloque.