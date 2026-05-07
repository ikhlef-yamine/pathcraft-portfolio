# PathCraft — Portfolio Yamine IKHLEF

Portfolio personnel construit avec **Vue 3 + Vite**.

## Structure du projet

```
pathcraft/
├── index.html                  # Point d'entrée HTML
├── vite.config.js              # Configuration Vite
├── package.json
└── src/
    ├── main.js                 # Bootstrap Vue + Router
    ├── App.vue                 # Layout global (nav, canvas, footer)
    ├── assets/
    │   └── css/
    │       └── global.css      # Variables CSS, reset, utilitaires
    ├── composables/
    │   ├── useDnaCanvas.js     # Animation canvas ADN + particules
    │   ├── useCustomCursor.js  # Curseur personnalisé
    │   └── useScrollReveal.js  # Révélation au scroll
    ├── data/
    │   └── projects.js         # Données des projets (éditable)
    ├── components/
    │   ├── AppNav.vue          # Barre de navigation
    │   ├── AppFooter.vue       # Pied de page
    │   ├── ProjectCard.vue     # Carte projet réutilisable
    │   └── ContactForm.vue     # Formulaire avec validation
    └── views/
        ├── HomeView.vue        # Page d'accueil + contact
        ├── AboutView.vue       # À propos, timeline, compétences
        └── ProjectsView.vue    # Portfolio filtrable
```

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en développement
npm run dev

# 3. Build de production
npm run build

# 4. Prévisualiser le build
npm run preview
```

## Personnalisation

- **Projets** → modifier `src/data/projects.js`
- **Couleurs** → modifier les variables dans `src/assets/css/global.css`
- **Contenu** → éditer directement les views dans `src/views/`

## Déploiement

Le projet utilise `createWebHashHistory` pour être compatible avec n'importe quel hébergement statique (GitHub Pages, Netlify, Vercel...).

```bash
npm run build
# → dossier dist/ prêt à déployer
```

Pour **GitHub Pages** :
```bash
npm run build
# pusher le dossier dist/ sur la branche gh-pages
```
