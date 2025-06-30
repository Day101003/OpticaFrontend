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
            <h5 class="card-title text-center">Iniciar Sesión</h5>
            <hr />
            <form @submit.prevent="handleLogin">
              <!-- Correo -->
              <div class="form-group input-group mb-4">
                <span class="input-icon"><i class="fas fa-envelope"></i></span>
                <input
                  type="email"
                  v-model="form.email"
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
                  v-model="form.password"
                  class="form-control"
                  placeholder="Contraseña"
                  required
                />
              </div>

              <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
              <p v-if="error" class="text-danger mt-3">{{ error }}</p>
              <p class="mt-3 text-center">
                ¿No tienes una cuenta?
                <router-link to="/register" class="link">Regístrate</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '../axios';
import { setToken } from '../utils/auth';
import eventBus from '../utils/eventBus';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('/auth/login', this.form);
        setToken(response.data.token);
        eventBus.emit('authChanged');
        this.error = '';
        this.form.email = '';
        this.form.password = '';
        this.router.push('/');
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al iniciar sesión';
        console.error(error);
      }
    }
  }
};
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

.card-title {
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
  display: flex;
  align-items: center;
}

.form-control {
  border: none;
  outline: none;
  flex: 1;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  background-color: transparent;
}

.btn-primary {
  background-color: var(--btn-bg, #245e79);
  border: none;
  color: var(--btn-color, white);
  padding: 0.75rem;
  font-size: 1.1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 600;
  width: 100%;
}

.btn-primary:hover {
  background-color: var(--btn-hover-bg, #133e52);
}

.text-center {
  text-align: center;
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

.text-danger {
  color: #dc3545;
}

@media (max-width: 576px) {
  .login-card {
    margin: -80px 1rem 0 1rem;
    padding: 1.5rem;
  }
}
</style>
