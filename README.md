# puichaud.com — portfolio Ianis Puichaud

Site statique en mise en page éditoriale (thème « Forêt & Ivoire ») : une page d'accueil en
prose, une page CV, une liste de projets et une page par étude de cas (`/projets/<slug>/`).

## Stack

- **Astro** (statique, zéro JS côté client)
- **CSS** global dans `src/styles/global.css`, variables thème dans `:root`
- **Polices** auto-hébergées via `@fontsource/*` (importées dans `Base.astro`)
- **Données projets** : `src/data/projects.js`, lues par `projets/index.astro` et `projets/[slug].astro`

## Commandes

```sh
npm install
npm run dev            # serveur local
npm run build          # build statique → dist/ + génération CSP
npm run preview        # prévisualiser le build
npm run check          # vérification TypeScript/Astro
npm test               # tests CSP
npm run validate:html  # html-validate sur dist/
npm run validate:site  # liens internes, sitemap, garde-fou de contenu
npm run scan:sensitive # scan données sensibles
```

## Structure

```
src/
  layouts/Base.astro          # HTML, SEO (canonical, OG, JSON-LD), import CSS global
  components/Header.astro     # nav (Projets, CV, Contact)
  components/Footer.astro     # liens GitHub, LinkedIn, email
  pages/
    index.astro               # accueil (présentation en prose)
    cv.astro                  # CV en HTML
    projets/index.astro       # liste des études de cas
    projets/[slug].astro      # une page par étude de cas
    404.astro
  styles/global.css
  data/projects.js            # contenu des études de cas
public/
  cv.pdf                      # CV PDF (imprimé depuis CV/CV_Ianis.html, dossier non versionné)
  projects/                   # captures d'écran des projets
  _headers                    # en-têtes sécurité + CSP Cloudflare Pages
  _redirects                  # anciens chemins → /cv.pdf
scripts/
  generate-csp.mjs, csp.mjs   # génération/vérification du header CSP (post-build)
  validate-site.mjs           # liens internes, sitemap, formulations interdites
  scan-sensitive.mjs          # scan données sensibles
  stats-export/               # script Python non branché (ancien bloc Métriques supprimé)
```

## Éditer le contenu

| Quoi | Où |
|------|-----|
| Présentation | `src/pages/index.astro` |
| CV (HTML) | `src/pages/cv.astro` |
| Projets | `src/data/projects.js` |
| CV (PDF) | `CV/CV_Ianis.html` puis réimpression vers `public/cv.pdf` |

Le garde-fou de `validate-site.mjs` fait échouer la validation si « alternance », « Master »
ou « septembre 2026 » réapparaissent dans le site généré.

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
