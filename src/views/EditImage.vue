<template>
  <div class="card">
    <div class="card-body p-4">
      <h5 class="card-title">Editar Imagen</h5>
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
          <label for="image-upload-edit" class="form-label">Nueva Imagen (opcional)</label>
          <input
            id="image-upload-edit"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
          />
        </div>
        <div v-if="currentImageRoute" class="mb-3">
          <label class="form-label">Imagen Actual</label>
          <br />
          <img
            :src="`http://localhost:5282${currentImageRoute}`"
            alt="Imagen actual"
            style="width: 120px; height: auto;"
          />
        </div>

        <div class="col-12 d-flex justify-content-between mt-3">
          <button class="btn btn-primary" @click="updateImage">Actualizar Imagen</button>
          <button class="btn btn-secondary" @click="$emit('cancel-edit')">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'EditImage',
  props: ['imageId'],
  data() {
    return {
      imageType: '',
      imageFile: null,
      currentImageRoute: null,
    };
  },
  mounted() {
    this.loadImage();
  },
  methods: {
   async loadImage() {
  try {
    const response = await axios.get(`/images/${this.imageId}`);
    this.imageType = response.data.type || '';
    this.currentImageRoute = response.data.route;
  } catch (error) {
    console.error('Error cargando la imagen:', error);
  }
},

    handleImageUpload(event) {
      this.imageFile = event.target.files[0];
    },
  async updateImage() {
  if (!String(this.imageType).trim()) {
    alert('El tipo de imagen es obligatorio.');
    return;
  }

  const formData = new FormData();
  formData.append('type', this.imageType);
  if (this.imageFile) {
    formData.append('image', this.imageFile);
  }

  try {
    await axios.put(`/images/${this.imageId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    alert('Imagen actualizada exitosamente');
    this.$emit('image-updated');
  } catch (error) {
    console.error('Error actualizando la imagen:', error);
    alert('Error al actualizar la imagen.');
  }
},

  },
};
</script>
