<template>
  <div class="card">
    <div class="card-body p-4">
      <h5 class="card-title">Agregar Nuevo Producto</h5>
      <hr />
      <div class="form-body mt-4">
        <div class="row">
       
          <div class="col-lg-8">
            <div class="border border-3 p-4 rounded">
              <div class="mb-3">
                <label for="inputProductCode" class="form-label">Código</label>
                <input
                  type="number"
                  class="form-control"
                  id="inputProductCode"
                  placeholder="Ingrese el código del producto"
                  v-model.number="product.code"
                />
              </div>
              <div class="mb-3">
                <label for="inputProductName" class="form-label">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputProductName"
                  placeholder="Ingrese el nombre del producto"
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
                  <option disabled :value="null">Seleccione una imagen</option>
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
                    placeholder="00.00"
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
                    <option disabled :value="null">Seleccione una categoría</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div class="col-12">
                  <button type="button" class="btn btn-primary w-100" @click="saveProduct">Guardar Producto</button>
                </div>
              </div>
            </div>

            <div class="container mt-3">
              <button type="button" class="btn btn-secondary w-100" @click="viewProducts">Ver productos</button>
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
  name: 'ProductForm',
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
  mounted() {
    this.loadCategories();
    this.loadImages();
  },
  computed: {
    selectedImageUrl() {
      const img = this.images.find((img) => img.id === this.product.imageId);
      return img ? `http://localhost:5282${img.route}` : null;
    },
  },
  methods: {
    async loadCategories() {
      try {
        const response = await axios.get('/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    },
    async loadImages() {
      try {
        const response = await axios.get('/images');
        this.images = response.data;
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
      }
    },
    async saveProduct() {
      const { code, name, description, price, isActive, categoriaId, imageId } = this.product;

      if (code === null || code <= 0) {
        alert('El código es obligatorio y debe ser un número mayor que cero.');
        return;
      }
      if (!name.trim()) {
        alert('El nombre es obligatorio.');
        return;
      }
      if (price === null || price <= 0) {
        alert('El precio es obligatorio y debe ser mayor que cero.');
        return;
      }
      if (categoriaId === null) {
        alert('Debe seleccionar una categoría.');
        return;
      }
      if (imageId === null) {
        alert('Debe seleccionar una imagen.');
        return;
      }

      const payload = {
        Code: code,
        Name: name.trim(),
        Description: description ? description.trim() : '',
        Price: price,
        IsActive: isActive,
        CategoriaId: categoriaId,
        ImageId: imageId,
      };

      try {
        await axios.post('/products', payload);
        alert('Producto guardado exitosamente');
        this.resetProduct();
        this.$emit('view-products');
      } catch (error) {
        let message = '';

        if (error.response && error.response.data) {
          if (typeof error.response.data === 'string') {
            message = error.response.data;
          } else if (error.response.data.title) {
            message = error.response.data.title;
          } else if (error.response.data.errors) {
            message = Object.values(error.response.data.errors).flat().join(' ');
          } else {
            message = JSON.stringify(error.response.data);
          }
        } else {
          message = error.message;
        }

        console.error('Error al guardar el producto:', message);
        alert('Error al guardar el producto: ' + message);
      }
    },
    resetProduct() {
      this.product = {
        code: null,
        name: '',
        description: '',
        price: null,
        isActive: true,
        categoriaId: null,
        imageId: null,
      };
    },
    viewProducts() {
      this.$emit('view-products');
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
