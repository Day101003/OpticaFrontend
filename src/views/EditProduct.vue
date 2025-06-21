<template>
  <div class="card">
    <div class="card-body p-4">
      <h5 class="card-title">Editar Producto</h5>
      <hr />
      <div class="form-body mt-4">
        <div class="row">
          <!-- Columna izquierda -->
          <div class="col-lg-8">
            <div class="border border-3 p-4 rounded">
              <div class="mb-3">
                <label for="inputProductCode" class="form-label">Código</label>
                <input
                  type="number"
                  class="form-control"
                  id="inputProductCode"
                  v-model.number="product.code"
                />
              </div>
              <div class="mb-3">
                <label for="inputProductName" class="form-label">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputProductName"
                  v-model.trim="product.name"
                />
              </div>
              <div class="mb-3">
                <label for="inputProductDescription" class="form-label">Descripción</label>
                <textarea
                  class="form-control"
                  id="inputProductDescription"
                  rows="3"
                  v-model.trim="product.description"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="inputImage" class="form-label">Imagen</label>
                <select class="form-select" id="inputImage" v-model.number="product.imageId">
                  <option :value="null" disabled>Seleccione una imagen</option>
                  <option v-for="img in images" :key="img.id" :value="img.id">
                    {{ img.route }}
                  </option>
                </select>
                <div v-if="selectedImageUrl" class="mt-2">
                  <img :src="selectedImageUrl" alt="Preview" style="width: 150px; height: auto;" />
                </div>
              </div>
            </div>
          </div>
          <!-- Columna derecha -->
          <div class="col-lg-4">
            <div class="border border-3 p-4 rounded">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="inputPrice" class="form-label">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    class="form-control"
                    id="inputPrice"
                    v-model.number="product.price"
                  />
                </div>
                <div class="col-md-6">
                  <label for="inputIsActive" class="form-label">¿Está activo?</label>
                  <select class="form-select" id="inputIsActive" v-model="product.isActive">
                    <option :value="true">Sí</option>
                    <option :value="false">No</option>
                  </select>
                </div>
                <div class="col-12">
                  <label for="inputCategory" class="form-label">Categoría</label>
                  <select class="form-select" id="inputCategory" v-model.number="product.categoriaId">
                    <option :value="null" disabled>Seleccione una categoría</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div class="col-12">
                  <button type="button" class="btn btn-primary w-100" @click="updateProduct">Actualizar Producto</button>
                </div>
              </div>
              <div class="container mt-3">
                <button type="button" class="btn btn-secondary w-100" @click="$emit('cancel-edit')">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'EditProduct',
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      product: {
        code: null,
        name: '',
        description: '',
        price: null,
        isActive: true,
        categoriaId: null,
        imageId: null,
      },
      categories: [],
      images: [],
    };
  },
  computed: {
    selectedImageUrl() {
      const img = this.images.find((img) => img.id === this.product.imageId);
      return img ? `http://localhost:5282${img.route}` : null;
    },
  },
  mounted() {
    this.loadCategories();
    this.loadImages();
    this.loadProduct();
  },
  methods: {
    async loadCategories() {
      const res = await axios.get('/categories');
      this.categories = res.data;
    },
    async loadImages() {
      const res = await axios.get('/images');
      this.images = res.data;
    },
    async loadProduct() {
      try {
        const res = await axios.get(`/products/${this.productId}`);
        this.product = {
          ...res.data,
          categoriaId: res.data.categoriaId,
          imageId: res.data.imageId,
        };
      } catch (error) {
        alert('Error al cargar el producto.');
        console.error(error);
      }
    },
    async updateProduct() {
      try {
        await axios.put(`/products/${this.productId}`, this.product);
        alert('Producto actualizado con éxito.');
        this.$emit('product-updated');
      } catch (error) {
        console.error(error);
        alert('Error al actualizar el producto.');
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
}
</style>
