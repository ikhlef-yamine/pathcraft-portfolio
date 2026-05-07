<template>
  <main class="page home-page">
    <!-- Hero -->
    <section class="hero">
      <span class="hero-tag fade-up">Bio → Dev — Vitry-sur-Seine, 94</span>
      <h1 class="hero-name fade-up d1">
        <span class="bio">Yamine</span><br>
        <span class="tech">IKHLEF</span>
      </h1>
      <p class="hero-subtitle fade-up d2">De la cellule au code, une même curiosité</p>
      <p class="hero-desc fade-up d3">
        Ancien étudiant en <strong>biotechnologie microbienne</strong>, j'ai pivoté vers
        l'informatique avec l'envie de comprendre les systèmes complexes — biologiques ou numériques.
        Aujourd'hui en Master <strong>Architecte de Systèmes d'Information</strong> à l'ETNA.
      </p>
      <div class="hero-ctas fade-up d4">
        <router-link to="/projects" class="btn-primary">Voir mes projets</router-link>
        <a href="#contact-section" class="btn-outline">Me contacter</a>
        <a href="https://github.com/ikhlef-yamine/" target="_blank" class="btn-outline">GitHub ↗</a>
      </div>
    </section>

    <!-- Quick preview cards -->
    <section class="preview-section">
      <div class="preview-grid">
        <router-link to="/about" class="preview-card reveal">
          <div class="preview-icon">🧬</div>
          <h3>À propos</h3>
          <p>Mon parcours de la biologie au dev, mes compétences et ma timeline.</p>
          <span class="preview-arrow">→</span>
        </router-link>
        <router-link to="/projects" class="preview-card reveal" style="transition-delay:0.1s">
          <div class="preview-icon">⚡</div>
          <h3>Projets</h3>
          <p>PixelMind, PONG, PathCraft et les projets à venir (ETNAir, Data Science).</p>
          <span class="preview-arrow">→</span>
        </router-link>
      </div>
    </section>

    <!-- Contact section -->
    <section id="contact-section" class="contact-section">
      <p class="section-label">// contact</p>
      <div class="contact-grid">
        <div class="contact-info reveal">
          <h2 class="section-title">Parlons<br><em>ensemble</em></h2>
          <p class="contact-desc">
            Je recherche une alternance en développement Full-Stack ou Data.
            96% disponible en entreprise — Île-de-France.
          </p>
          <div class="contact-links">
            <a href="mailto:ikhlef_y@etna-alternance.net" class="contact-link">
              <div class="contact-link-icon">✉</div>
              <span>ikhlef_y@etna-alternance.net</span>
            </a>
            <a href="tel:0612507122" class="contact-link">
              <div class="contact-link-icon">☎</div>
              <span>06 12 50 71 22</span>
            </a>
            <a href="https://www.linkedin.com/in/yamine-ikhlef" target="_blank" class="contact-link">
              <div class="contact-link-icon">in</div>
              <span>yamine-ikhlef</span>
            </a>
            <a href="https://github.com/ikhlef-yamine/" target="_blank" class="contact-link">
              <div class="contact-link-icon">gh</div>
              <span>ikhlef-yamine</span>
            </a>
          </div>
        </div>

        <div class="reveal" style="transition-delay:0.15s">
          <ContactForm />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ContactForm from '@/components/ContactForm.vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'

export default {
  name: 'HomeView',
  components: { ContactForm },
  setup() {
    useScrollReveal('.reveal')
  }
}
</script>

<style scoped>
.home-page { position: relative; z-index: 1; }

/* ---- Hero ---- */
.hero {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2rem;
}

.hero-tag {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-bio);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(0, 229, 160, 0.3);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  width: fit-content;
}

.hero-name {
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}
.hero-name .bio  { color: var(--accent-bio);  }
.hero-name .tech { color: var(--accent-tech); }

.hero-subtitle {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.3rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.hero-desc {
  font-size: 1rem;
  line-height: 1.85;
  color: var(--text-muted);
  max-width: 540px;
  margin-bottom: 2.5rem;
}
.hero-desc strong { color: var(--text); }

.hero-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ---- Preview cards ---- */
.preview-section { padding: 4rem 0; }

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.preview-card {
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s;
  color: inherit;
  display: block;
}
.preview-card:hover {
  border-color: rgba(0, 229, 160, 0.35);
  transform: translateY(-4px);
}

.preview-icon { font-size: 2rem; margin-bottom: 1rem; }
.preview-card h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; }
.preview-card p  { font-size: 0.88rem; color: var(--text-muted); line-height: 1.7; }

.preview-arrow {
  position: absolute;
  bottom: 1.5rem; right: 1.5rem;
  color: var(--accent-bio);
  font-size: 1.2rem;
  transition: transform 0.2s;
}
.preview-card:hover .preview-arrow { transform: translateX(4px); }

/* ---- Contact ---- */
.contact-section { padding: 5rem 0; }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 2rem;
}

.contact-desc {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  transition: color 0.2s;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--border);
}
.contact-link:hover { color: var(--accent-bio); }

.contact-link-icon {
  width: 36px; height: 36px;
  border-radius: 6px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  transition: border-color 0.2s, background 0.2s;
}
.contact-link:hover .contact-link-icon {
  border-color: var(--accent-bio);
  background: rgba(0, 229, 160, 0.06);
}

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
}
</style>
