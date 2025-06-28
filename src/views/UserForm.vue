<template>
  <div class="card mt-4">
    <div class="card-body p-4">
      <h5 class="card-title">Agregar Nuevo Usuario</h5>
      <hr />
      <div class="form-body mt-4">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" placeholder="Ingrese el nombre" v-model="user.name" />
        </div>
        <div class="mb-3">
          <label class="form-label">Correo Electrónico</label>
          <input type="email" class="form-control" placeholder="Ingrese el correo electrónico" v-model="user.email" />
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input type="password" class="form-control" placeholder="Ingrese la contraseña" v-model="user.password" />
        </div>
        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input type="text" class="form-control" placeholder="Ingrese el teléfono" v-model="user.phone" />
        </div>
        <div class="mb-3">
          <label class="form-label">Fecha de Registro</label>
          <input type="date" class="form-control" v-model="user.dateRegister" />
        </div>
        <div class="mb-3">
          <label class="form-label">Rol</label>
          <select class="form-select" v-model="user.role">
            <option value="User">Usuario</option>
            <option value="Admin">Administrador</option>
          </select>
        </div>

        <div class="d-flex justify-content-end">
          <button class="btn btn-primary" @click="saveUser">Guardar Usuario</button>
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
        role: 'User',
        imagePath: 'assets/img/FotoPerfil/default.jpg'
      }
    };
  },
  methods: {
    async saveUser() {
      try {
        const response = await fetch('http://localhost:5282/api/Users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...this.user,
            role: this.user.role === 'Admin' ? 1 : 0
          })
        });

        if (!response.ok) throw new Error(await response.text());

        alert('Usuario guardado correctamente');
        this.resetForm();
        this.$emit('user-saved');
      } catch (error) {
        console.error(error);
        alert('Error al guardar usuario');
      }
    },
    resetForm() {
      this.user = {
        name: '',
        email: '',
        password: '',
        phone: '',
        dateRegister: new Date().toISOString().substr(0, 10),
        role: 'User',
        imagePath: 'assets/img/FotoPerfil/default.jpg'
      };
    }
  }
};
</script>
