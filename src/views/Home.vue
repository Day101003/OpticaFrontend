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
                   <a href="/appointment" class="btn btn-medium btn-dark text-uppercase btn-rounded-none">Agenda tu cita</a>

                  </div>
                </div>
                <div class="col-md-5">
                  <div class="image-holder">
                    <img :src="bannerImage" alt="banner">
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
          <div class="col-lg-3 col-md-6 pb-3" v-for="(service, index) in services" :key="index">
            <div class="icon-box d-flex">
              <div class="icon-box-icon pe-3 pb-3">
                <svg :class="service.icon">
                  <use :xlink:href="service.iconHref" />
                </svg>
              </div>
              <div class="icon-box-content">
                <h3 class="card-title text-uppercase text-dark">{{ service.title }}</h3>
                <p>{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="mobile-products" class="product-store position-relative padding-large no-padding-top">
      <div class="container">
        <div class="row">
          <div class="display-header d-flex justify-content-between pb-3">
            <h2 class="display-7 text-dark text-uppercase">Lentes</h2>
            <div class="btn-right">
              <a href="shop.html" class="btn btn-medium btn-normal text-uppercase">Go to Shop</a>
            </div>
          </div>
          <div class="swiper product-swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(product, index) in products" :key="index">
                <div class="product-card position-relative">
                  <div class="image-holder">
                    <img :src="product.image" alt="product-item" class="img-fluid">
                  </div>
                  <div class="cart-concern position-absolute">
                    <div class="cart-button d-flex">
                      <!-- Aquí puedes agregar botones de añadir al carrito -->
                    </div>
                  </div>
                  <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 class="card-title text-uppercase">
                      <a href="#">{{ product.title }}</a>
                    </h3>
                    <span class="item-price text-primary">{{ product.price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination position-absolute text-center"></div>
    </section>
  </div>
</template>

<script>
import bannerImage from '../assets/images/img1.webp';

export default {
  name: 'Home',
  data() {
    return {
      bannerImage,
      services: [
        {
          title: 'Ver más productos',
          description: 'Lentes de todo tipo',
          icon: 'cart-outline',
          iconHref: '#cart-outline'
        },
        {
          title: 'Paquetes visión',
          description: 'Mira todos los paquetes que tenemos para ti',
          icon: 'quality',
          iconHref: '#quality'
        },
        {
          title: '2x1',
          description: 'Escoge tu aro favorito con nosotros',
          icon: 'price-tag',
          iconHref: '#price-tag'
        },
        {
          title: '100% seguro con nuestra óptica',
          description: 'Puedes confiar en nosotros y en nuestro personal',
          icon: 'shield-plus',
          iconHref: '#shield-plus'
        }
      ],
      products: [
        {
          title: 'Lentes de sol',
          price: '$980',
          image: '../assets/images/lentes1.jpg'
        },
        {
          title: 'Lentes progresivos',
          price: '$1100',
          image: '../assets/images/lentes3.jpeg'
        },
        {
          title: 'Lentes 2x1',
          price: '$780',
          image: '../assets/images/lentes1.jpg'
        },
        {
          title: 'Lentes Grandes',
          price: '$1500',
          image: '../assets/images/lentes6.webp'
        },
        {
          title: 'Iphone 12',
          price: '$1300',
          image: '../assets/images/lentes1.jpg'
        }
      ]
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para Home.vue */
</style>
