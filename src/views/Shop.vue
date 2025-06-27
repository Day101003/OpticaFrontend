<template>
  <div class="shop-page py-5">
    <div class="container mp-5">
     

      <div v-if="products.length === 0" class="text-center text-muted py-5">
        <p class="fs-4">😔 No hay productos disponibles en este momento.</p>
      </div>

      <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <div class="col" v-for="product in products" :key="product.id">
          <div class="card h-100 border-0 shadow-sm">
            <img
              v-if="product.images?.route"
              :src="`http://localhost:5282${product.images.route}`"
              class="card-img-top"
              alt="Imagen del producto"
              style="height: 200px; object-fit: cover;"
            />
            <div class="card-body text-center">
              <h5 class="card-title text-dark">{{ product.name }}</h5>
              <p class="text-muted mb-1">Código: {{ product.code }}</p>
              <p class="text-primary fw-bold">₡{{ product.price.toFixed(2) }}</p>
              <span class="badge" :class="product.isActive ? 'bg-success' : 'bg-secondary'">
                {{ product.isActive ? 'Activo' : 'No activo' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Shop',
  data() {
    return {
      products: []
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:5282/api/products');
      this.products = response.data;
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }
};
</script>

<style scoped>
body {
  padding-top:100px; 
}
.shop-page {
  background-color: #f9f9f9;
}

.card-title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>
