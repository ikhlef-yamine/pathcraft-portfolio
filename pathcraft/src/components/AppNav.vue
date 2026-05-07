<template>
  <nav class="app-nav" :class="{ scrolled: isScrolled }">
    <router-link to="/" class="nav-logo">YI://portfolio</router-link>

    <ul class="nav-links">
      <li v-for="link in navLinks" :key="link.to">
        <router-link :to="link.to" class="nav-link">{{ link.label }}</router-link>
      </li>
    </ul>

    <button class="dark-toggle" @click="$emit('toggle-theme')">
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
      navLinks: [
        { to: '/',        label: 'accueil'  },
        { to: '/about',   label: 'à propos' },
        { to: '/projects',label: 'projets'  },
        { to: '/#contact',label: 'contact'  }
      ]
    }
  },

  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      this.isScrolled = window.scrollY > 40
    }
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

@media (max-width: 768px) {
  .app-nav  { padding: 1rem 1.5rem; }
  .nav-links { display: none; }
}
</style>
