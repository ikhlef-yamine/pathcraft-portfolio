// data/projects.js
// Centralized project data — edit here to update the portfolio

export const projects = [
  {
    id: 'pixelmind',
    title: 'PixelMind',
    status: 'live',
    statusLabel: 'Live — Bachelor',
    desc: 'Plateforme académique simulant la gestion étudiants-entreprises. Système multi-rôles (Admin, Entreprises, Étudiants), authentification sécurisée, mode sombre, envoi d\'emails automatisés.',
    stack: [
      { label: 'PHP 8',       type: 'bio'  },
      { label: 'MySQL',       type: 'bio'  },
      { label: 'Bootstrap 5', type: 'tech' },
      { label: 'AOS.js',      type: 'tech' },
      { label: 'PDO / Bcrypt',type: 'gray' },
      { label: 'PHPMailer',   type: 'gray' }
    ],
    link: 'https://github.com/ikhlef-yamine/pixelmind'
  },
  {
    id: 'pong',
    title: 'PONG',
    status: 'live',
    statusLabel: 'Bonus — Piscine ETNA',
    desc: 'Jeu Pong réalisé en Python lors de la période d\'adaptation intensive à l\'ETNA. Premier projet concret du parcours — retour aux fondamentaux.',
    stack: [
      { label: 'Python', type: 'bio'  },
      { label: 'Pygame', type: 'gray' }
    ],
    link: 'https://github.com/ikhlef-yamine/PONG'
  },
  {
    id: 'pathcraft',
    title: 'PathCraft — Ce portfolio',
    status: 'wip',
    statusLabel: 'En cours — C2WK',
    desc: 'Portfolio personnel évolutif avec animations biologiques, mode sombre, formulaire de contact interactif et intégration GitHub API.',
    stack: [
      { label: 'Vue 3',       type: 'tech' },
      { label: 'TypeScript',  type: 'tech' },
      { label: 'Vite',        type: 'tech' },
      { label: 'GitHub API',  type: 'gray' }
    ],
    link: null
  },
  {
    id: 'etnair',
    title: 'ETNAir — Plateforme de location',
    status: 'soon',
    statusLabel: 'Bientôt — Groupe',
    desc: 'Projet de groupe : API robuste Node.js + PostgreSQL, frontend moderne, déploiement Docker/Kubernetes. Rôle Dev Full-Stack & Infrastructure.',
    stack: [
      { label: 'Node.js',     type: 'bio'  },
      { label: 'PostgreSQL',  type: 'bio'  },
      { label: 'React',       type: 'tech' },
      { label: 'Tailwind',    type: 'tech' },
      { label: 'Docker',      type: 'gray' },
      { label: 'Kubernetes',  type: 'gray' }
    ],
    link: null
  },
  {
    id: 'datascience',
    title: 'Data Science — Analyse exploratoire',
    status: 'soon',
    statusLabel: 'Juin 2026 — Data',
    desc: 'Module C2W-DBIA : SQL, analyse exploratoire, visualisation et machine learning via JupyterLab. Un retour aux sciences — en données cette fois.',
    stack: [
      { label: 'Python',  type: 'bio'  },
      { label: 'Pandas',  type: 'bio'  },
      { label: 'Jupyter', type: 'bio'  },
      { label: 'SQL',     type: 'bio'  },
      { label: 'ML',      type: 'gray' }
    ],
    link: null
  }
]
