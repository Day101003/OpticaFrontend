<template>
  <div class="card mt-4">
    <div class="card-body">
      <h5 class="card-title">Lista de Usuarios</h5>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td>{{ u.name }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.phone }}</td>
            <td>{{ u.role === 1 ? 'Admin' : 'User' }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" @click="$emit('edit-user', u)">Editar</button>
              <button class="btn btn-sm btn-danger" @click="deleteUser(u.id)">Eliminar</button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="5" class="text-center">No hay usuarios</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return { users: [] };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
  try {
    const res = await fetch('http://localhost:5282/api/Users');
    const allUsers = await res.json();
    this.users = allUsers.filter(u => u.role === 1); // solo admins
  } catch (err) {
    console.error('Error al cargar usuarios:', err);
  }
},
    async deleteUser(id) {
      if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;

      try {
        const res = await fetch(`http://localhost:5282/api/Users/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error('Error al eliminar usuario');
        alert('Usuario eliminado correctamente');
        this.fetchUsers(); // refrescar lista
      } catch (err) {
        console.error(err);
        alert('Error al eliminar usuario');
      }
    }
  }
};
</script>
