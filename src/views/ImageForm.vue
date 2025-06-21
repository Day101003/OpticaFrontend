<template>
  <div class="card">
    <div class="card-body p-4">
      <h5 class="card-title">Agregar Nueva Imagen</h5>
      <hr />
      <div class="form-body mt-4">
        <div class="mb-3">
          <label for="inputImageType" class="form-label">Tipo</label>
          <input
            type="text"
            class="form-control"
            id="inputImageType"
            v-model="imageType"
            placeholder="Ingrese el tipo de imagen"
          />
        </div>
        <div class="mb-3">
          <label for="image-upload" class="form-label">Imagen</label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
          />
        </div>

        <div class="col-12 d-flex justify-content-between mt-3">
          <button type="button" class="btn btn-primary" @click="saveImage">Guardar Imagen</button>
          <button type="button" class="btn btn-secondary" @click="$emit('view-images')">Ver Imágenes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'ImageForm',
  data() {
    return {
      imageType: '',
      imageFile: null,
    };
  },
  methods: {
    handleImageUpload(event) {
      this.imageFile = event.target.files[0];
    },
    async saveImage() {
      if (!this.imageType.trim()) {
        alert('El tipo de imagen es obligatorio.');
        return;
      }
      if (!this.imageFile) {
        alert('Debe seleccionar una imagen.');
        return;
      }

      const formData = new FormData();
      formData.append('type', this.imageType);
      formData.append('image', this.imageFile);

      try {
        await axios.post('/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Imagen guardada exitosamente');
        this.imageType = '';
        this.imageFile = null;
        this.$emit('image-saved');
      } catch (error) {
        console.error('Error al guardar la imagen:', error);
        alert('Error al guardar la imagen.');
      }
    },
  },
};
</script>

<style scoped>

</style>
