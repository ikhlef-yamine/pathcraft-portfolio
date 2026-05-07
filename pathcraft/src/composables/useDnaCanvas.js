// composables/useDnaCanvas.js
// Handles the animated DNA helix + particle network background

import { ref, onMounted, onUnmounted } from 'vue'

export function useDnaCanvas() {
  const canvasRef = ref(null)
  let animId = null
  let frame = 0

  const particles = []
  const N = 60

  function initParticles(w, h) {
    particles.length = 0
    for (let i = 0; i < N; i++) {
      particles.push({
        x:     Math.random() * w,
        y:     Math.random() * h,
        vx:    (Math.random() - 0.5) * 0.4,
        vy:    (Math.random() - 0.5) * 0.4,
        r:     Math.random() * 2.5 + 1,
        type:  Math.random() > 0.5 ? 'bio' : 'tech',
        phase: Math.random() * Math.PI * 2
      })
    }
  }

  function draw(canvas, ctx) {
    const { width: w, height: h } = canvas
    ctx.clearRect(0, 0, w, h)
    frame++

    // --- DNA Helix (right side) ---
    const helixX  = w * 0.88
    const helixH  = h * 0.88
    const helixY0 = h * 0.06
    const amp     = 38
    const steps   = 180

    for (let i = 0; i < steps - 1; i++) {
      const t1  = i / steps
      const t2  = (i + 1) / steps
      const ph1 = i * 0.18
      const ph2 = (i + 1) * 0.18
      const y1  = helixY0 + t1 * helixH
      const y2  = helixY0 + t2 * helixH

      const x1a = helixX + Math.sin(ph1 + frame * 0.01) * amp
      const x2a = helixX + Math.sin(ph2 + frame * 0.01) * amp
      const x1b = helixX - Math.sin(ph1 + frame * 0.01) * amp
      const x2b = helixX - Math.sin(ph2 + frame * 0.01) * amp

      // Strand A — bio
      ctx.beginPath()
      ctx.moveTo(x1a, y1)
      ctx.lineTo(x2a, y2)
      ctx.strokeStyle = 'rgba(0,229,160,0.6)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Strand B — tech
      ctx.beginPath()
      ctx.moveTo(x1b, y1)
      ctx.lineTo(x2b, y2)
      ctx.strokeStyle = 'rgba(61,154,255,0.6)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Rungs + dots every 12 steps
      if (i % 12 === 0) {
        ctx.beginPath()
        ctx.moveTo(x1a, y1)
        ctx.lineTo(x1b, y1)
        ctx.strokeStyle = 'rgba(255,255,255,0.18)'
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x1a, y1, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,229,160,0.85)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x1b, y1, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(61,154,255,0.85)'
        ctx.fill()
      }
    }

    // --- Particles ---
    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1

      const pulse = 0.5 + Math.sin(frame * 0.05 + p.phase) * 0.3
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = p.type === 'bio'
        ? `rgba(0,229,160,${pulse * 0.8})`
        : `rgba(61,154,255,${pulse * 0.8})`
      ctx.fill()
    })

    // --- Connections ---
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x
        const dy   = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.22
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(0,229,160,${alpha})`
          ctx.lineWidth   = 0.5
          ctx.stroke()
        }
      }
    }

    animId = requestAnimationFrame(() => draw(canvas, ctx))
  }

  function resize(canvas) {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    initParticles(canvas.width, canvas.height)
  }

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    resize(canvas)
    window.addEventListener('resize', () => resize(canvas))
    draw(canvas, ctx)
  })

  onUnmounted(() => {
    if (animId) cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  })

  return { canvasRef }
}
