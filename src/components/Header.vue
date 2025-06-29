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
                {{ userData.name }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li class="dropdown-item text-muted">{{ userData.email }}</li>
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
import { ref, onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { useRouter } from 'vue-router'
import eventBus from '../utils/eventBus'

// helpers para token
const getToken = () => localStorage.getItem('Token')
const removeToken = () => localStorage.removeItem('Token')

const router = useRouter()
const loggedIn = ref(false)
const isAdmin = ref(false)  // Nueva variable para verificar si el usuario es admin
const userData = ref({})
const userImage = ref('/assets/img/FotoPerfil/default.jpg') // Imagen por defecto

// función reutilizable
const loadUserData = async () => {
  const token = getToken()
  if (!token) {
    loggedIn.value = false
    return
  }

  try {
    const decoded = jwtDecode(token)

    const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
    const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

    if (!id) throw new Error('Token sin ID')

    userData.value = { id, name, email }
    loggedIn.value = true

    // Verifica si el rol del usuario es "Admin"
    isAdmin.value = role === 'Admin'

    const response = await axios.get(`http://localhost:5282/api/users/${id}`)
    const user = response.data
    userImage.value = '/' + user.imagePath.replace(/\\/g, '/')

  } catch (e) {
    console.error('[ERROR] Token inválido o error al obtener imagen:', e)
    loggedIn.value = false
    removeToken()
  }
}

// inicialización
onMounted(() => {
  loadUserData()
})

// escucha eventos desde login o logout
eventBus.on('authChanged', () => {
  loadUserData()
})

const logout = () => {
  removeToken()
  loggedIn.value = false
  isAdmin.value = false  // Resetea el estado de admin al hacer logout
  userData.value = {}
  userImage.value = '/assets/img/FotoPerfil/default.jpg'
  eventBus.emit('authChanged')
  router.push('/')
}
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
