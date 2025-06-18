<template>
  <div>
    <section id="billboard" class="position-relative overflow-hidden bg-light-blue">
      <div class="swiper main-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="container">
              <div class="row d-flex align-items-center">
                <div class="col-md-6">
                  <div class="banner-content">
                    <h1 class="display-2 text-uppercase text-dark pb-5">HAZTE EL EXAMEN GRATIS</h1>
                    <router-link to="/shop" class="btn btn-medium btn-dark text-uppercase btn-rounded-none">Agenda tu cita</router-link>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="image-holder">
                    <img :src="bannerImage" alt="banner" class="img-fluid"> <!-- Usando variable para la imagen -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="container">
              <div class="row d-flex flex-wrap align-items-center">
                <div class="col-md-6">
                  <div class="banner-content">
                    <h1 class="display-2 text-uppercase text-dark pb-5">APROVECHA NUESTRO 2X1</h1>
                    <router-link to="/shop" class="btn btn-medium btn-dark text-uppercase btn-rounded-none">Agenda tu cita</router-link>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="image-holder">
                    <img :src="bannerImage" alt="banner" class="img-fluid"> <!-- Usando variable para la imagen -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-icon swiper-arrow swiper-arrow-prev">
        <svg class="chevron-left">
          <use xlink:href="#chevron-left" />
        </svg>
      </div>
      <div class="swiper-icon swiper-arrow swiper-arrow-next">
        <svg class="chevron-right">
          <use xlink:href="#chevron-right" />
        </svg>
      </div>
    </section>
    <section id="company-services" class="padding-large">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 pb-3">
            <div class="icon-box d-flex">
              <div class="icon-box-icon pe-3 pb-3">
                <svg class="cart-outline">
                  <use xlink:href="#cart-outline" />
                </svg>
              </div>
              <div class="icon-box-content">
                <h3 class="card-title text-uppercase text-dark">Ver más productos</h3>
                <p>Lentes de todo tipo</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 pb-3">
            <div class="icon-box d-flex">
              <div class="icon-box-icon pe-3 pb-3">
                <svg class="quality">
                  <use xlink:href="#quality" />
                </svg>
              </div>
              <div class="icon-box-content">
                <h3 class="card-title text-uppercase text-dark">Paquetes visión</h3>
                <p>Mira todos los paquetes que tenemos para ti</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 pb-3">
            <div class="icon-box d-flex">
              <div class="icon-box-icon pe-3 pb-3">
                <svg class="price-tag">
                  <use xlink:href="#price-tag" />
                </svg>
              </div>
              <div class="icon-box-content">
                <h3 class="card-title text-uppercase text-dark">2x1</h3>
                <p>Escoge tu aro favorito con nosotros</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 pb-3">
            <div class="icon-box d-flex">
              <div class="icon-box-icon pe-3 pb-3">
                <svg class="shield-plus">
                  <use xlink:href="#shield-plus" />
                </svg>
              </div>
              <div class="icon-box-content">
                <h3 class="card-title text-uppercase text-dark">100% seguro con nuestra óptica</h3>
                <p>Puedes confiar en nosotros y en nuestro personal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Aquí puedes agregar más secciones como "mobile-products", "smart-watches", etc. -->
  </div>
</template>

<script>
import bannerImage from '../assets/images/img1.webp'; // Cambia la ruta aquí

export default {
  name: 'Home',
  data() {
    return {
      bannerImage, // Definimos la variable para la imagen del banner
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para Home.vue */
</style>
