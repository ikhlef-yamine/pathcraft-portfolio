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

  function onInteractiveHover(e) {
    if (e.target.closest('a, button, .project-card, .skill-card')) onEnterInteractive()
  }

  function onInteractiveLeave(e) {
    if (e.target.closest('a, button, .project-card, .skill-card')) onLeaveInteractive()
  }

  function activateCursor() {
    if (animId) return
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onInteractiveHover)
    document.addEventListener('mouseout', onInteractiveLeave)
    animateRing()
  }

  function deactivateCursor() {
    window.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseover', onInteractiveHover)
    document.removeEventListener('mouseout', onInteractiveLeave)
    if (animId) {
      cancelAnimationFrame(animId)
      animId = null
    }
  }

  onMounted(() => {
    const mediaQuery = window.matchMedia('(min-width: 769px)')

    function handleMediaChange(event) {
      if (event.matches) activateCursor()
      else deactivateCursor()
    }

    if (mediaQuery.matches) activateCursor()
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange)
    } else {
      mediaQuery.addListener(handleMediaChange)
    }
  })

  onUnmounted(() => {
    deactivateCursor()
  })

  return { cursorStyle, ringStyle }
}
