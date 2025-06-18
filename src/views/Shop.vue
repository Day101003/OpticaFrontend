<template>
  <div>
    <h1>Tienda</h1>
    <section id="mobile-products" class="product-store position-relative padding-large no-padding-top">
      <div class="container">
        <div class="row">
          <div class="display-header d-flex justify-content-between pb-3">
            <h2 class="display-7 text-dark text-uppercase">Lentes</h2>
            <div class="btn-right">
              <router-link to="/" class="btn btn-medium btn-normal text-uppercase">Regresar</router-link>
            </div>
          </div>
          <div class="swiper product-swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="product-card position-relative">
                  <div class="image-holder">
                    <img :src="lentesImage" alt="Lentes de sol" class="img-fluid"> <!-- Usando variable para la imagen -->
                  </div>
                  <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 class="card-title text-uppercase">
                      <a href="#">Lentes de sol</a>
                    </h3>
                    <span class="item-price text-primary">$980</span>
                  </div>
                </div>
              </div>
              <!-- Agrega más productos aquí -->
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination position-absolute text-center"></div>
    </section>
  </div>
</template>

<script>
import lentesImage from '../assets/images/lentes1.jpg'; // Cambia la ruta aquí

export default {
  name: 'Shop',
  data() {
    return {
      lentesImage, // Definimos la variable para la imagen
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para Shop.vue */
</style>
