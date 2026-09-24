export const projects = [
  {
    slug: 'datacommune',
    name: 'DataCommune',
    number: '01',
    status: 'En ligne',
    meta: 'Produit data · 2025 →',
    summary:
      'Un produit data en ligne : ingestion de sources publiques, API FastAPI, frontend SvelteKit et déploiement continu. Je le conçois et l’exploite seul.',
    outcome:
      '27 jeux de données réunis dans une API unique. L’instance auditée contient 37,5 millions de lignes et expose 85 chemins OpenAPI sur deux départements.',
    tags: ['FastAPI', 'PostGIS', 'SvelteKit', 'ETL', 'GitHub Actions'],
    facts: [
      { value: '27', label: 'jeux de données' },
      { value: '37,5 M', label: 'lignes auditées' },
      { value: '85', label: 'chemins OpenAPI' },
    ],
    challenge:
      'Réunir des sources publiques hétérogènes sans masquer leurs limites : millésimes, couverture, schémas et volumes varient fortement selon les producteurs.',
    work: [
      '21 pipelines ETL. Chaque pipeline vérifie le volume, le schéma et la couverture avant mise en production.',
      'API FastAPI sur PostgreSQL/PostGIS, avec authentification, quotas et erreurs normalisées.',
      'Frontend SvelteKit 5 déployé sur Cloudflare Workers ; API conteneurisée sur mon homelab et publiée par tunnel sortant.',
      'CI/CD GitHub Actions sur runner auto-hébergé. Les images sont versionnées et le retour arrière est testé.',
    ],
    results: [
      'Instance publique active sur la Loire-Atlantique et la Vendée.',
      'Matrice de qualité documentée pour les 21 pipelines et 6 proxys de données.',
      'Fiches Commune rendues côté serveur et indexables par les moteurs de recherche.',
    ],
    limits: [
      'Le périmètre France entière est une cible d’architecture, pas le volume de la démo publique.',
      'La facturation est volontairement désactivée tant que la qualité des données et l’usage terrain ne sont pas validés.',
    ],
    image: '/projects/datacommune-homepage.png',
    imageAlt: 'Page d’accueil de DataCommune',
    gallery: [
      { src: '/projects/datacommune-datasets.png', alt: 'Catalogue des jeux de données DataCommune' },
      { src: '/projects/datacommune-api.png', alt: 'Documentation interactive de l’API DataCommune' },
    ],
    external: { href: 'https://datacommune.fr', label: 'Ouvrir DataCommune' },
  },
  {
    slug: 'hexalith',
    name: 'Hexalith',
    number: '02',
    status: 'Lab documenté',
    meta: 'GitOps & IAM · 2026',
    summary:
      'Un lab Proxmox monté dans le cadre de ma formation, pour pratiquer l’IaC, le SSO, l’observabilité et la restauration après incident.',
    outcome:
      'Six LXC provisionnés. J’ai exécuté et documenté les scénarios SSO, cycle de vie des comptes, alerte et restauration.',
    tags: ['Terraform', 'Ansible', 'Authentik', 'Grafana', 'GitHub Actions'],
    facts: [
      { value: '27', label: 'PR fusionnées' },
      { value: '6', label: 'LXC provisionnés' },
      { value: '15–133 s', label: 'restauration mesurée' },
    ],
    challenge:
      'Construire une chaîne d’infrastructure complète et vérifiable, alors que mon quotidien chez Equans était centré sur le support poste.',
    work: [
      'Terraform provisionne les LXC sur Proxmox, Ansible configure les services. Le tout est appliqué depuis un runner GitHub Actions auto-hébergé.',
      'SSO validé en SAML avec GLPI et en OpenID Connect avec Grafana.',
      'Onboarding automatisé : création d’identité, ticket ITSM, notification, puis désactivation lors de l’offboarding.',
      'Supervision Prometheus, Loki et Grafana. J’ai provoqué un incident volontaire : alerte reçue, puis service restauré.',
    ],
    results: [
      '10 sondes sur 10 et 18 cibles sur 18 disponibles au dernier contrôle.',
      'Alerte reçue après environ 102 secondes, résolution détectée environ 61 secondes après reprise.',
      'Restauration après destruction volontaire : environ 15 s pour n8n, 133 s pour Authentik. Intégrité vérifiée après chaque test.',
    ],
    limits: [
      'Mesures prises sur un lab hébergé sur un hôte existant, pas en production.',
      'Le budget et le planning sur treize semaines viennent du scénario d’école, pas d’un déploiement client.',
    ],
    image: '/projects/hexalith-gitops.png',
    imageAlt: 'Pipeline Terraform Hexalith réussi dans GitHub Actions',
    gallery: [
      { src: '/projects/hexalith-sso.png', alt: 'Connexion GLPI proposée par le fournisseur d’identité Authentik' },
    ],
  },
  {
    slug: 'homelab',
    name: 'Homelab',
    number: '03',
    status: 'Exploité 24/7',
    meta: 'Infrastructure personnelle · 2024 →',
    summary:
      'Mon infrastructure personnelle : des services migrés progressivement vers de l’IaC, avec des sauvegardes testées.',
    outcome:
      'Treize LXC sont décrits par Terraform et configurés avec Ansible. Les données critiques suivent une stratégie 3-2-1 dont la restauration est testée.',
    tags: ['Proxmox', 'Terraform', 'Ansible', 'Tailscale', 'SOPS'],
    facts: [
      { value: '13', label: 'LXC en IaC' },
      { value: '3-2-1', label: 'sauvegardes' },
      { value: '24/7', label: 'exploitation' },
    ],
    challenge:
      'Reconstruire une infrastructure devenue hétérogène sans perdre les données, tout en gardant un retour arrière possible à chaque migration.',
    work: [
      'Terraform est la source de vérité ; la documentation est générée depuis le code.',
      'Migration service par service, avec test de restauration et observation avant de retirer l’ancien service.',
      'Accès distant par Tailscale, authentification par passkey. L’exposition publique est en cours de retrait.',
      'Observabilité centralisée, durcissement SSH et secrets chiffrés avec SOPS/age.',
    ],
    results: [
      'Treize conteneurs déclarés en IaC, protégés contre la suppression accidentelle.',
      'Sauvegardes locales et hors site ; exercices de restauration documentés.',
      'Bascule LAN-only en cours, par vagues, avec contrôles fonctionnels avant chaque étape.',
    ],
    limits: [
      'Un seul nœud Proxmox porte l’essentiel de la charge : les sauvegardes sont testées, la haute disponibilité ne l’est pas.',
      'Le dépôt et la topologie détaillée restent privés pour ne pas exposer les accès internes.',
    ],
  },
  {
    slug: 'automatisation-ad',
    name: 'Automatisation AD',
    number: '04',
    status: 'Utilisé en entreprise',
    meta: 'PowerShell · 2025',
    summary:
      'Trois outils PowerShell pour des opérations Active Directory répétitives chez Equans, où chaque écriture doit être contrôlée.',
    outcome:
      'Les outils couvrent la gestion en masse, l’audit des droits et les sorties de personnel. Chaque opération sensible passe par une simulation et une sauvegarde avant écriture.',
    tags: ['PowerShell', 'Active Directory', 'IAM', 'Guardrails'],
    facts: [
      { value: '3', label: 'outils ciblés' },
      { value: '25 000+', label: 'postes dans l’environnement' },
      { value: '100 %', label: 'simulation avant écriture' },
    ],
    challenge:
      'Automatiser sans élargir les privilèges ni transformer une erreur de saisie en modification massive.',
    work: [
      'Un mode simulation montre les changements avant de les appliquer.',
      'Exports de contrôle et sauvegardes avant les opérations sensibles.',
      'Code revu par un développeur, périmètre d’action volontairement restreint.',
    ],
    results: [
      'Les opérations répétitives passent par trois outils au lieu de manipulations manuelles.',
      'Les audits de droits et les sorties de personnel sont mieux tracés.',
    ],
    limits: [
      'Le code et les données restent privés car ils appartiennent au contexte d’entreprise.',
      'L’outil assiste la décision ; il ne remplace ni la validation humaine ni les contrôles natifs.',
    ],
  },
];
