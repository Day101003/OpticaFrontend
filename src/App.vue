<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';

import './assets/css/vendor.css';
import './assets/css/bootstrap.min.css';
import './assets/css/Admin/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';



export default {
  components: {
    Header,
  },
};
</script>

<style>
/* Estilos globales aquí */
</style>
