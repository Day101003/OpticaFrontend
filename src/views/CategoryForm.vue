<template>
  <div class="card">
    <div class="card-body p-4">
      <h5 class="card-title">Agregar Nueva Categoría</h5>
      <hr />
      <div class="form-body mt-4">
        <div class="mb-3">
          <label for="inputCategoryName" class="form-label">Nombre de Categoría</label>
          <input type="text" class="form-control" id="inputCategoryName" v-model="categoryName" placeholder="Ingrese el nombre de la categoría" />
        </div>
        <div class="mb-3">
          <label for="image-upload-category" class="form-label">Imagen de la Categoría</label>
          <input id="image-upload-category" type="file" accept="image/*" @change="handleImageUpload" />
        </div>
       <div class="col-12 d-flex justify-content-between mt-3">
          <button type="button" class="btn btn-primary" @click="saveCategory">Guardar Categoría</button>
          <button type="button" class="btn btn-secondary" @click="$emit('view-categories')">Ver Categorías</button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'CategoryForm',
  data() {
    return {
      categoryName: '',
      categoryImage: null,
    };
  },
  methods: {
    handleImageUpload(event) {
      this.categoryImage = event.target.files[0];
    },
    async saveCategory() {
      if (!this.categoryName.trim()) {
        alert('El nombre de la categoría es obligatorio.');
        return;
      }

      const formData = new FormData();
      formData.append('name', this.categoryName);
      if (this.categoryImage) {
        formData.append('image', this.categoryImage);
      }

      try {
        await axios.post('/categories', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Categoría guardada exitosamente');
        this.categoryName = '';
        this.categoryImage = null;
        this.$emit('category-saved'); // Avisar al padre para mostrar lista
      } catch (error) {
        console.error('Error al guardar la categoría:', error);
        alert('Error al guardar la categoría.');
      }
    },
  },
};
</script>


<style scoped>
.list-container {
  margin: 20px 0;
}
.table th,
.table td {
  vertical-align: middle;
}
</style>