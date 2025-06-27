<template>
  <div id="app">
   <Header v-if="showHeaderFooter" />
    <router-view />
    <Footer v-if="$route.path === '/'" />

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
    Footer
  },
  computed: {
    showHeaderFooter() {
      return this.$route.path === '/' || this.$route.path.startsWith('/category/') ||
           this.$route.path === '/shop';  // <-- agregar esta línea 
    }
  }
};

</script>

<style>
body {
  padding-top: 0.1rem; /* mismo valor que el alto del navbar */
}
</style>
