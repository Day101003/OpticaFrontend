<template>
  <div class="list-container">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Lista de Categorías</h3>
      <button class="btn-create" @click="$emit('back-to-create')">Crear Nueva Categoría</button>
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div class="col" v-for="category in categories" :key="category.id">
        <div class="card h-100 shadow-sm border-light position-relative">
          <img
            v-if="category.route"
            :src="`http://localhost:5282${category.route}`"
            class="card-img-top"
            alt="Imagen Categoría"
            style="max-height: 180px; object-fit: cover;"
          />
          <div class="overlay">
            <button class="btn btn-sm btn-outline-warning" @click="$emit('edit-category', category.id)">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteCategory(category.id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ category.name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'CategoryList',
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      try {
        const response = await axios.get('/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error cargando categorías:', error);
      }
    },
    async deleteCategory(id) {
      if (confirm('¿Está seguro que desea eliminar esta categoría?')) {
        try {
          await axios.delete(`/categories/${id}`);
          this.loadCategories();
        } catch (error) {
          console.error('Error eliminando categoría:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
.list-container {
  margin: 20px 0;
}

.btn-create {
  background-color: #6aa0b8;
  border: none;
  color: white;
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 4px;
}

.btn-create:hover {
  background-color: #6794c5;
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
  background-color: rgba(255, 255, 255, 0.333); 
}

.card:hover .overlay {
  opacity: 1; 
}

.btn {
  margin: 0 5px;
  font-size: 0.8rem;
}
</style>
