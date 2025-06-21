<template>
  <div class="card">
    <div class="card-body p-4">
      <h5 class="card-title">Editar Categoría</h5>
      <hr />
      <div class="form-body mt-4">
        <div class="mb-3">
          <label for="inputCategoryName" class="form-label">Nombre de Categoría</label>
          <input
            type="text"
            class="form-control"
            id="inputCategoryName"
            v-model="categoryName"
            placeholder="Ingrese el nombre de la categoría"
          />
        </div>
        <div class="mb-3">
          <label for="image-upload-category" class="form-label">Imagen de la Categoría</label>
          <input id="image-upload-category" type="file" accept="image/*" @change="handleImageUpload" />
        </div>
        <div v-if="currentImageUrl" class="mb-3">
          <p>Imagen actual:</p>
          <img :src="currentImageUrl" alt="Imagen categoría" style="width: 150px; height: auto;" />
        </div>
        <div class="col-12">
          <button type="button" class="btn btn-primary me-2" @click="updateCategory">Guardar Cambios</button>
          <button type="button" class="btn btn-secondary" @click="$emit('cancel-edit')">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'EditCategory',
  props: ['categoryId'],
  data() {
    return {
      categoryName: '',
      categoryImage: null,
      currentImageUrl: null,
    };
  },
  mounted() {
    this.loadCategory();
  },
  methods: {
    async loadCategory() {
      try {
        const response = await axios.get(`/categories/${this.categoryId}`);
        this.categoryName = response.data.name;
        this.currentImageUrl = response.data.image ? response.data.image.route : null;
      } catch (error) {
        console.error('Error al cargar categoría:', error);
        alert('Error al cargar la categoría');
      }
    },
    handleImageUpload(event) {
      this.categoryImage = event.target.files[0];
    },
    async updateCategory() {
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
        await axios.put(`/categories/${this.categoryId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Categoría actualizada');
        this.$emit('category-updated');
      } catch (error) {
        console.error('Error al actualizar categoría:', error);
        alert('Error al actualizar la categoría');
      }
    },
  },
};
</script>
