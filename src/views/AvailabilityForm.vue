<template>
  <div class="card">
    <div class="card-body p-4">
      <h5 class="card-title">Agregar Disponibilidad</h5>
      <hr />
      <div class="form-body mt-4">
        <div class="mb-3">
          <label for="inputAvailableDate" class="form-label">Fecha Disponible</label>
          <input type="date" class="form-control" id="inputAvailableDate" v-model="availability.availableDate" />
        </div>
        <div class="mb-3">
          <label for="inputHour" class="form-label">Hora Disponible</label>
          <input type="time" class="form-control" id="inputHour" v-model="availability.hour" />
        </div>
        <div class="mb-3">
          <label for="inputAvailable" class="form-label">¿Disponible?</label>
          <select class="form-select" id="inputAvailable" v-model="availability.available">
            <option :value="true">Sí</option>
            <option :value="false">No</option>
          </select>
        </div>
        <div class="col-12">
          <button type="button" class="btn btn-primary" @click="saveAvailability">Guardar Disponibilidad</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvailabilityForm',
  data() {
    return {
      availability: {
        availableDate: '',
        hour: '',
        available: true,
      },
    };
  },
  methods: {
    saveAvailability() {
     
      console.log('Disponibilidad guardada:', this.availability);
    },
  },
};
</script>

<style scoped>

</style>
