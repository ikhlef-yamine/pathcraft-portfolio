<template>
  <footer class="app-footer">
    <p>© 2026 Yamine IKHLEF — Fait avec <span class="accent">♥</span> et beaucoup de café</p>
    <p>Bio → Code → <span class="accent">∞</span></p>
  </footer>
</template>

<script>
export default { name: 'AppFooter' }
</script>

<style scoped>
.app-footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border);
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.app-footer p {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
}
.accent { color: var(--accent-bio); }

@media (max-width: 768px) {
  .app-footer {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    padding: 1.5rem;
  }
}
</style>
