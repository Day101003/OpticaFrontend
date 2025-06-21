<template>
  <div class="wrapper">
    <div class="sidebar-wrapper" data-simplebar="true">
      <div class="sidebar-header">
        <img src="../assets/images/lentes1.jpg" class="logo-icon" alt="logo icon" />
        <h4 class="/">OptiView</h4>
      </div>
      <ul class="metismenu" id="menu">
        <li>
          <a href="javascript:;" class="has-arrow">
            <div class="parent-icon"><i class='fas fa-tachometer-alt'></i></div>
            <div class="menu-title">Dashboard</div>
          </a>
          <ul>
            <li @click="showForm('productos')"><a href="javascript:;"><i class="fas fa-box"></i> Productos</a></li>
            <li @click="showForm('categorias')"><a href="javascript:;"><i class="fas fa-tags"></i> Categorías</a></li>
            <li @click="showForm('imagenes')"><a href="javascript:;"><i class="fas fa-image"></i> Imágenes</a></li>
            <li @click="showForm('usuarios')"><a href="javascript:;"><i class="fas fa-users"></i> Usuarios</a></li>
            <li @click="showForm('disponibilidad')"><a href="javascript:;"><i class="fas fa-calendar-check"></i> Disponibilidad</a></li>
            <li @click="showForm('citas')"><a href="javascript:;"><i class="fas fa-calendar-alt"></i> Citas</a></li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="page-wrapper">
      <div class="page-content">
        <h1>Admin Dashboard</h1>
        <p>Bienvenido al panel de administración.</p>

        <!-- Productos -->
        <div v-if="currentForm === 'productos'">
          <ProductForm @view-products="showForm('listaProductos')" />
        </div>
        <div v-if="currentForm === 'listaProductos'">
          <ProductList @edit-product="editProduct" />
        </div>
        <div v-if="currentForm === 'editarProducto' && editingProductId !== null">
          <EditProduct
            :productId="editingProductId"
            @product-updated="showForm('listaProductos')"
            @cancel-edit="showForm('listaProductos')"
          />
        </div>

        <!-- Categorías -->
        <div v-if="currentForm === 'categorias' && editingCategoryId === null">
          <CategoryForm 
            @category-saved="showForm('listCategories')" 
            @view-categories="showForm('listCategories')" 
          />
        </div>
        <div v-if="currentForm === 'listCategories'">
          <CategoryList
            @edit-category="editCategory"
            @back-to-create="showForm('categorias')"
          />
        </div>
        <div v-if="currentForm === 'editCategory' && editingCategoryId !== null">
          <EditCategory
            :categoryId="editingCategoryId"
            @category-updated="showForm('listCategories')"
            @cancel-edit="showForm('listCategories')"
          />
        </div>

        <!-- Imágenes -->
        <div v-if="currentForm === 'imagenes' && editingImageId === null">
          <ImageForm 
            @image-saved="showForm('listImages')" 
            @view-images="showForm('listImages')" 
          />
        </div>
        <div v-if="currentForm === 'listImages'">
          <ImageList 
            @edit-image="editImage" 
            @back-to-create="showForm('imagenes')" 
          />
        </div>
        <div v-if="currentForm === 'editImage' && editingImageId !== null">
          <EditImage
            :imageId="editingImageId"
            @image-updated="showForm('listImages')"
            @cancel-edit="showForm('listImages')"
          />
        </div>

        <!-- Los modulos que faltan-->
        <div v-if="currentForm === 'usuarios'">
          <UserForm />
        </div>
        <div v-if="currentForm === 'disponibilidad'">
          <AvailabilityForm />
        </div>
        <div v-if="currentForm === 'citas'">
          <QuotesTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductForm from './ProductForm.vue';
import ProductList from './ProductList.vue';
import EditProduct from './EditProduct.vue';
import CategoryForm from './CategoryForm.vue';
import CategoryList from './CategoryList.vue';
import EditCategory from './EditCategory.vue';
import ImageForm from './ImageForm.vue';
import ImageList from './ImageList.vue';
import EditImage from './EditImage.vue';
import UserForm from './UserForm.vue';
import AvailabilityForm from './AvailabilityForm.vue';
import QuotesTable from './QuotesTable.vue';

export default {
  name: 'Admin',
  components: {
    ProductForm,
    ProductList,
    EditProduct,
    CategoryForm,
    CategoryList,
    EditCategory,
    ImageForm,
    ImageList,
    EditImage,
    UserForm,
    AvailabilityForm,
    QuotesTable,
  },
  data() {
    return {
      currentForm: 'categorias', 
      editingProductId: null,
      editingCategoryId: null,
      editingImageId: null,
    };
  },
  methods: {
    showForm(formName, id = null) {
      this.currentForm = formName;

      if (formName === 'editarProducto') {
        this.editingProductId = id;
        this.editingCategoryId = null;
        this.editingImageId = null;
      } else if (formName === 'editCategory') {
        this.editingCategoryId = id;
        this.editingProductId = null;
        this.editingImageId = null;
      } else if (formName === 'editImage') {
        this.editingImageId = id;
        this.editingProductId = null;
        this.editingCategoryId = null;
      } else {
        this.editingProductId = null;
        this.editingCategoryId = null;
        this.editingImageId = null;
      }
    },
    editProduct(id) {
      this.showForm('editarProducto', id);
    },
    editCategory(id) {
      this.showForm('editCategory', id);
    },
    editImage(id) {
      this.showForm('editImage', id);
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 10px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.metismenu {
  list-style: none;
  padding: 0;
}

.metismenu li {
  margin: 10px 0;
}

.metismenu a {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
}

.metismenu a .parent-icon {
  margin-right: 10px;
}

.page-content {
  padding: 20px;
}
</style>
