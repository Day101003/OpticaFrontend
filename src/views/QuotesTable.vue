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
            <td>{{ quote.availability.availableDate }}</td>
            <td>{{ quote.availability.hour }}</td>
            <td>{{ quote.notes }}</td>
            <td>{{ quote.isActive ? 'Sí' : 'No' }}</td>
            <td>
              <button
                v-if="quote.isActive"
                class="btn btn-success"
                @click="markAsAttended(quote.id)"
              >
                Atendido
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
    loadQuotes() {
     
      
    },
    markAsAttended(quoteId) {
     
      const quote = this.quotes.find(q => q.id === quoteId);
      if (quote) {
        quote.isActive = false; 
       
        console.log(`Cita ${quoteId} marcada como atendida.`);
      }
    },
  },
};
</script>

<style scoped>

</style>
