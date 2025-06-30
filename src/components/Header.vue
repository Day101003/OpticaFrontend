<template>
  <header class="site-header position-fixed top-0 w-100 z-3 bg-light shadow-sm">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid px-3">
        <!-- LOGO -->
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img src="../assets/images/logo1.png" alt="Logo" height="60" class="me-2" />
        </router-link>

        <!-- BOTÓN HAMBURGUESA -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- MENÚ RESPONSIVE -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase align-items-center">
            <li class="nav-item">
              <router-link class="nav-link me-3" to="/">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link me-3" to="/shop">Tienda</router-link>
            </li>
            <!-- BOTÓN ADMINISTRADOR SOLO PARA ADMIN -->
            <li v-if="isAdmin" class="nav-item">
              <router-link class="nav-link me-3" to="/admin">Administrador</router-link>
            </li>
            <!-- 🔐 Login o Perfil -->
            <li v-if="!loggedIn" class="nav-item">
              <router-link to="/login" class="btn btn-outline-dark ms-2">Ingresar</router-link>
            </li>
            <li v-else class="nav-item dropdown">
              <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                <img :src="userImage" alt="Perfil" class="rounded-circle me-2" width="32" height="32" />
                {{ userData.name || 'Usuario' }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li class="dropdown-item text-muted">{{ userData.email || 'Sin correo' }}</li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item text-danger" @click="logout">Cerrar sesión</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../axios';
import { getToken, removeToken, getUser } from '../utils/auth';
import eventBus from '../utils/eventBus';
import { useRouter } from 'vue-router';

const router = useRouter();
const loggedIn = ref(false);
const isAdmin = ref(false);
const userData = ref({});
const userImage = ref('/assets/img/FotoPerfil/default.jpg');

// Función reutilizable
const loadUserData = async () => {
  const user = getUser();
  if (!user || !user.id) {
    console.log('No user or user ID found');
    loggedIn.value = false;
    removeToken();
    return;
  }

  try {
    loggedIn.value = true;
    userData.value = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    isAdmin.value = user.role === 'Admin';

    const response = await axios.get(`http://localhost:5282/api/users/${user.id}`);
    const userFromApi = response.data;
    userImage.value = '/' + userFromApi.imagePath.replace(/\\/g, '/');
  } catch (e) {
    console.error('[ERROR] Error al obtener datos del usuario:', e);
    loggedIn.value = false;
    removeToken();
    userData.value = {};
    userImage.value = '/assets/img/FotoPerfil/default.jpg';
  }
};

// Inicialización
onMounted(() => {
  loadUserData();
});

// Escucha eventos desde login o logout
eventBus.on('authChanged', () => {
  loadUserData();
});

const logout = () => {
  removeToken();
  loggedIn.value = false;
  isAdmin.value = false;
  userData.value = {};
  userImage.value = '/assets/img/FotoPerfil/default.jpg';
  eventBus.emit('authChanged');
  router.push('/');
};
</script>

<style scoped>

.site-header {
  z-index: 1030 !important; 
}

img.rounded-circle {
  object-fit: cover;
}

.navbar-brand img {
  max-height: none;
}

@media (max-width: 991px) {
  .navbar-collapse {
    background-color: #f8f9fa; /* fondo del menú desplegado en móvil */
    padding: 1rem;
  }
}
</style>
