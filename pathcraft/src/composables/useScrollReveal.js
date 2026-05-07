// composables/useScrollReveal.js
// Attaches IntersectionObserver to elements for scroll-triggered reveal

import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector = '.reveal') {
  let observer = null
  let mutationObserver = null
  const observedElements = new WeakSet()

  const observeRevealElements = () => {
    document.querySelectorAll(selector).forEach(el => {
      if (!observedElements.has(el)) {
        observer.observe(el)
        observedElements.add(el)
      }
    })
  }

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

    observeRevealElements()

    mutationObserver = new MutationObserver(() => {
      observeRevealElements()
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
    if (mutationObserver) mutationObserver.disconnect()
  })
}
