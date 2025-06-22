<template>
  <div class="login-page container d-flex align-items-center justify-content-center">
    <div class="login-card shadow rounded p-4 bg-white">
      <h2 class="text-center mb-4">Iniciar sesión</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group mb-3">
          <label class="form-label">Correo electrónico</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div class="form-group mb-3">
          <label class="form-label">Contraseña</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="********"
            required
          />
        </div>

        <button class="btn btn-primary w-100" type="submit">Ingresar</button>

        <p class="mt-3 text-center">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-decoration-none">Regístrate</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import eventBus from '../utils/eventBus' // ✅ Importar eventBus

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5282/api/auth/login', {
      email: email.value,
      password: password.value
    })

    localStorage.setItem('Token', response.data.token)
    eventBus.emit('authChanged') // ✅ Notificar al Header.vue

    router.push('/')
  } catch (err) {
    alert('Credenciales inválidas')
    console.error(err)
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  padding-top: 80px; /* Ajusta según la altura de tu header */
  background: #f8f9fa;
}

.login-card {
  width: 100%;
  max-width: 400px;
}
</style>
