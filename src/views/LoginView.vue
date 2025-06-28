<template>
  <section class="login-section">
    <!-- Imagen de fondo -->
    <div
      class="bg-image"
      style="background-image: url('assets/img/Fondos/3.svg'); height: 300px;"
    ></div>

    <!-- Tarjeta del formulario -->
    <div class="card login-card">
      <div class="card-body">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <h2 class="title" style="color: black;">Iniciar sesión</h2>

            <form @submit.prevent="handleLogin">
              <!-- Correo -->
              <div class="form-group input-group mb-4">
                <span class="input-icon"><i class="fas fa-envelope"></i></span>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Correo electrónico"
                  required
                />
              </div>

              <!-- Contraseña -->
              <div class="form-group input-group mb-4">
                <span class="input-icon"><i class="fas fa-lock"></i></span>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Contraseña"
                  required
                />
              </div>

              <!-- Botón -->
              <button class="btn btn-submit w-100 mb-3" type="submit">Ingresar</button>

              <!-- Enlace a registro -->
              <p class="text-center link-text">
                ¿No tienes cuenta?
                <router-link to="/register" class="link">Regístrate</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import eventBus from '../utils/eventBus'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5282/api/auth/login', {
      email: email.value,
      password: password.value,
    })

    // Guardamos el token y el rol en localStorage
    localStorage.setItem('Token', response.data.token)
    localStorage.setItem('user_role', response.data.role)  // Guardar el rol también

    eventBus.emit('authChanged')  // Notificar a la app sobre el cambio de autenticación
    router.push('/')  // Redirigir a la página de inicio o donde sea necesario
  } catch (err) {
    alert('Credenciales inválidas')
    console.error(err)
  }
}
</script>

<style scoped>
.login-section {
  min-height: 100vh;
  background-color: var(--bg-color, #f5f5f5);
}

.bg-image {
  background-size: cover;
  background-position: center;
}

.login-card {
  margin-top: -100px;
  backdrop-filter: blur(20px);
  background-color: var(--card-bg, rgba(255, 255, 255, 0.75));
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
  background-color: var(--btn-hover-bg, #133e52);
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
  .login-card {
    margin: -80px 1rem 0 1rem;
    padding: 1.5rem;
  }
}
</style>
