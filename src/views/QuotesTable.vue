<template>
  <div class="card">
    <div class="card-body p-4">
      <h5 class="card-title">Citas Agendadas</h5>
      <hr />
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id de la Cita</th>
            <th scope="col">Cliente</th>
            <th scope="col">Fecha Disponible</th>
            <th scope="col">Hora Disponible</th>
            <th scope="col">Notas</th>
            <th scope="col">¿Activa?</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="quote in quotes" :key="quote.id">
            <td>{{ quote.id }}</td>
            <td>{{ quote.client.name }}</td>
            <td>{{ formatDate(quote.availability.availableDate) }}</td>
            <td>{{ formatTime(quote.availability.hour) }}</td>
            <td>{{ quote.notes }}</td>
            <td>{{ quote.isActive ? 'Sí' : 'No' }}</td>
            <td>
              <button
                v-if="quote.isActive"
                class="btn btn-success btn-sm me-2"
                :id="'complete-' + quote.id"
                @click.stop="completeQuote(quote.id)"
              >
                Marcar como Atendida
              </button>
              <button
                class="btn btn-primary btn-sm me-2"
                :id="'edit-' + quote.id"
                @click.stop="editQuote(quote.id)"
              >
                Editar
              </button>
              <button
                class="btn btn-danger btn-sm"
                :id="'remove-' + quote.id"
                @click.stop="removeQuote(quote.id)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuotesTable',
  data() {
    return {
      quotes: [],
    };
  },
  mounted() {
    this.loadQuotes();
  },
  methods: {
    async loadQuotes() {
      try {
        console.log('Cargando citas...');
        const response = await this.$axios.get('/Quotes');
        console.log('Citas cargadas:', response.data);
        this.quotes = response.data;
      } catch (error) {
        console.error('Error al cargar citas:', error);
        alert('No se pudieron cargar las citas: ' + (error.response?.data?.message || error.message));
      }
    },
    async completeQuote(quoteId) {
      console.log('Ejecutando completeQuote para quoteId:', quoteId);
      try {
        const response = await this.$axios.patch(`/Quotes/${quoteId}/complete`);
        console.log('Respuesta de completeQuote:', response.status, response.data);
        await this.loadQuotes();
        alert('Cita marcada como atendida.');
      } catch (error) {
        console.error('Error al marcar cita como atendida:', error);
        alert('No se pudo marcar la cita como atendida: ' + (error.response?.data?.message || error.message));
      }
    },
    async removeQuote(quoteId) {
      console.log('Ejecutando removeQuote para quoteId:', quoteId);
      if (!confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
        return;
      }
      try {
        const response = await this.$axios.delete(`/Quotes/${quoteId}`);
        console.log('Respuesta de removeQuote:', response.status, response.data);
        await this.loadQuotes();
        alert('Cita eliminada exitosamente.');
      } catch (error) {
        console.error('Error al eliminar cita:', error);
        alert('No se pudo eliminar la cita: ' + (error.response?.data?.message || error.message));
      }
    },
    editQuote(quoteId) {
      console.log('Ejecutando editQuote para quoteId:', quoteId);
      this.$router.push(`/appointment/${quoteId}`);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    formatTime(time) {
      const [hours, minutes] = time.split(':');
      const date = new Date();
      date.setHours(hours, minutes);
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
};
</script>

<style scoped>
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>