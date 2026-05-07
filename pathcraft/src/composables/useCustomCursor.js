// composables/useCustomCursor.js
// Tracks mouse position and provides reactive cursor/ring styles

import { ref, reactive, onMounted, onUnmounted } from 'vue'

export function useCustomCursor() {
  const mx = ref(0)
  const my = ref(0)
  const rx = ref(0)
  const ry = ref(0)
  let animId = null

  const cursorStyle = reactive({ left: '0px', top: '0px' })
  const ringStyle   = reactive({ left: '0px', top: '0px', width: '36px', height: '36px' })

  function onMouseMove(e) {
    mx.value = e.clientX
    my.value = e.clientY
    cursorStyle.left = e.clientX + 'px'
    cursorStyle.top  = e.clientY + 'px'
  }

  function animateRing() {
    rx.value += (mx.value - rx.value) * 0.12
    ry.value += (my.value - ry.value) * 0.12
    ringStyle.left = rx.value + 'px'
    ringStyle.top  = ry.value + 'px'
    animId = requestAnimationFrame(animateRing)
  }

  function onEnterInteractive() {
    cursorStyle.transform = 'translate(-50%,-50%) scale(2)'
    ringStyle.width  = '60px'
    ringStyle.height = '60px'
  }

  function onLeaveInteractive() {
    cursorStyle.transform = 'translate(-50%,-50%) scale(1)'
    ringStyle.width  = '36px'
    ringStyle.height = '36px'
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    animateRing()

    // Delegate hover to interactive elements
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, button, .project-card, .skill-card')) onEnterInteractive()
    })
    document.addEventListener('mouseout', e => {
      if (e.target.closest('a, button, .project-card, .skill-card')) onLeaveInteractive()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    if (animId) cancelAnimationFrame(animId)
  })

  return { cursorStyle, ringStyle }
}
