<template>
  <div >
    <!-- Custom cursor -->
    <div class="cursor" :style="cursorStyle" />
    <div class="cursor-ring" :style="ringStyle" />

    <!-- DNA canvas background -->
    <canvas ref="canvas" class="dna-canvas" />

    <!-- Navigation -->
    <AppNav :is-light="isLight" @toggle-theme="toggleTheme" />

    <!-- Router view -->
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useDnaCanvas } from '@/composables/useDnaCanvas.js'
import { useCustomCursor } from '@/composables/useCustomCursor.js'

export default {
  name: 'App',
  components: { AppNav, AppFooter },

  setup() {
    const { canvasRef } = useDnaCanvas()
    const { cursorStyle, ringStyle } = useCustomCursor()
    return { canvas: canvasRef, cursorStyle, ringStyle }
  },

  data() {
    return { isLight: false }
  },

 methods: {
  toggleTheme() {
    this.isLight = !this.isLight
    document.body.classList.toggle('light', this.isLight)
  }

  }
}
</script>

<style>
/* Cursor */
.cursor {
  position: fixed;
  width: 10px; height: 10px;
  background: var(--accent-bio);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s, background 0.2s;
  mix-blend-mode: screen;
}
.cursor-ring {
  position: fixed;
  width: 36px; height: 36px;
  border: 1px solid rgba(0, 229, 160, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: transform 0.18s ease, width 0.2s, height 0.2s;
}

@media (max-width: 768px) {
  .cursor,
  .cursor-ring {
    display: none !important;
  }
}

/* DNA Canvas */
.dna-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  opacity: 0.35;
  pointer-events: none;
}

/* Page transition */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.page-fade-enter-from { opacity: 0; transform: translateY(12px); }
.page-fade-leave-to   { opacity: 0; transform: translateY(-12px); }
</style>
