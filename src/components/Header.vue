<template>
  <header id="header" class="site-header header-scrolled position-fixed text-black bg-light">
    <nav id="header-nav" class="navbar navbar-expand-lg px-3 mb-3">
      <div class="container-fluid">

        <button class="navbar-toggler d-flex d-lg-none order-3 p-2" type="button" data-bs-toggle="offcanvas"
          data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <svg class="navbar-icon">
            <use xlink:href="#navbar-icon"></use>
          </svg>
        </button>

        <div class="offcanvas offcanvas-end" tabindex="-1" id="bdNavbar" aria-labelledby="bdNavbarOffcanvasLabel">
          <div class="offcanvas-header px-4 pb-0">
            <a class="navbar-brand" href="/">
              <img src="../assets/images/main-logo.png" class="logo" alt="Logo">
            </a>
            <button type="button" class="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div class="offcanvas-body">
            <ul id="navbar" class="navbar-nav text-uppercase justify-content-end align-items-center flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link class="nav-link me-4 active" to="/">Inicio</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link me-4" to="/shop">Tienda</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link me-4" to="/admin">Administrador</router-link>
              </li>

              <!-- 🔐 Si NO está logueado -->
              <li v-if="!loggedIn" class="pe-3">
                <router-link to="/login" class="btn btn-outline-dark">Ingresar</router-link>
              </li>

              <!-- 👤 Si está logueado, muestra sección de perfil -->
              <li v-else class="nav-item dropdown pe-3">
                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button"
                  data-bs-toggle="dropdown">
                  <img :src="userImage" alt="Perfil" class="rounded-circle me-2" width="32" height="32" />
                  {{ userData.name }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li class="dropdown-item text-muted">{{ userData.email }}</li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item text-danger" @click="logout">Cerrar sesión</a></li>
                </ul>
              </li>

              <!-- Íconos adicionales -->
              <li class="nav-item">
                <div class="user-items ps-5">
                  <ul class="d-flex justify-content-end list-unstyled">
                    <li class="search-item pe-3">
                      <a href="#" class="search-button">
                        <svg class="search">
                          <use xlink:href="#search"></use>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
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

    if (!id) throw new Error('Token sin ID')

    userData.value = { id, name, email }
    loggedIn.value = true

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
  userData.value = {}
  userImage.value = '/assets/img/FotoPerfil/default.jpg'
  eventBus.emit('authChanged')
  router.push('/')
}
</script>

<style scoped>
img.rounded-circle {
  object-fit: cover;
}
</style>
