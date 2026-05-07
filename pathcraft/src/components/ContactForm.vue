<template>
  <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
    <!-- Nom -->
    <div class="form-group" :class="{ 'has-error': errors.name }">
      <label class="form-label" for="name">// nom</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        class="form-input"
        placeholder="Votre nom"
        @input="clearError('name')"
      />
      <span class="form-error">Ce champ est requis.</span>
    </div>

    <!-- Email -->
    <div class="form-group" :class="{ 'has-error': errors.email }">
      <label class="form-label" for="email">// email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        class="form-input"
        placeholder="vous@exemple.com"
        @input="clearError('email')"
      />
      <span class="form-error">Email invalide.</span>
    </div>

    <!-- Message -->
    <div class="form-group" :class="{ 'has-error': errors.message }">
      <label class="form-label" for="message">// message</label>
      <textarea
        id="message"
        v-model="form.message"
        class="form-textarea"
        placeholder="Votre message…"
        @input="clearError('message')"
      />
      <span class="form-error">Ce champ est requis.</span>
    </div>

    <button type="submit" class="btn-primary" style="width:100%; text-align:center;">
      Envoyer →
    </button>

    <transition name="fade">
      <div v-if="submitted" class="form-success">
        ✓ Message envoyé ! Je vous recontacte rapidement.
      </div>
    </transition>
  </form>
</template>

<script>
export default {
  name: 'ContactForm',

  data() {
    return {
      form: { name: '', email: '', message: '' },
      errors: { name: false, email: false, message: false },
      submitted: false
    }
  },

  methods: {
    clearError(field) {
      this.errors[field] = false
    },

    validate() {
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      this.errors.name    = !this.form.name.trim()
      this.errors.email   = !emailReg.test(this.form.email)
      this.errors.message = !this.form.message.trim()
      return !Object.values(this.errors).some(Boolean)
    },

    async handleSubmit() {
  if (!this.validate()) return

  const response = await fetch('https://formspree.io/f/xjglozqz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      name:    this.form.name,
      email:   this.form.email,
      message: this.form.message
    })
  })

  if (response.ok) {
    this.submitted = true
    this.form = { name: '', email: '', message: '' }
    setTimeout(() => { this.submitted = false }, 5000)
  }
}
  }
}
</script>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group { display: flex; flex-direction: column; gap: 0.4rem; }

.form-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

.form-input,
.form-textarea {
  background: var(--bg3);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text);
  padding: 0.8rem 1rem;
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  transition: border-color 0.2s;
  outline: none;
  width: 100%;
}
.form-input:focus,
.form-textarea:focus  { border-color: var(--accent-bio); }
.form-textarea        { resize: vertical; min-height: 120px; }

.form-error {
  font-size: 0.75rem;
  color: #ff6b6b;
  font-family: var(--font-mono);
  display: none;
}
.has-error .form-error                     { display: block; }
.has-error .form-input,
.has-error .form-textarea                  { border-color: #ff6b6b; }

.form-success {
  background: rgba(0, 229, 160, 0.08);
  border: 1px solid rgba(0, 229, 160, 0.3);
  color: var(--accent-bio);
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
