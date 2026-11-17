import { navigate } from '../lib/route'

const BLOCKS = [
  {
    title: 'Éditeur du site',
    body: [
      'Ciao Kombucha — [FORME JURIDIQUE], [CAPITAL] €, [ADRESSE], [CODE POSTAL] [VILLE].',
      'SIRET : [À VALIDER] · TVA intracommunautaire : [À VALIDER].',
      'Contact : [EMAIL] · [TÉLÉPHONE].',
    ],
  },
  {
    title: 'Hébergement',
    body: ['[HÉBERGEUR], [ADRESSE], [TÉLÉPHONE]. [À VALIDER]'],
  },
  {
    title: 'Données personnelles',
    body: [
      'Ce site est un site vitrine : il n’y a ni compte, ni panier, ni formulaire de contact, ni mesure d’audience.',
      'Aucune donnée personnelle n’est collectée ni conservée. [À VALIDER si un outil de mesure est ajouté]',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'Aucun cookie de suivi n’est déposé. [À VALIDER — à mettre à jour si un outil tiers est ajouté]',
    ],
  },
  {
    title: 'Propriété intellectuelle',
    body: [
      'Le logotype, les textes, les photographies de produit et les visuels de ce site sont la propriété de Ciao Kombucha. Toute reproduction sans autorisation est interdite.',
    ],
  },
  {
    title: 'Consommation',
    body: [
      'Produit non pasteurisé, à conserver au frais. À consommer dans le cadre d’une alimentation variée. Aucune allégation santé n’est formulée sur ce site. [À VALIDER — mentions légales produit]',
    ],
  },
]

/**
 * Page mentions légales — une vraie page, pas une modale.
 * Tous les champs sont des placeholders : rien n'est inventé.
 */
export function MentionsLegales() {
  return (
    <main id="main" className="legal">
      <a
        className="legal__back"
        href="/"
        onClick={(event) => {
          event.preventDefault()
          navigate('/')
        }}
      >
        ← Retour au site
      </a>

      <h1 className="legal__title">Mentions légales</h1>
      <p className="legal__lede">
        Ce qui est obligatoire, sans détour. Les champs entre crochets sont à
        compléter. [À VALIDER]
      </p>

      <div className="legal__blocks">
        {BLOCKS.map((block) => (
          <section className="legal__block" key={block.title}>
            <h2>{block.title}</h2>
            {block.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}
