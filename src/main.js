import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';

// 👇 REGISTRA los módulos globalmente aquí
SwiperCore.use([Navigation, Pagination, Autoplay]);

// CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/vendor.css';
import './assets/css/Admin/bootstrap.min.css';
import './assets/css/Admin/dark-theme.css';
import './assets/css/Admin/icons.css';
import './assets/css/Admin/header-colors.css';
import './assets/css/Admin/pace.min.css';
import './assets/css/Admin/app.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);
app.use(router);
app.mount('#app');
