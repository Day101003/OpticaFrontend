import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Shop from '../views/Shop.vue';
import Admin from '../views/Admin.vue';
import AppointmentForm from '../views/AppointmentForm.vue';
import { Axios } from 'axios';

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/admin', component: Admin },
    { path: '/appointment', component: AppointmentForm},
      { path: '/axios', component: Axios},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
