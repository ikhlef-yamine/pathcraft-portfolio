<template>
  <main class="page about-page">
    <p class="section-label">// 01 — à propos</p>
    <h1 class="section-title">
      Un parcours<br><em>atypique</em> → une force
    </h1>

    <div class="about-grid">
      <!-- Text + skill bars -->
      <div class="about-text">
        <p>
          Mon parcours commence en Algérie avec un <strong>Bac Scientifique</strong>,
          puis une Licence en <strong>Biotechnologie Microbienne</strong> à l'Université
          Moulay Mameri. J'analysais des organismes vivants, leurs interactions,
          leurs systèmes — une façon de penser naturellement transposée à l'informatique.
        </p>
        <p>
          Arrivé à Paris, je plonge dans l'informatique au <strong>Golden Collar Institute</strong>,
          puis intègre l'ETNA en Master. L'alternance me permet d'appliquer immédiatement
          ce que j'apprends. Disponible <strong>96% du temps en entreprise</strong>.
        </p>
        <p>
          Je parle kabyle (ma langue maternelle), arabe, français bilingue, et progresse
          en anglais. Cette pluralité culturelle nourrit ma façon d'aborder les problèmes.
        </p>

        <div ref="barsRef" class="skill-bars">
          <div v-for="skill in skills" :key="skill.label" class="skill-bar-row-wrap">
            <div class="skill-bar-header">
              <span class="skill-bar-label">{{ skill.label }}</span>
              <span class="skill-bar-pct" :class="skill.color === 'tech' ? 'pct-tech' : 'pct-bio'">
                {{ skill.pct }}%
              </span>
            </div>
            <div class="skill-bar-track">
              <div
                class="skill-bar-fill"
                :class="`fill-${skill.color}`"
                :style="{ width: barsVisible ? skill.pct + '%' : '0%' }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="timeline" id="timeline">
        <div
          v-for="(item, i) in timeline"
          :key="i"
          class="timeline-item reveal"
          :class="item.type"
          :style="{ transitionDelay: i * 0.08 + 's' }"
        >
          <div class="timeline-dot" :class="item.type" />
          <div class="timeline-year" :class="item.type">{{ item.year }}</div>
          <div class="timeline-title">{{ item.title }}</div>
          <div class="timeline-sub">{{ item.sub }}</div>
        </div>
      </div>
    </div>

    <!-- Skill cards -->
    <p class="section-label" style="margin-top: 5rem;">// compétences</p>
    <div class="skills-grid">
      <div
        v-for="(card, i) in skillCards"
        :key="card.title"
        class="skill-card reveal"
        :style="{ transitionDelay: i * 0.1 + 's' }"
      >
        <div class="skill-card-icon">{{ card.icon }}</div>
        <div class="skill-card-title">{{ card.title }}</div>
        <div class="skill-tags">
          <span v-for="tag in card.tags" :key="tag.label" class="tag" :class="`tag-${tag.type}`">
            {{ tag.label }}
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'

export default {
  name: 'AboutView',

  setup() {
    useScrollReveal('.reveal')

    const barsRef     = ref(null)
    const barsVisible = ref(false)
    let observer      = null

    onMounted(() => {
      observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) barsVisible.value = true },
        { threshold: 0.3 }
      )
      if (barsRef.value) observer.observe(barsRef.value)
    })

    onUnmounted(() => { if (observer) observer.disconnect() })

    return { barsRef, barsVisible }
  },

  data() {
    return {
      skills: [
        { label: 'React / TypeScript', pct: 80, color: 'tech' },
        { label: 'Vue.js',             pct: 75, color: 'tech' },
        { label: 'Python / Data',      pct: 70, color: 'bio'  },
        { label: 'PHP / MySQL',        pct: 72, color: 'bio'  },
        { label: 'Linux / Bash',       pct: 78, color: 'tech' }
      ],

      timeline: [
        { year: '2018',        title: 'Baccalauréat Scientifique',            sub: 'Lycée Ain Zaouia, Algérie',               type: 'bio'   },
        { year: '2018 — 2022', title: 'Licence Biotechnologie Microbienne',   sub: 'Université Moulay Mameri, Tizi-Ouzou',    type: 'bio'   },
        { year: '2022 — 2025', title: 'Bac+3 Informatique & Technologies',    sub: 'Institut Golden Collar, Paris',           type: 'tech'  },
        { year: '2023 — 2024', title: 'Bénévolat — Linkee Paris',             sub: 'Coordination logistique, aide sociale',   type: 'warn'  },
        { year: '2023 → …',   title: 'Service Client & Accueil',             sub: 'Subway / City One, Paris',                type: 'tech'  },
        { year: 'Mars 2026 →', title: 'Master Architecte SI — Niveau 7',     sub: 'ETNA Ivry-sur-Seine — Recherche alternance', type: 'tech' }
      ],

      skillCards: [
        {
          icon: '🧬', title: 'Frontend & Frameworks',
          tags: [
            { label: 'React',       type: 'tech' },
            { label: 'Vue.js',      type: 'tech' },
            { label: 'Angular',     type: 'tech' },
            { label: 'TypeScript',  type: 'tech' },
            { label: 'Tailwind',    type: 'tech' },
            { label: 'Bootstrap',   type: 'tech' }
          ]
        },
        {
          icon: '⚙️', title: 'Backend & APIs',
          tags: [
            { label: 'PHP 8',       type: 'bio' },
            { label: 'NestJS',      type: 'bio' },
            { label: 'MySQL',       type: 'bio' },
            { label: 'PostgreSQL',  type: 'bio' },
            { label: 'REST API',    type: 'bio' }
          ]
        },
        {
          icon: '🐳', title: 'DevOps & Infrastructure',
          tags: [
            { label: 'Docker',       type: 'gray' },
            { label: 'Git',          type: 'gray' },
            { label: 'Linux / Unix', type: 'gray' },
            { label: 'Bash',         type: 'gray' },
            { label: 'TCP/IP, DNS',  type: 'gray' }
          ]
        },
        {
          icon: '📊', title: 'Data & Analyse',
          tags: [
            { label: 'Python',  type: 'bio' },
            { label: 'SQL',     type: 'bio' },
            { label: 'Excel',   type: 'bio' },
            { label: 'Jupyter', type: 'bio' },
            { label: 'Pandas',  type: 'bio' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.about-page { position: relative; z-index: 1; }

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* ---- Text ---- */
.about-text p {
  color: var(--text-muted);
  line-height: 1.9;
  font-size: 1rem;
  margin-bottom: 1.2rem;
}
.about-text p strong { color: var(--text); }

/* ---- Skill bars ---- */
.skill-bars { margin-top: 2rem; }

.skill-bar-row-wrap { margin-bottom: 0.9rem; }

.skill-bar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.35rem;
}
.skill-bar-label { font-size: 0.82rem; color: var(--text-muted); }
.skill-bar-pct   { font-family: var(--font-mono); font-size: 0.75rem; }
.pct-bio         { color: var(--accent-bio); }
.pct-tech        { color: var(--accent-tech); }

.skill-bar-track {
  height: 3px;
  background: rgba(255,255,255,0.08);
  border-radius: 2px;
  overflow: hidden;
}
.skill-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}
.fill-bio  { background: linear-gradient(to right, var(--accent-bio),  #00b87a); }
.fill-tech { background: linear-gradient(to right, var(--accent-tech), #1a6fd4); }

/* ---- Timeline ---- */
.timeline {
  position: relative;
  padding-left: 2rem;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, var(--accent-bio), var(--accent-tech), transparent);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-dot {
  position: absolute;
  left: -2.4rem; top: 0.3rem;
  width: 8px; height: 8px;
  border-radius: 50%;
}
.timeline-dot.bio  { background: var(--accent-bio);  box-shadow: 0 0 10px var(--accent-bio);  }
.timeline-dot.tech { background: var(--accent-tech); box-shadow: 0 0 10px var(--accent-tech); }
.timeline-dot.warn { background: var(--accent-warn); box-shadow: 0 0 10px var(--accent-warn); }

.timeline-year {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  margin-bottom: 0.2rem;
}
.timeline-year.bio  { color: var(--accent-bio);  }
.timeline-year.tech { color: var(--accent-tech); }
.timeline-year.warn { color: var(--accent-warn); }

.timeline-title { font-weight: 600; font-size: 0.95rem; margin-bottom: 0.2rem; }
.timeline-sub   { font-size: 0.82rem; color: var(--text-muted); }

/* ---- Skill cards ---- */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.skill-card {
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  transition: border-color 0.3s, transform 0.2s;
}
.skill-card:hover {
  border-color: rgba(0, 229, 160, 0.4);
  transform: translateY(-4px);
}

.skill-card-icon  { font-size: 1.5rem; margin-bottom: 0.8rem; }
.skill-card-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.8rem; }

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; gap: 3rem; }
}
</style>
