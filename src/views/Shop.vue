<template>
  <div class="shop-page py-5">
    <div class="container">
      <div v-if="products.length === 0" class="text-center text-muted py-5">
        <p class="fs-4">😔 No hay productos disponibles en este momento.</p>
      </div>

      <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <div class="col" v-for="product in products" :key="product.id">
          <div class="product-card position-relative">
            <div class="image-container">
              <img
                v-if="product.images && product.images.route"
                :src="`http://localhost:5282${product.images.route}`"
                class="card-img-top"
                alt="Imagen del producto"
              />
              <div class="icon-overlay">
                <button class="icon-btn" @click="toggleFavorite(product)">
                  <i :class="isFavorite(product) ? 'fas fa-heart text-danger' : 'far fa-heart text-secondary'"></i>
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
        </div>
      </div>

      <!-- MODAL DE DETALLES -->
      <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content position-relative">
            <button class="favorite-icon" @click="toggleFavorite(selectedProduct)">
              <i :class="isFavorite(selectedProduct) ? 'fas fa-heart text-danger' : 'far fa-heart text-secondary'"></i>
            </button>
            <div class="modal-header">
              <h5 class="modal-title">{{ selectedProduct?.name }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body" v-if="selectedProduct">
              <div class="row">
                <div class="col-md-5 d-flex align-items-center justify-content-center mb-3 mb-md-0">
                  <img
                    v-if="selectedProduct.images?.route"
                    :src="`http://localhost:5282${selectedProduct.images.route}`"
                    class="img-fluid zoomable-image"
                    alt="Imagen del producto"
                  />
                </div>
                <div class="col-md-7">
                  <p><strong>Descripción:</strong> {{ selectedProduct.description || 'Sin descripción' }}</p>
                  <p><strong>Precio:</strong> ₡{{ selectedProduct.price?.toFixed(2) }}</p>
                  <p><strong>Código:</strong> {{ selectedProduct.code }}</p>
                  <p><strong>Estado:</strong>
                    <span :class="selectedProduct.isActive ? 'text-success' : 'text-danger'">
                      {{ selectedProduct.isActive ? 'Activo' : 'No activo' }}
                    </span>
                  </p>
                  <p><strong>Categoría:</strong> {{ selectedProduct.categories?.name || 'Sin categoría' }}</p>
                  <a
                    :href="`https://wa.me/50684481408?text=Hola,%20estoy%20interesado%20en%20el%20producto%20${encodeURIComponent(selectedProduct.name)}`"
                    target="_blank"
                    class="btn btn-success mt-3"
                  >
                    <i class="fab fa-whatsapp me-2"></i> Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from 'bootstrap/js/dist/modal';

export default {
  name: 'Shop',
  data() {
    return {
      products: [],
      selectedProduct: null,
      favoriteProducts: new Set()
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:5282/api/products');
      this.products = response.data;
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  },
  methods: {
    showProductDetails(product) {
      this.selectedProduct = product;
      this.$nextTick(() => {
        const modal = new Modal(document.getElementById('productModal'));
        modal.show();
      });
    },
    toggleFavorite(product) {
      if (!product) return;
      if (this.favoriteProducts.has(product.id)) {
        this.favoriteProducts.delete(product.id);
      } else {
        this.favoriteProducts.add(product.id);
      }
    },
    isFavorite(product) {
      if (!product) return false;
      return this.favoriteProducts.has(product.id);
    }
  }
};
</script>

<style scoped>
@import 'swiper/swiper-bundle.css'; /* si usas swiper en el proyecto */

.shop-page {
  background-color: #f9f9f9;
}

/* Usa estilos copiados y adaptados de Home.vue para product-card */

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
  position: relative;
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
  position: relative;
  overflow: hidden;
}

.image-container img {
  max-height: 100%;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .image-container img {
  transform: scale(1.05);
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
  color: #256f7c;
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

.bg-success {
  background-color: #38a169 !important;
}

.bg-secondary {
  background-color: #718096 !important;
}

.icon-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.product-card:hover .icon-overlay {
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  transform: scale(1.1);
  background-color: #f0f0f0;
}

.icon-btn i {
  font-size: 16px;
  color: #444;
}

/* Modal detalles */

.zoomable-image {
  transition: transform 0.3s ease;
  cursor: zoom-in;
}

.zoomable-image:hover {
  transform: scale(1.1);
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #247375;
  text-align: center;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.modal-title:hover {
  color: #2a6a7a;
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  font-size: 1.2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 20;
  transition: transform 0.2s ease;
}

.favorite-icon:hover {
  transform: scale(1.1);
}

.favorite-icon i {
  color: #dc3545;
}

</style>
