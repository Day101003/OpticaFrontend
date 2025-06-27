<template>
  <div class="container">
    <div class="d-flex justify-between align-items-center flex-wrap gap-3 mb-4">
      <router-link to="/nuevo-producto" class="btn btn-primary">
        <i class="bx bxs-plus-square"></i> Nuevo Producto
      </router-link>
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100 shadow-sm border-light position-relative">
          <img
            v-if="product.images && product.images.route"
            :src="`http://localhost:5282${product.images.route}`"
            class="card-img-top"
            alt="Imagen del producto"
          />
          <div class="overlay">
            <button class="btn btn-sm btn-outline-warning" @click="editProduct(product.id)">
           <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteProduct(product.id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text text-muted mb-1">Código: {{ product.code }}</p>
            <p class="card-text text-muted mb-1">₡{{ product.price.toFixed(2) }}</p>
            <span class="product-badge mx-auto" :class="product.isActive ? 'bg-success' : 'bg-secondary'">
                  {{ product.isActive ? 'Activo' : 'No activo' }}
                </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        const response = await axios.get('/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error al cargar productos:', error);
        alert('Error al cargar los productos.');
      }
    },
    editProduct(id) {
      this.$emit('edit-product', id);
    },
    async deleteProduct(id) {
      const confirmacion = confirm('¿Está seguro de que desea eliminar este producto?');
      if (!confirmacion) return;

      try {
        await axios.delete(`/products/${id}`);
        alert('Producto eliminado correctamente');
        this.loadProducts();
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Ocurrió un error al eliminar el producto.');
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
}

.card {
  transition: transform 0.2s;
  position: relative;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  max-height: 180px;
  object-fit: cover;
  background-color: #f9f9f9;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  background-color: rgba(255, 255, 255, 0.8); 
}

.card:hover .overlay {
  opacity: 1; 
}

.btn {
  margin: 0 5px; 
  font-size: 0.8rem;
}
</style>
