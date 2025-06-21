<template>
  <div class="card">
    <div class="card-body p-4">
      <h5 class="card-title">Agregar Nuevo Usuario</h5>
      <hr />
      <div class="form-body mt-4">
        <div class="mb-3">
          <label for="inputUserName" class="form-label">Nombre</label>
          <input type="text" class="form-control" id="inputUserName" placeholder="Ingrese el nombre" v-model="user.name" />
        </div>
        <div class="mb-3">
          <label for="inputUserEmail" class="form-label">Correo Electrónico</label>
          <input type="email" class="form-control" id="inputUserEmail" placeholder="Ingrese el correo electrónico" v-model="user.email" />
        </div>
        <div class="mb-3">
          <label for="inputUserPassword" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="inputUserPassword" placeholder="Ingrese la contraseña" v-model="user.password" />
        </div>
        <div class="mb-3">
          <label for="inputUserPhone" class="form-label">Teléfono</label>
          <input type="text" class="form-control" id="inputUserPhone" placeholder="Ingrese el teléfono" v-model="user.phone" />
        </div>
        <div class="mb-3">
          <label for="inputUserDateRegister" class="form-label">Fecha de Registro</label>
          <input type="date" class="form-control" id="inputUserDateRegister" v-model="user.dateRegister" />
        </div>
        <div class="mb-3">
          <label for="image-upload-user" class="form-label">Imagen</label>
          <input id="image-upload-user" type="file" accept="image/*" @change="onImageChange" />
        </div>
        <div class="col-12">
          <button type="button" class="btn btn-primary" @click="saveUser">Guardar Usuario</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserForm',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        phone: '',
        dateRegister: new Date().toISOString().substr(0, 10), 
        imageId: null,
      },
      selectedImage: null,
    };
  },
  methods: {
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedImage = file;
        
      }
    },
    saveUser() {
      
      console.log('Usuario guardado:', this.user);
      
    },
  },
};
</script>

<style scoped>

</style>
