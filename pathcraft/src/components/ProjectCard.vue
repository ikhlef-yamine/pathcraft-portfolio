<template>
  <component
    :is="project.link ? 'a' : 'div'"
    :href="project.link || undefined"
    :target="project.link ? '_blank' : undefined"
    class="project-card reveal"
    :class="{ 'coming-soon': project.status === 'soon' }"
  >
    <span v-if="project.link" class="project-arrow">↗</span>

    <div class="project-status" :class="`status-${project.status}`">
      {{ project.statusLabel }}
    </div>

    <h3 class="project-title">{{ project.title }}</h3>
    <p class="project-desc">{{ project.desc }}</p>

    <div class="project-stack">
      <span
        v-for="tech in project.stack"
        :key="tech.label"
        class="tag"
        :class="`tag-${tech.type}`"
      >{{ tech.label }}</span>
    </div>
  </component>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: { type: Object, required: true }
  }
}
</script>

<style scoped>
.project-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  color: inherit;
  display: block;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(to right, var(--accent-bio), var(--accent-tech));
  transform: scaleX(0);
  transition: transform 0.3s;
  transform-origin: left;
}

.project-card:hover::before  { transform: scaleX(1); }

.project-card:hover {
  border-color: rgba(0, 229, 160, 0.3);
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.coming-soon {
  opacity: 0.65 !important;
  border-style: dashed;
}

.project-arrow {
  position: absolute;
  top: 1.5rem; right: 1.5rem;
  color: var(--text-muted);
  font-size: 1.2rem;
  transition: color 0.2s, transform 0.2s;
}
.project-card:hover .project-arrow {
  color: var(--accent-bio);
  transform: translate(2px, -2px);
}

.project-status {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  display: inline-block;
  margin-bottom: 1rem;
}
.status-live { background: rgba(0,229,160,0.1);  color: var(--accent-bio);  border: 1px solid rgba(0,229,160,0.3);  }
.status-wip  { background: rgba(61,154,255,0.1); color: var(--accent-tech); border: 1px solid rgba(61,154,255,0.3); }
.status-soon { background: rgba(255,184,48,0.1); color: var(--accent-warn); border: 1px solid rgba(255,184,48,0.3); }

.project-title {
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: 0.6rem;
}

.project-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
</style>
