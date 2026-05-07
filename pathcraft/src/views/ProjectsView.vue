<template>
  <main class="page projects-page">
    <p class="section-label">// 02 — projets</p>
    <h1 class="section-title">
      Ce que j'ai<br><em>construit</em>
    </h1>

    <!-- Filter buttons -->
    <div class="filters">
      <button
        v-for="f in filters"
        :key="f.value"
        class="filter-btn"
        :class="{ active: activeFilter === f.value }"
        @click="activeFilter = f.value"
      >
        {{ f.label }}
      </button>
    </div>

    <div class="projects-grid">
      <ProjectCard
        v-for="(project, i) in filteredProjects"
        :key="project.id"
        :project="project"
        :style="{ transitionDelay: i * 0.1 + 's' }"
      />
    </div>
  </main>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'

export default {
  name: 'ProjectsView',
  components: { ProjectCard },

  setup() {
    useScrollReveal('.reveal')
  },

  data() {
    return {
      projects,
      activeFilter: 'all',
      filters: [
        { value: 'all',  label: 'Tous'       },
        { value: 'live', label: 'En ligne'   },
        { value: 'wip',  label: 'En cours'   },
        { value: 'soon', label: 'À venir'    }
      ]
    }
  },

  computed: {
    filteredProjects() {
      if (this.activeFilter === 'all') return this.projects
      return this.projects.filter(p => p.status === this.activeFilter)
    }
  }
}
</script>

<style scoped>
.projects-page { position: relative; z-index: 1; }

/* ---- Filters ---- */
.filters {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.filter-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  transition: all 0.2s;
}
.filter-btn:hover,
.filter-btn.active {
  border-color: var(--accent-bio);
  color: var(--accent-bio);
  background: rgba(0, 229, 160, 0.06);
}

/* ---- Grid ---- */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .projects-grid { grid-template-columns: 1fr; }
}
</style>
