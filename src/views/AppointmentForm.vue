<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card w-50">
      <div class="card-body p-4">
        <h5 class="card-title text-center">Agendar Cita</h5>
        <hr/>
        
        <!-- Barra de Progreso -->
        <div class="step-indicator">
          <div :class="['step', { active: step === 1 }]">1</div>
          <div :class="['step', { active: step === 2 }]">2</div>
          <div :class="['step', { active: step === 3 }]">3</div>
        </div>

        <div v-if="step === 1">
          <h6>Información del Cliente</h6>
          <div class="mb-3">
            <label for="inputName" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="inputName" v-model="client.name" placeholder="Ingrese su nombre" />
          </div>
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Correo Electrónico</label>
            <input type="email" class="form-control" id="inputEmail" v-model="client.email" placeholder="Ingrese su correo electrónico" />
          </div>
          <div class="mb-3">
            <label for="inputPhone" class="form-label">Teléfono</label>
            <input type="tel" class="form-control" id="inputPhone" v-model="client.phone" placeholder="Ingrese su teléfono" />
          </div>
          <button class="btn btn-primary" @click="nextStep">Siguiente</button>
        </div>

        <div v-else-if="step === 2">
          <h6>Seleccionar Fecha</h6>
          <p>Seleccione un día disponible para su cita:</p>
          <ul class="list-group mb-3">
            <li class="list-group-item" v-for="(date, index) in availableDates" :key="index">
              <button class="btn btn-outline-primary" @click="selectDate(date)">{{ date }}</button>
            </li>
          </ul>
          <button class="btn btn-secondary" @click="prevStep">Anterior</button>
          <button class="btn btn-primary" :disabled="!selectedDate" @click="nextStep">Siguiente</button>
        </div>

        <div v-else-if="step === 3">
          <h6>Confirmación de Cita</h6>
          <p>Su cita ha sido correctamente agendada para el día: <strong>{{ selectedDate }}</strong></p>
          <button class="btn btn-primary" @click="finish">Finalizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppointmentForm',
  data() {
    return {
      step: 1,
      client: {
        name: '',
        email: '',
        phone: ''
      },
      availableDates: ['2025-06-20', '2025-06-21', '2025-06-22'], 
      selectedDate: null
    };
  },
  methods: {
    nextStep() {
      if (this.step < 3) {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
    selectDate(date) {
      this.selectedDate = date;
    },
    finish() {
      // Aquí podrías agregar la lógica para guardar la cita en el servidor
      alert(`Cita agendada para el ${this.selectedDate}`);
      // Redirigir a la página principal o a otra vista
      this.$router.push('/'); // Asegúrate de tener configurado el enrutamiento
    }
  }
};
</script>

<style scoped>
.container {
  height: 100vh; /* Altura completa de la ventana */
}

.card {
  border-radius: 15px; /* Bordes redondeados */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Sombra de la tarjeta */
}

.step-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.step {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e0e0e0; /* Color de fondo por defecto */
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
}

.step.active {
  background-color: #007bff; /* Color de fondo activo */
}
</style>
