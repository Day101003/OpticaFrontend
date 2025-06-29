<template>
  <div class="user-list-container mt-4">
    <h5 class="title mb-4 text-center">Lista de Usuarios</h5>
    <table class="user-table">
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
          <td>
            <span :class="['role-badge', u.role === 1 ? 'admin' : 'user']">
              {{ u.role === 1 ? 'Admin' : 'User' }}
            </span>
          </td>
          <td>
            <button class="btn edit-btn" @click="$emit('edit-user', u)" title="Editar usuario">
              ✏️ 
            </button>
            <button class="btn delete-btn" @click="deleteUser(u.id)" title="Eliminar usuario">
              🗑️ 
            </button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="5" class="no-users">No hay usuarios</td>
        </tr>
      </tbody>
    </table>
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
        this.fetchUsers();
      } catch (err) {
        console.error(err);
        alert('Error al eliminar usuario');
      }
    }
  }
};
</script>

<style scoped>
.user-list-container {
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  font-weight: 700;
  font-size: 1.6rem;
  color: #1a202c;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

.user-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  background: #fff;
  box-shadow: 0 4px 15px rgb(0 0 0 / 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.user-table thead tr {
  background: #2d3748;
  color: #f7fafc;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.user-table thead th {
  padding: 20px 20px;
  text-align: left;
}

.user-table tbody tr {
  background: #edf2f7;
  transition: background-color 0.3s ease;
  border-radius: 10px;
}

.user-table tbody tr:hover {
  background: #adc3d079;
}

.user-table tbody td {
  padding: 15px 20px;
  vertical-align: middle;
  color: #2d3748;
  font-weight: 500;
}

.role-badge {
  padding: 5px 12px;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.85rem;
  color: white;
  user-select: none;
  display: inline-block;
  min-width: 60px;
  text-align: center;
}

.role-badge.admin {
  background-color: #95c2ed; /* azul */
}

.role-badge.user {
  background-color: #a0aec0; /* gris */
}

.btn {
  cursor: pointer;
  padding: 6px 12px;
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: 6px;
  border: none;
  user-select: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.edit-btn {
  background-color: #ecc94b;
  color: #4a4a02;
  margin-right: 8px;
}

.edit-btn:hover {
  background-color: #d69e2e;
  color: #2d2d00;
}

.delete-btn {
  background-color: #f56565;
  color: white;
}

.delete-btn:hover {
  background-color: #c53030;
}

.no-users {
  padding: 20px;
  text-align: center;
  font-style: italic;
  color: #718096;
}
</style>
