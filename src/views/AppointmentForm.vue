<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card w-75">
      <div class="card-body p-4">
        <h5 class="card-title text-center">{{ isEditing ? 'Editar Cita' : 'Agendar Cita' }}</h5>
        <hr />
        <!-- Barra de Progreso (solo para creación, no para edición) -->
        <div v-if="!isEditing" class="step-indicator">
          <div :class="['step', { active: step === 1 }]">1</div>
          <div :class="['step', { active: step === 2 }]">2</div>
          <div :class="['step', { active: step === 3 }]">3</div>
        </div>
        <!-- Paso 1: Autenticación o Datos del Cliente (solo para creación) -->
        <div v-if="!isEditing && step === 1">
          <h6>Información del Cliente</h6>
          <div v-if="!isLoggedIn">
            <p>¿Ya tienes una cuenta?</p>
            <button class="btn btn-primary mr-2" @click="goToLogin">Iniciar Sesión</button>
            <button class="btn btn-secondary" @click="continueAsGuest">Continuar como Cliente</button>
          </div>
          <form v-if="isLoggedIn || isGuest" class="mt-3" @submit.prevent="nextStep">
            <div class="mb-3">
              <label for="inputName" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="inputName"
                v-model="form.clientName"
                placeholder="Ingrese su nombre"
                :disabled="isLoggedIn"
                required
              />
            </div>
            <div class="mb-3">
              <label for="inputEmail" class="form-label">Correo Electrónico</label>
              <input
                type="email"
                class="form-control"
                id="inputEmail"
                v-model="form.clientEmail"
                placeholder="Ingrese su correo electrónico"
                :disabled="isLoggedIn"
                required
              />
            </div>
            <div class="mb-3">
              <label for="inputPhone" class="form-label">Teléfono</label>
              <input
                type="tel"
                class="form-control"
                id="inputPhone"
                v-model="form.clientPhone"
                placeholder="Ingrese su teléfono"
                :disabled="isLoggedIn"
                required
              />
            </div>
            <button class="btn btn-primary" type="submit">Siguiente</button>
          </form>
        </div>
        <!-- Paso 2 o Formulario de Edición: Selección de Fecha y Hora -->
        <div v-else-if="!isEditing && step === 2 || isEditing">
          <h6>{{ isEditing ? 'Editar Fecha y Hora' : 'Seleccionar Fecha y Hora' }}</h6>
          <p>Seleccione un horario disponible para su cita:</p>
          <FullCalendar :options="calendarOptions" />
          <div class="mb-3 mt-3">
            <label for="inputNotes" class="form-label">Notas (Opcional)</label>
            <textarea
              class="form-control"
              id="inputNotes"
              v-model="form.notes"
              placeholder="Añada notas adicionales"
            ></textarea>
          </div>
          <button v-if="!isEditing" class="btn btn-secondary mr-2" @click="prevStep">Anterior</button>
          <button
            class="btn btn-primary"
            :disabled="!form.availabilityId"
            @click="isEditing ? submitForm() : nextStep()"
          >
            {{ isEditing ? 'Actualizar Cita' : 'Siguiente' }}
          </button>
          <p v-if="error" class="text-danger">{{ error }}</p>
        </div>
        <!-- Paso 3: Confirmación (solo para creación) -->
        <div v-else-if="!isEditing && step === 3">
          <h6>Confirmación de Cita</h6>
          <p>
            Su cita ha sido agendada para el día:
            <strong>{{ selectedDateTime ? formatDateTime(selectedDateTime) : 'N/A' }}</strong>
          </p>
          <button class="btn btn-primary" @click="submitForm">Confirmar y Guardar</button>
          <button class="btn btn-secondary mr-2" @click="prevStep">Anterior</button>
          <p v-if="error" class="text-danger">{{ error }}</p>
        </div>
        <!-- Lista de Citas (solo para usuarios no administradores) -->
        <div v-if="!isAdmin" class="mt-4">
          <h5>Mis Citas</h5>
          <div v-if="quotes.length === 0" class="alert alert-info">No hay citas agendadas.</div>
          <div v-for="quote in quotes" :key="quote.id" class="card mb-2">
            <div class="card-body">
              <p>
                {{ quote.client.name }} - {{ formatDateTime(`${quote.availability.availableDate.split('T')[0]}T${quote.availability.hour}`) }}
              </p>
              <p>Notas: {{ quote.notes || 'Sin notas' }}</p>
              <button class="btn btn-warning mr-2" @click="editQuote(quote)">Editar</button>
              <button class="btn btn-danger" @click="deleteQuote(quote.id)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { isLoggedIn, getUser } from '../utils/auth';

export default {
  name: 'AppointmentForm',
  components: {
    FullCalendar,
  },
  data() {
    return {
      step: 1,
      form: {
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        availabilityId: '',
        notes: '',
      },
      availableSlots: [],
      quotes: [],
      error: '',
      isGuest: false,
      isEditing: false,
      quoteId: null,
      selectedDateTime: null,
      isAdmin: false,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridDay',
        events: [],
        selectable: true,
        select: this.handleDateSelect,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridDay',
        },
        slotMinTime: '07:00:00',
        slotMaxTime: '19:00:00',
        slotDuration: '02:00:00',
        allDaySlot: false,
        height: 'auto',
      },
    };
  },
  async created() {
  // Verificar si es edición
  const quoteId = this.$route.params.id;
  if (quoteId) {
    this.isEditing = true;
    this.quoteId = quoteId;
    await this.loadQuote(quoteId);
  }

  // Verificar si el usuario es administrador
  if (isLoggedIn()) {
    const user = getUser();
    this.isAdmin = user && user.role === 'Admin';
    if (user && !this.isEditing) {
      this.form.clientName = user.name || '';
      this.form.clientEmail = user.email || '';
      this.form.clientPhone = user.phone || '';
      if (this.form.clientName && this.form.clientEmail && this.form.clientPhone) {
        this.step = 2; // Saltar al paso 2 para creación
      }
    }
  }

  // Cargar datos
  await this.fetchAvailableSlots();
  await this.fetchQuotes(); // Cargar citas para todos
},
  methods: {
    async fetchAvailableSlots() {
      try {
        const now = new Date();
        const response = await axios.get(`/Availabilities/available/${now.getFullYear()}/${now.getMonth() + 1}`);
        this.availableSlots = response.data;
        this.calendarOptions.events = this.availableSlots.map(slot => ({
          id: slot.id,
          start: `${slot.availableDate.split('T')[0]}T${slot.hour}`,
          title: 'Disponible',
          backgroundColor: '#28a745',
          extendedProps: { availabilityId: slot.id },
        }));
        if (this.availableSlots.length > 0) {
          this.calendarOptions.initialDate = this.availableSlots[0].availableDate.split('T')[0];
        }
      } catch (error) {
        this.error = 'Error al cargar horarios disponibles';
        console.error(error);
      }
    },
    async fetchQuotes() {
      try {
        const response = await axios.get('/Quotes');
        const userEmail = isLoggedIn() ? getUser().email : this.form.clientEmail;
        this.quotes = response.data.filter(quote => quote.isActive && (!userEmail || quote.client.email === userEmail));
      } catch (error) {
        this.error = 'Error al cargar citas';
        console.error(error);
      }
    },
    async loadQuote(quoteId) {
      try {
        const response = await axios.get(`/Quotes/${quoteId}`);
        const quote = response.data;
        this.form.clientName = quote.client.name;
        this.form.clientEmail = quote.client.email;
        this.form.clientPhone = quote.client.phone;
        this.form.availabilityId = quote.availabilityID;
        this.form.notes = quote.notes;
        this.selectedDateTime = `${quote.availability.availableDate.split('T')[0]}T${quote.availability.hour}`;
      } catch (error) {
        this.error = 'Error al cargar la cita';
        console.error(error);
        alert('No se pudo cargar la cita.');
      }
    },
    async submitForm() {
  try {
    // Validar datos
    if (!this.form.clientName || !this.form.clientEmail || !this.form.clientPhone || !this.form.availabilityId) {
      this.error = 'Por favor, complete todos los campos requeridos.';
      return;
    }

    const payload = {
      clientName: this.form.clientName,
      clientEmail: this.form.clientEmail,
      clientPhone: this.form.clientPhone,
      availabilityId: this.form.availabilityId,
      notes: this.form.notes,
    };

    if (this.isEditing) {
      await axios.put(`/Quotes/${this.quoteId}`, payload);
      alert('Cita actualizada con éxito');
    } else {
      await axios.post('/Quotes', payload);
      alert('Cita agendada con éxito');
    }

    // Limpiar formulario
    this.form = {
      clientName: isLoggedIn() ? getUser().name || '' : '',
      clientEmail: isLoggedIn() ? getUser().email || '' : '',
      clientPhone: isLoggedIn() ? getUser().phone || '' : '',
      availabilityId: '',
      notes: '',
    };
    this.isGuest = false;
    this.step = 1;
    this.error = '';
    this.selectedDateTime = null;

    // Refrescar datos
    await this.fetchAvailableSlots();
    await this.fetchQuotes(); // Cargar citas para todos, incluidos administradores

    // Redirigir: para edición, los admins van a /admin; para creación, todos permanecen en /appointment
    if (this.isEditing && this.isAdmin) {
      this.$router.push('/admin');
    } else {
      this.$router.push('/appointment');
    }
  } catch (error) {
    this.error = error.response?.data?.message || 'Error al guardar la cita';
    console.error(error);
  }
},
    async editQuote(quote) {
      this.isEditing = true;
      this.quoteId = quote.id;
      this.form = {
        clientName: quote.client.name,
        clientEmail: quote.client.email,
        clientPhone: quote.client.phone,
        availabilityId: quote.availabilityID,
        notes: quote.notes,
      };
      this.selectedDateTime = `${quote.availability.availableDate.split('T')[0]}T${quote.availability.hour}`;
      this.step = 2; // Mostrar directamente el formulario de edición
    },
    async deleteQuote(id) {
      if (confirm('¿Confirmar eliminación de cita?')) {
        try {
          await axios.delete(`/Quotes/${id}`);
          this.error = '';
          await this.fetchQuotes();
          await this.fetchAvailableSlots();
          alert('Cita eliminada con éxito');
        } catch (error) {
          this.error = error.response?.data?.message || 'Error al eliminar cita';
          console.error(error);
        }
      }
    },
    handleDateSelect(selectInfo) {
      const selectedSlot = this.availableSlots.find(slot => {
        const slotDateTime = new Date(`${slot.availableDate.split('T')[0]}T${slot.hour}`);
        return slotDateTime.getTime() === selectInfo.start.getTime();
      });
      if (selectedSlot) {
        this.form.availabilityId = selectedSlot.id;
        this.selectedDateTime = `${selectedSlot.availableDate.split('T')[0]}T${selectedSlot.hour}`;
        this.error = '';
      } else {
        this.error = 'El horario seleccionado no está disponible.';
      }
    },
    nextStep() {
      if (this.step === 1) {
        if (!this.form.clientName || !this.form.clientEmail || !this.form.clientPhone) {
          this.error = 'Por favor, complete todos los campos.';
          return;
        }
      }
      if (this.step === 2 && !this.form.availabilityId) {
        this.error = 'Por favor, seleccione un horario.';
        return;
      }
      if (this.step < 3) {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
    continueAsGuest() {
      this.isGuest = true;
    },
    formatDateTime(dateTime) {
      if (!dateTime) return 'N/A';
      const date = new Date(dateTime);
      return `${date.toLocaleDateString('es-ES')} ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
}
.card {
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
}
.step.active {
  background-color: #007bff;
}
.btn {
  margin-right: 10px;
}
.text-danger {
  color: red;
}
.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  padding: 10px;
  border-radius: 4px;
}
.card.mb-2 {
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>