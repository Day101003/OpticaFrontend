// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { isLoggedIn, getUser } from '../utils/auth';
import Home from '../views/Home.vue';
import Shop from '../views/Shop.vue';
import Admin from '../views/Admin.vue';
import AppointmentForm from '../views/AppointmentForm.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ProductsByCategory from '../views/ProductsByCategory.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      console.log('Token en localStorage:', localStorage.getItem('token'));
      console.log('isLoggedIn:', isLoggedIn());
      if (!isLoggedIn()) {
        return next({ name: 'login' });
      }
      const user = getUser();
      console.log('Usuario decodificado:', user);
      if (!user || user.role !== 'Admin') {
        return next({ name: 'access-denied' });
      }
      next();
    },
  },
  {
    path: '/appointment/:id?',
    name: 'appointment',
    component: AppointmentForm,
    beforeEnter: (to, from, next) => {
      console.log('Token en localStorage:', localStorage.getItem('token'));
      console.log('isLoggedIn:', isLoggedIn());
      if (isLoggedIn()) {
        const user = getUser();
        console.log('Usuario decodificado:', user);
      }
      next();
    },
  },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/category/:id',
    name: 'ProductsByCategory',
    component: ProductsByCategory,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;