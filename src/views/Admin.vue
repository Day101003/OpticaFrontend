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
            <li @click="navigate('usuariosForm')"><a href="#"><i class="fas fa-users"></i> Usuarios</a></li>
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

        <!-- Secciones dinámicas -->
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

        <!-- Usuarios separados: formulario y lista y edición -->
        <div v-if="currentForm === 'usuariosForm'">
          <UserForm @user-saved="onUserSaved" @view-users="showForm('usuariosList')" />
          <button class="btn btn-secondary mt-2" @click="showForm('usuariosList')">Ver Lista de Usuarios</button>
        </div>

        <div v-if="currentForm === 'usuariosList'">
          <button class="btn btn-primary mb-3" @click="newUser">Agregar Nuevo Usuario</button>
          <UserList ref="userList" @edit-user="editUser" />
        </div>

        <div v-if="currentForm === 'editarUsuario' && editingUserId !== null">
          <EditUser 
            :userId="editingUserId" 
            @user-updated="onUserSaved" 
            @cancel-edit="showForm('usuariosList')" 
          />
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
import UserList from './UserList.vue';
import EditUser from './EditUser.vue';
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
    UserList,
    EditUser,
    AvailabilityForm,
    QuotesTable,
  },
  data() {
    return {
      currentForm: 'usuariosForm', // inicia mostrando formulario crear usuario
      editingProductId: null,
      editingCategoryId: null,
      editingImageId: null,
      editingUserId: null,
      sidebarVisible: window.innerWidth >= 992
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    navigate(formName) {
      this.showForm(formName);
      if (window.innerWidth < 992) {
        this.sidebarVisible = false;
      }
    },
    showForm(formName) {
      this.currentForm = formName;
      // Resetea ids para editar al cambiar de formulario
      if (formName !== 'editarProducto') this.editingProductId = null;
      if (formName !== 'editCategory') this.editingCategoryId = null;
      if (formName !== 'editImage') this.editingImageId = null;
      if (formName !== 'editarUsuario') this.editingUserId = null;
    },
    editProduct(id) {
      this.editingProductId = id;
      this.showForm('editarProducto');
    },
    editCategory(id) {
      this.editingCategoryId = id;
      this.showForm('editCategory');
    },
    editImage(id) {
      this.editingImageId = id;
      this.showForm('editImage');
    },
    newUser() {
      this.editingUserId = null;
      this.showForm('usuariosForm');
    },
    editUser(user) {
      this.editingUserId = user.id;
      this.showForm('editarUsuario');
    },
    onUserSaved() {
      this.editingUserId = null;
      this.showForm('usuariosList');
      if (this.$refs.userList) this.$refs.userList.fetchUsers();
    },
    handleResize() {
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
