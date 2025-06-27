<template>
  <div>
    <div class="container mt-5">
      <section id="billboard" class="position-relative overflow-hidden bg-light-blue">
        <swiper :loop="true" :autoplay="{ delay: 5000, disableOnInteraction: false }" pagination navigation
          class="main-swiper">
          <swiper-slide v-for="(img, index) in bannerImages" :key="index">
            <img :src="img" alt="Banner Imagen" class="banner-image" />
          </swiper-slide>
        </swiper>

        <!-- Botón fijo sobre el carrusel -->


        <div class="banner-button-container">
          <a href="/appointment" class="btn btn-medium  text-uppercase btn-rounded-none">
            Agenda tu cita
          </a>
        </div>
      </section>
    </div>

    <!-- Servicios de la empresa -->
    <section id="company-services" class="padding-large">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 pb-3" v-for="(service, index) in services" :key="index">
            <div class="card h-100 shadow-sm text-center p-4 border-0 service-card"
              :class="`pastel-${(index % 4) + 1}`">
              <div class="mb-3">
                <svg :class="service.icon" class="service-icon">
                  <use :xlink:href="service.iconHref" />
                </svg>
              </div>
              <h3 class="h5 text-dark text-uppercase mb-2">{{ service.title }}</h3>
              <p class="text-muted small">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Productos con Swiper -->
    <section id="productos-tarjetas" class="padding-large position-relative">
      <div class="container">
        <h2 class="display-7 text-dark text-uppercase">Lentes</h2>
        <swiper @swiper="onSwiperProductos" :slides-per-view="3" :space-between="20" :loop="true"
          :autoplay="{ delay: 3000 }" :navigation="{
            nextEl: '.productos-button-next',
            prevEl: '.productos-button-prev'
          }" pagination :breakpoints="{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }">
          <swiper-slide v-for="product in products" :key="product.id">
            <div class="product-card position-relative">
              <div class="image-container">
                <img v-if="product.images && product.images.route" :src="`http://localhost:5282${product.images.route}`"
                  class="card-img-top" alt="Imagen del producto" />
                <div class="icon-overlay">
                  <button class="icon-btn">
                    <i class="fas fa-heart"></i>
                  </button>

                  <button class="icon-btn" @click="showProductDetails(product)">
                    <i class="fas fa-eye"></i>
                  </button>
                </div>
              </div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title" style="text-align: center;">{{ product.name }}</h5>
                <p class="card-text text-muted mb-1">Código: {{ product.code }}</p>
                <p class="card-text text-muted mb-1">₡{{ product.price.toFixed(2) }}</p>
                <span class="product-badge mx-auto" :class="product.isActive ? 'bg-success' : 'bg-secondary'">
                  {{ product.isActive ? 'Activo' : 'No activo' }}
                </span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="productos-button-prev custom-swiper-nav">
          <svg width="24" height="24" fill="currentColor">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </div>
        <div class="productos-button-next custom-swiper-nav">
          <svg width="24" height="24" fill="currentColor">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>

      <!-- MODAL DE DETALLES -->
      <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ selectedProduct?.name }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body" v-if="selectedProduct">
              <img v-if="selectedProduct.images?.route" :src="`http://localhost:5282${selectedProduct.images.route}`"
                class="img-fluid mb-3 modal-img" />
              <p><strong>Descripción:</strong> {{ selectedProduct.description }}</p>
              <p><strong>Precio:</strong> ₡{{ selectedProduct.price?.toFixed(2) }}</p>
              <p><strong>Código:</strong> {{ selectedProduct.code }}</p>
              <p><strong>Estado:</strong>
                <span :class="selectedProduct.isActive ? 'text-success' : 'text-danger'">
                  {{ selectedProduct.isActive ? 'Activo' : 'No activo' }}
                </span>
              </p>
              <p><strong>Categoría:</strong> {{ selectedProduct.categories?.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Categorías con Swiper -->
    <section id="categorias-tarjetas" class="padding-large position-relative">
      <div class="container">
        <h2 class="display-7 text-dark text-uppercase">Categorías</h2>
        <swiper @swiper="onSwiperCategorias" :slides-per-view="2" :space-between="20" :loop="true"
          :autoplay="{ delay: 2500 }" :breakpoints="{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }" :navigation="{
            nextEl: '.categorias-button-next',
            prevEl: '.categorias-button-prev'
          }" pagination>
          <swiper-slide v-for="category in categories" :key="category.id">
            <div class="category-card position-relative">
              <img v-if="category.route" :src="`http://localhost:5282${category.route}`" class="card-img-top"
                alt="Imagen de la categoría" />
              <div class="card-body text-center">
                <h5 class="card-title text-dark">{{ category.name }}</h5>
              </div>
              <div class="icon-overlay">
                <button class="icon-btn"><i class="fas fa-heart"></i></button>
                <router-link :to="`/category/${category.id}`" class="icon-btn">
                  <i class="fas fa-eye"></i>
                </router-link>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="categorias-button-prev custom-swiper-nav">
          <svg width="24" height="24" fill="currentColor">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </div>
        <div class="categorias-button-next custom-swiper-nav">
          <svg width="24" height="24" fill="currentColor">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Modal from 'bootstrap/js/dist/modal'; 

export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      bannerImages: [
        'assets/img/Fondos/1.svg',
        'assets/img/Fondos/2.svg'
      ],
      services: [
        { title: 'Ver más productos', description: 'Lentes de todo tipo', icon: 'cart-outline', iconHref: '#cart-outline' },
        { title: 'Paquetes visión', description: 'Mira todos los paquetes que tenemos para ti', icon: 'quality', iconHref: '#quality' },
        { title: '2x1', description: 'Escoge tu aro favorito con nosotros', icon: 'price-tag', iconHref: '#price-tag' },
        { title: '100% seguro con nuestra óptica', description: 'Puedes confiar en nosotros y en nuestro personal', icon: 'shield-plus', iconHref: '#shield-plus' }
      ],
      products: [],
      categories: [],
      swiperProductos: null,
      swiperCategorias: null,
      selectedProduct: null
    };
  },
  mounted() {
    this.loadProducts();
    this.loadCategories();
  },
  beforeUnmount() {
    if (this.swiperProductos) this.swiperProductos.destroy(true, true);
    if (this.swiperCategorias) this.swiperCategorias.destroy(true, true);
  },
  methods: {
    async loadProducts() {
      try {
        const res = await axios.get('http://localhost:5282/api/products');
        this.products = res.data;
      } catch (err) {
        console.error('Error al cargar los productos:', err);
      }
    },
    async loadCategories() {
      try {
        const res = await axios.get('http://localhost:5282/api/categories');
        this.categories = res.data;
      } catch (err) {
        console.error('Error al cargar las categorías:', err);
      }
    },
    onSwiperProductos(swiper) {
      this.swiperProductos = swiper;
    },
    onSwiperCategorias(swiper) {
      this.swiperCategorias = swiper;
    },
    showProductDetails(product) {
      this.selectedProduct = product;
      const modal = new Modal(document.getElementById('productModal'));
      modal.show();
    }
  }
};
</script>


<style scoped>
@import 'swiper/swiper-bundle.css';

/* Banner */
#billboard {
  height: 500px;
  position: relative;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-button-container {
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  z-index: 20;
}

.banner-button-container .btn {
  background-color: #14409e;
  color: white;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.banner-button-container .btn:hover {
  background-color: #133e52;
}

/* Navegación Swiper */
.swiper-button-next,
.swiper-button-prev {
  color: rgb(4, 3, 28);
  top: 50%;
  transform: translateY(-50%);
  z-index: 15;
}

.swiper-pagination-bullet {
  background: white;
  opacity: 0.7;
  z-index: 15;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  z-index: 15;
}

.custom-swiper-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-swiper-nav:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.productos-button-prev,
.categorias-button-prev {
  left: 15px;
}

.productos-button-next,
.categorias-button-next {
  right: 15px;
}

/* Productos */
.product-card {
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(145deg, #f5f9ff, #ffffff);
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 98, 168, 0.15);
  border-color: #0062a8;
}

.image-container {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ecf3f8;
}

.image-container img {
  max-height: 100%;
  width: auto;
  object-fit: contain;
}

.card-body {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #14409e;
  margin-bottom: 0.3rem;
  text-align: center;
}

.card-text {
  font-size: 0.9rem;
  color: #555;
  text-align: center;
}

.product-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  font-size: 0.85rem;
  border-radius: 999px;
  color: white;
  font-weight: 600;
  margin-top: 0.5rem;
}

/* Íconos superpuestos */
.icon-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .icon-overlay,
.category-card:hover .icon-overlay {
  opacity: 1;
}

.icon-btn {
  background-color: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.2s;
}

.icon-btn:hover {
  transform: scale(1.1);
  background-color: #f0f0f0;
}

.icon-btn i {
  font-size: 16px;
  color: #444;
}

/* Categorías */
.category-card {
  height: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.category-card img {
  height: 180px;
  width: 100%;
  object-fit: contain;
  background-color: #ecf3f8;

  display: block;
}

.category-card .card-body {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.category-card .card-title {
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #14409e;
}

/* Servicios */
.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  background-color: #fff;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 50px;
  height: 50px;
  fill: #0d6efd;
}

/* Paleta pastel */
.pastel-1 {
  background-color: #6dd0a7;
}

.pastel-2 {
  background-color: #38b5b2;
}

.pastel-3 {
  background-color: #6dd0a7;
}

.pastel-4 {
  background-color: #38b5b2;
}

/* Ajuste de botón en banner */
.banner-button-container {
  position: absolute;
  top: 430px;
  left: 270px;
  z-index: 5;
}

/*Modal detalles*/
.modal-img {
  max-width: 300px;
  width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
