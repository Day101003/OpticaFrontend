<template>
  <section class="login-section">
    <!-- Imagen de fondo -->
    <div
      class="bg-image"
      style="background-image: url('assets/img/Fondos/3.svg'); height: 300px;"
    ></div>

    <!-- Tarjeta del formulario -->
    <div class="card register-card">
      <div class="card-body">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <h2 class="title" style="color: black;">Crear cuenta</h2>

            <form @submit.prevent="handleRegister">
              <!-- Nombre -->
              <div class="form-group input-group mb-4">
                <span class="input-icon"><i class="fas fa-user"></i></span>
                <input
                  type="text"
                  v-model="form.name"
                  class="form-control"
                  placeholder="Nombre completo"
                  required
                />
              </div>

              <!-- Correo -->
              <div class="form-group input-group mb-4">
                <span class="input-icon"><i class="fas fa-envelope"></i></span>
                <input
                  type="email"
                  v-model="form.email"
                  class="form-control"
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              <!-- Teléfono -->
              <div class="form-group input-group mb-4">
                <span class="input-icon"><i class="fas fa-phone"></i></span>
                <input
                  type="tel"
                  v-model="form.phone"
                  class="form-control"
                  placeholder="8888-8888"
                  required
                  pattern="[0-9]{4}-[0-9]{4}"
                />
              </div>

              <!-- Contraseña -->
              <div class="form-group input-group mb-4">
                <span class="input-icon"><i class="fas fa-lock"></i></span>
                <input
                  type="password"
                  v-model="form.password"
                  class="form-control"
                  placeholder="Contraseña segura"
                  required
                  minlength="6"
                />
              </div>

              <button class="btn btn-submit w-100 mb-3" type="submit">Registrarse</button>

              <p v-if="error" class="text-danger text-center">{{ error }}</p>

              <!-- Enlace a login -->
              <p class="text-center link-text">
                ¿Ya tienes cuenta?
                <router-link to="/login" class="link">Inicia sesión</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import eventBus from '../utils/eventBus'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: ''
})
const error = ref('')
const router = useRouter()

const handleRegister = async () => {
  error.value = ''
  try {
    const response = await axios.post('http://localhost:5282/api/auth/register', {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password
    })

    localStorage.setItem('Token', response.data.token)
    eventBus.emit('authChanged')

    // Limpiar formulario
    form.name = ''
    form.email = ''
    form.phone = ''
    form.password = ''

    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Error inesperado al registrar'
    console.error(err)
  }
}
</script>

<style scoped>
/* Mismo CSS que ya tienes, sin cambios */
.register-section {
  min-height: 100vh;
  background-color: var(--bg-color, #f5f5f5);
}

.bg-image {
  background-size: cover;
  background-position: center;
}

.register-card {
  margin-top: -100px;
  backdrop-filter: blur(20px);
  background-color: var(--card-bg, rgba(255,255,255,0.75));
  border-radius: 1rem;
  box-shadow: var(--card-shadow, 0 0 20px rgba(0, 0, 0, 0.1));
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
}

.card-body {
  padding: 0;
}

.title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--primary-color, #050505);
  text-align: center;
}

.input-group {
  display: flex;
  align-items: center;
  border: 1px solid var(--input-border, #ccc);
  border-radius: 0.25rem;
  background-color: var(--input-bg, #fff);
  padding: 0.5rem;
  transition: border-color 0.3s;
}

.input-group:focus-within {
  border-color: var(--primary-color, #007bff);
  box-shadow: 0 0 8px var(--primary-color, #007bff);
}

.input-icon {
  padding: 0 0.75rem;
  color: var(--primary-color, #007bff);
  font-size: 1.1rem;
}

.form-control {
  border: none;
  outline: none;
  flex: 1;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  background-color: transparent;
}

.btn-submit {
  background-color: var(--btn-bg, #245e79);
  border: none;
  color: var(--btn-color, white);
  padding: 0.75rem;
  font-size: 1.1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 600;
}

.btn-submit:hover {
  background-color: var(--btn-hover-bg, #7a9fb0);
}

.text-center {
  text-align: center;
}

.link-text {
  font-size: 0.95rem;
  color: var(--text-color, #333);
}

.link {
  color: var(--primary-color, #007bff);
  font-weight: 600;
  text-decoration: none;
  margin-left: 0.3rem;
}

.link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 576px) {
  .register-card {
    margin: -80px 1rem 0 1rem;
    padding: 1.5rem;
  }
}

.text-danger {
  color: #dc3545;
  margin-top: 0.5rem;
}
</style>
