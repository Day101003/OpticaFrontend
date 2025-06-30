<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card w-50">
      <div class="card-body p-4">
        <h5 class="card-title text-center">Iniciar Sesión</h5>
        <hr />
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Correo Electrónico</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail"
              v-model="form.email"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
          <div class="mb-3">
            <label for="inputPassword" class="form-label">Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              v-model="form.password"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
          <p v-if="error" class="text-danger mt-3">{{ error }}</p>
          <p class="mt-3 text-center">
            ¿No tienes una cuenta? <router-link to="/register">Regístrate</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
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

@media (max-width: 576px) {
  .login-card {
    margin: -80px 1rem 0 1rem;
    padding: 1.5rem;
  }
}
</style>