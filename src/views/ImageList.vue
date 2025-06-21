<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Lista de Imágenes</h3>
      <button class="btn-create" @click="$emit('back-to-create')">Crear Nueva Imagen</button>
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      <div class="col" v-for="img in images" :key="img.id">
        <div class="card h-100 shadow-sm border-light position-relative">
          <img
            v-if="img.route"
            :src="`http://localhost:5282${img.route}`"
            class="card-img-top"
            alt="Imagen"
            style="max-height: 180px; object-fit: cover;"
          />
          <div class="overlay">
            <button class="btn btn-sm btn-outline-warning" @click="$emit('edit-image', img.id)">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteImage(img.id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ img.type }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'ImageList',
  data() {
    return {
      images: [],
    };
  },
  mounted() {
    this.loadImages();
  },
  methods: {
    async loadImages() {
      try {
        const response = await axios.get('/images');
        this.images = response.data;
      } catch (error) {
        console.error('Error cargando imágenes:', error);
      }
    },
    async deleteImage(id) {
      if (confirm('¿Está seguro que desea eliminar esta imagen?')) {
        try {
          await axios.delete(`/images/${id}`);
          this.loadImages();
        } catch (error) {
          console.error('Error eliminando imagen:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
.btn-create {
  background-color: #6aa0b8;
  border: none;
  color: white;
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 4px;
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
