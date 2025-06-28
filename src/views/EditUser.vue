<template>
  <div class="card mt-4">
    <div class="card-body p-4">
      <h5 class="card-title">Editar Usuario</h5>
      <hr />
      <div class="form-body mt-4" v-if="user">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" v-model="user.name" />
        </div>
        <div class="mb-3">
          <label class="form-label">Correo Electrónico</label>
          <input type="email" class="form-control" v-model="user.email" />
        </div>
        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input type="text" class="form-control" v-model="user.phone" />
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
          <button class="btn btn-primary" @click="updateUser">Actualizar Usuario</button>
          <button class="btn btn-secondary ms-2" @click="$emit('cancel-edit')">Cancelar</button>
        </div>
      </div>
      <div v-else>
        <p>Cargando usuario...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditUser',
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        phone: '',
        role: 0, // o 'User' / 'Admin' según tu lógica
        // otros campos que tengas...
      },
      loading: false,
      errorMessage: ''
    };
  },
  async mounted() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const res = await fetch(`http://localhost:5282/api/Users/${this.userId}`);
        if (!res.ok) throw new Error('Error al obtener usuario');
        this.user = await res.json();
      } catch (error) {
        console.error(error);
        this.errorMessage = 'No se pudo cargar el usuario';
      }
    },
   async updateUser() {
  try {
    // Prepara el objeto para enviar
    const userToSend = {
      ...this.user,
      // Ajusta role según lo que espera el backend, por ejemplo:
      role: this.user.role === 'Admin' || this.user.role === 1 ? 1 : 0
    };

    const res = await fetch(`http://localhost:5282/api/Users/${this.userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userToSend)
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Error al actualizar usuario');
    }

    alert('Usuario actualizado correctamente');
    this.$emit('user-updated');
  } catch (error) {
    console.error(error);
    alert(`Error: ${error.message}`);
  }
},
    cancelEdit() {
      this.$emit('cancel-edit');
    }
  }
};
</script>

