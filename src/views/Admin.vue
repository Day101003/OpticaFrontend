<template>
  <div class="wrapper">
    <!-- Botón Hamburguesa SOLO visible en móvil -->
    <button class="btn-toggle-sidebar d-lg-none" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>

    <!-- SIDEBAR -->
    <div class="sidebar-wrapper" v-show="sidebarVisible" data-simplebar="true">
      <div class="sidebar-header">
        <img src="../assets/images/logo1.png" class="logo-icon" alt="logo icon" />
        <a href="/"><h4>OptiView</h4></a>
      </div>
      <ul class="metismenu" id="menu">
        <li>
          <a href="javascript:;" class="has-arrow">
            <div class="parent-icon"><i class='fas fa-tachometer-alt'></i></div>
            <div class="menu-title">Dashboard</div>
          </a>
          <ul>
            <li @click="navigate('productos')"><a href="#"><i class="fas fa-box"></i> Productos</a></li>
            <li @click="navigate('categorias')"><a href="#"><i class="fas fa-tags"></i> Categorías</a></li>
            <li @click="navigate('imagenes')"><a href="#"><i class="fas fa-image"></i> Imágenes</a></li>
            <li @click="navigate('usuarios')"><a href="#"><i class="fas fa-users"></i> Usuarios</a></li>
            <li @click="navigate('disponibilidad')"><a href="#"><i class="fas fa-calendar-check"></i> Disponibilidad</a></li>
            <li @click="navigate('citas')"><a href="#"><i class="fas fa-calendar-alt"></i> Citas</a></li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- CONTENIDO -->
    <div class="page-wrapper">
      <div class="page-content">
        <h1>Admin Dashboard</h1>
        <p>Bienvenido al panel de administración.</p>

        <!-- Secciones renderizadas dinámicamente -->
        <div v-if="currentForm === 'productos'">
          <ProductForm @view-products="showForm('listaProductos')" />
        </div>
        <div v-if="currentForm === 'listaProductos'">
          <ProductList @edit-product="editProduct" />
        </div>
        <div v-if="currentForm === 'editarProducto' && editingProductId !== null">
          <EditProduct :productId="editingProductId" @product-updated="showForm('listaProductos')" @cancel-edit="showForm('listaProductos')" />
        </div>

        <div v-if="currentForm === 'categorias' && editingCategoryId === null">
          <CategoryForm @category-saved="showForm('listCategories')" @view-categories="showForm('listCategories')" />
        </div>
        <div v-if="currentForm === 'listCategories'">
          <CategoryList @edit-category="editCategory" @back-to-create="showForm('categorias')" />
        </div>
        <div v-if="currentForm === 'editCategory' && editingCategoryId !== null">
          <EditCategory :categoryId="editingCategoryId" @category-updated="showForm('listCategories')" @cancel-edit="showForm('listCategories')" />
        </div>

        <div v-if="currentForm === 'imagenes' && editingImageId === null">
          <ImageForm @image-saved="showForm('listImages')" @view-images="showForm('listImages')" />
        </div>
        <div v-if="currentForm === 'listImages'">
          <ImageList @edit-image="editImage" @back-to-create="showForm('imagenes')" />
        </div>
        <div v-if="currentForm === 'editImage' && editingImageId !== null">
          <EditImage :imageId="editingImageId" @image-updated="showForm('listImages')" @cancel-edit="showForm('listImages')" />
        </div>

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
      sidebarVisible: window.innerWidth >= 992, // visible en desktop
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    navigate(formName) {
      this.showForm(formName);
      if (window.innerWidth < 992) {
        this.sidebarVisible = false; // Oculta el menú al hacer clic en móvil
      }
    },
    showForm(formName, id = null) {
      this.currentForm = formName;

      this.editingProductId = formName === 'editarProducto' ? id : null;
      this.editingCategoryId = formName === 'editCategory' ? id : null;
      this.editingImageId = formName === 'editImage' ? id : null;
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
    handleResize() {
      // si pasa a escritorio, se asegura que se vea
      this.sidebarVisible = window.innerWidth >= 992;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
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

.btn-toggle-sidebar {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1001;
  background-color: #72aec8;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  display: none;
}

.btn-toggle-sidebar i {
  font-size: 18px;
}

/* Mostrar hamburguesa solo en pantallas pequeñas */
@media (max-width: 991px) {
  .btn-toggle-sidebar {
    display: block;
  }

  .sidebar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100%;
    background-color: #fff;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
}


/* Desktop: sidebar ocupa espacio fijo */
@media (min-width: 992px) {
  .wrapper {
    flex-direction: row;
  }

  .sidebar-wrapper {
    width: 250px;
    min-height: 100vh;
  }

  .page-wrapper {
    flex: 1;
    padding-left: 100px;
  }
}


</style>
