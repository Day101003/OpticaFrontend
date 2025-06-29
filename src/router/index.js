import { createRouter, createWebHistory } from 'vue-router';

// Importar las vistas
import Home from '../views/Home.vue';
import Shop from '../views/Shop.vue';
import Admin from '../views/Admin.vue';
import AppointmentForm from '../views/AppointmentForm.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ProductsByCategory from '../views/ProductsByCategory.vue';
import AccessDenied from '../views/AccessDenied.vue'; // Nueva vista para acceso denegado
import ProductForm from '../views/ProductForm.vue';

// Función para decodificar el JWT usando atob()
function decodeJwt(token) {
  const base64Url = token.split('.')[1];  // Extraemos la parte del payload
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');  // Reemplazar base64url por base64
  const decoded = JSON.parse(atob(base64));  // Decodificamos y parseamos el JSON
  return decoded;
}

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('Token');
      if (!token) {
        return next({ name: 'login' });  // Redirigir a login si no hay token
      }

      try {
        // Decodificamos el token JWT usando la función manual
        const decoded = decodeJwt(token);

        // Verificamos el rol del usuario
        const role = localStorage.getItem('user_role');

        if (role !== 'Admin') {
          return next({ name: 'access-denied' });  // Redirigir a AccessDenied si no es Admin
        }

        next();  // Permitir el acceso si es Admin
      } catch (error) {
        console.error('Error al decodificar el token', error);
        next({ name: 'login' });  // Redirige a login si hay un error con el token
      }
    }
  },
  { path: '/appointment', component: AppointmentForm },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/category/:id',
    name: 'ProductsByCategory',
    component: ProductsByCategory
  },
  { path: '/access-denied', name: 'access-denied', component: AccessDenied },  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;