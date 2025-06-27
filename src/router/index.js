import { createRouter, createWebHistory } from 'vue-router';
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
  { path: '/admin', component: Admin },
  { path: '/appointment', component: AppointmentForm },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
  path: '/category/:id',
  name: 'ProductsByCategory',
  component: ProductsByCategory
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
