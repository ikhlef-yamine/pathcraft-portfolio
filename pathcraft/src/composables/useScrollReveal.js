// composables/useScrollReveal.js
// Attaches IntersectionObserver to elements for scroll-triggered reveal

import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector = '.reveal') {
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll(selector).forEach(el => observer.observe(el))
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
