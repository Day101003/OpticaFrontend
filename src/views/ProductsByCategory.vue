<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4 text-uppercase">{{ categoryName }}</h2>

    <div v-if="products.length === 0" class="no-products-message">
      <p style="font-size: 2rem;">😕</p>
      <p> Actualmente no hay productos en esta categoría.</p>
      <p>Pero no te preocupes, pronto tendremos más disponibles para ti 😊</p>
      <router-link to="/" class="btn btn-dark mt-3">Volver al inicio</router-link>
    </div>

    <div v-else class="row justify-content-center g-4">
      <div class="col-sm-6 col-md-4 col-lg-3" v-for="product in products" :key="product.id">
        <div class="card product-card shadow-sm border-light h-100">
          <img
            v-if="product.images?.route"
            :src="`http://localhost:5282${product.images.route}`"
            class="card-img-top product-img"
            alt="Imagen del producto"
          />
          <div class="card-body text-center d-flex flex-column justify-content-between">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text fw-bold text-primary">₡{{ product.price.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductsByCategory',
  data() {
    return {
      products: [],
      categoryName: ''
    };
  },
  async mounted() {
    const categoryId = this.$route.params.id;
    try {
      const response = await axios.get(`http://localhost:5282/api/categories/${categoryId}/products`);
      this.products = response.data.products;
      this.categoryName = response.data.categoryName;
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  }
};
</script>

<!-- Sin scoped para que se aplique global -->
<style scoped>

body {
  padding-top:100px; 
}

.container.mt-5 {
  margin-top: 2rem;
  position: relative;
  z-index: 1;
}

.no-products-message {
  text-align: center;
  margin: 80px 0;
  padding: 20px;
  color: #555;
  font-size: 1.2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
}

.product-card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.product-img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  padding: 10px;
  background-color: #fff;
  transition: transform 0.3s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}
</style>
