<template>
  <div class="register-page container d-flex align-items-center justify-content-center">
    <div class="register-card shadow rounded p-4 bg-white">
      <h2 class="text-center mb-4">Registro</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group mb-3">
          <label class="form-label">Nombre completo</label>
          <input
            type="text"
            v-model="name"
            class="form-control"
            placeholder="Juan Pérez"
            required
          />
        </div>

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
          <label class="form-label">Teléfono</label>
          <input
            type="tel"
            v-model="phone"
            class="form-control"
            placeholder="8888-8888"
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

        <button class="btn btn-success w-100" type="submit">Registrarse</button>

        <p class="mt-3 text-center">
          ¿Ya tienes cuenta?
          <router-link to="/login" class="text-decoration-none">Inicia sesión</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import eventBus from '../utils/eventBus'

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const router = useRouter()

const handleRegister = async () => {
  try {
    const response = await axios.post('http://localhost:5282/api/auth/register', {
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value
    })

    localStorage.setItem('Token', response.data.token)
    eventBus.emit('authChanged') // 🔔 Notifica al Header que hay sesión activa
    router.push('/')
  } catch (err) {
    alert('Error al registrar: ' + (err.response?.data || 'Error inesperado'))
    console.error(err)
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  padding-top: 80px; /* Ajusta según el tamaño del header */
  background-color: #f8f9fa;
}

.register-card {
  width: 100%;
  max-width: 450px;
}
</style>
