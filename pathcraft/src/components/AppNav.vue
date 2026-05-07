<template>
  <nav class="app-nav" :class="{ scrolled: isScrolled }">
    <router-link to="/" class="nav-logo">YI://portfolio</router-link>

    <button class="nav-toggle" @click="toggleMenu" :aria-expanded="isMenuOpen" aria-label="Ouvrir le menu">
      <span class="nav-toggle-bar" />
      <span class="nav-toggle-bar" />
      <span class="nav-toggle-bar" />
    </button>

    <ul class="nav-links" :class="{ open: isMenuOpen }">
      <li v-for="link in navLinks" :key="link.key">
        <router-link :to="link.to" class="nav-link" @click="closeMenu">{{ link.label }}</router-link>
      </li>
      <li class="mobile-theme-toggle">
        <button class="dark-toggle" @click="$emit('toggle-theme')">
          {{ isLight ? '● mode' : '◐ mode' }}
        </button>
      </li>
    </ul>

    <button class="dark-toggle desktop-toggle" @click="$emit('toggle-theme')">
      {{ isLight ? '● mode' : '◐ mode' }}
    </button>
  </nav>
</template>

<script>
export default {
  name: 'AppNav',
  props: {
    isLight: { type: Boolean, default: false }
  },
  emits: ['toggle-theme'],

  data() {
    return {
      isScrolled: false,
      isMenuOpen: false,
      navLinks: [
        { key: 'home',     to: '/',                                      label: 'accueil'  },
        { key: 'about',    to: '/about',                                 label: 'à propos' },
        { key: 'projects', to: '/projects',                              label: 'projets'  },
        { key: 'contact',  to: { path: '/', hash: '#contact-section' },   label: 'contact'  }
      ]
    }
  },

  methods: {
    onScroll() {
      this.isScrolled = window.scrollY > 40
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    }
  },

  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<style scoped>
.app-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 3rem;
  transition: background 0.3s, border-color 0.3s;
  border-bottom: 1px solid transparent;
}

.app-nav.scrolled {
  background: rgba(5, 13, 20, 0.88);
  backdrop-filter: blur(14px);
  border-color: var(--border);
}

.nav-logo {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent-bio);
  letter-spacing: 0.15em;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  transition: color 0.2s;
}
.nav-link:hover,
.router-link-active.nav-link {
  color: var(--accent-bio);
}

.dark-toggle {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  transition: border-color 0.2s, color 0.2s;
}
.dark-toggle:hover {
  border-color: var(--accent-bio);
  color: var(--accent-bio);
}

.nav-toggle {
  display: none;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.5rem;
  flex-direction: column;
  gap: 4px;
}

.nav-toggle-bar {
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 999px;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.mobile-theme-toggle {
  display: none;
}

@media (max-width: 768px) {
  .app-nav {
    padding: 1rem 1.5rem;
  }

  .nav-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 70px;
    right: 1.5rem;
    width: calc(100vw - 3rem);
    max-width: 280px;
    flex-direction: column;
    gap: 1rem;
    background: rgba(5, 13, 20, 0.96);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 1.5rem;
    display: none;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  }

  .nav-links.open {
    display: flex;
  }

  .nav-link {
    padding: 0.8rem 0.4rem;
    border-radius: 12px;
    font-size: 0.95rem;
    width: 100%;
  }

  .dark-toggle.desktop-toggle {
    display: none;
  }

  .mobile-theme-toggle {
    display: block;
  }
}
</style>
