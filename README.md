# puichaud.com — portfolio Ianis Puichaud

Site portfolio statique : landing page thème "Forêt & Ivoire" avec sections Hero, Métriques
homelab, Projets (études de cas), Timeline, Infra, Compétences et Contact, plus une page
statique par projet (`/projets/<slug>/`).

## Stack

- **Astro** (statique, zéro framework côté client)
- **CSS** global dans `src/styles/global.css` — variables thème dans `:root`
- **Polices** auto-hébergées via `@fontsource/*` (importées dans `Base.astro`)
- **Données projets** : `src/data/projects.js` (JS plain exporté, branché dans `Projects.astro`
  et `src/pages/projets/[slug].astro`)
- **Métriques** : statiques dans `Metrics.astro` ; `scripts/stats-export/` reste dispo
  si un jour on branche des stats live depuis le homelab

## Commandes

```sh
npm install
npm run dev        # serveur local
npm run build      # build statique → dist/
npm run preview    # prévisualiser le build
npm run check      # vérification TypeScript/Astro
```

## Structure

```
src/
  layouts/Base.astro          # HTML, SEO (canonical, OG, JSON-LD), import CSS global
  pages/
    index.astro               # page principale — assemble tous les composants
    projets/[slug].astro      # pages projet statiques (une par étude de cas)
    404.astro                 # page d'erreur
  components/
    Header.astro              # nav sticky + burger mobile
    Hero.astro                # nom, titre, badge dispo, CTA CV/contact
    Metrics.astro             # métriques homelab (valeurs statiques dans le composant)
    Timeline.astro            # timeline expérience/formation
    Projects.astro            # études de cas en rangées alternées — données depuis src/data/projects.js
    Infra.astro               # spec sheet infrastructure homelab
    Skills.astro              # grille compétences
    Contact.astro             # mailto + liens GitHub/LinkedIn
    Footer.astro
  styles/global.css           # variables CSS, reset, layout, styles partagés
  data/projects.js            # données projets (rangées landing + pages projet)
public/
  favicon.svg
  og-image.png
  robots.txt
  cv.pdf
  projects/                   # captures d'écran des projets
  scripts/site.js             # JS client (nav, interactions)
  _headers                    # en-têtes sécurité Cloudflare Pages
  _redirects                  # anciens chemins (ex-/docs/CV-*.pdf) → /cv.pdf
scripts/
  generate-csp.mjs, csp.mjs   # génération/vérification du header CSP (post-build)
  validate-site.mjs           # liens internes + sitemap
  scan-sensitive.mjs          # scan données sensibles
  stats-export/               # script Python à faire tourner côté infra (voir son README)
```

## Éditer le contenu

| Quoi | Où |
|------|-----|
| Projets (rangées + pages) | `src/data/projects.js` |
| Hero / badge dispo | `src/components/Hero.astro` |
| Infra spec sheet | `src/components/Infra.astro` |
| Compétences | `src/components/Skills.astro` |
| Expérience / formation | `src/components/Timeline.astro` |
| Contact | `src/components/Contact.astro` |
| Métriques | `src/components/Metrics.astro` |

## Règles de confidentialité (bloquantes)

Ne jamais faire apparaître — contenu **et** code source : adresses IP, noms d'hôtes complets,
domaines internes, numéros de port, versions logicielles précises de l'infra, secrets,
données personnelles (catégorie OK, donnée non). Vérification avant déploiement :

```sh
grep -rEn "([0-9]{1,3}\.){3}[0-9]{1,3}" dist/ --include="*.html"
```

## Déploiement (Cloudflare Pages)

CI configurée dans `.github/workflows/` : push sur `master` → `npm run check` +
`npm audit --omit=dev --audit-level=high` + `npm run build` → deploy Cloudflare Pages
automatique (`deploy.yml`). Les PR passent un gate complet (audit, check, tests, build,
validations HTML/site/CSP, scan sensible) via `ci.yml`.

Secrets requis dans le repo GitHub :
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Domaine : `puichaud.com` (DNS Cloudflare, apex).

## Branchement stats live (optionnel, à faire côté infra)

Voir `scripts/stats-export/README.md`. Une fois un `stats.json` réel publié sur la passerelle,
brancher `Metrics.astro` dessus (fetch au build ou côté client).
