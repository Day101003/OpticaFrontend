<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card w-75">
      <div class="card-body p-4">
        <h5 class="card-title  text-center text-dark fw-bold ">{{ isEditing ? 'Editar Cita' : 'Agendar Cita' }}</h5>
        <hr />
        <!-- Barra de Progreso (solo para creación, no para edición) -->
        <div v-if="!isEditing" class="step-indicator">
          <div :class="['step', { active: step === 1 }]">1</div>
          <div :class="['step', { active: step === 2 }]">2</div>
          <div :class="['step', { active: step === 3 }]">3</div>
        </div>
        <!-- Paso 1: Autenticación o Datos del Cliente (solo para creación) -->
        <div v-if="!isEditing && step === 1" class="p-4 bg-white rounded shadow-sm border">
  <h5 class="mb-4 text-center text-dark fw-bold border-bottom pb-2">
    Información del Cliente
  </h5>

  <div v-if="!isLoggedIn" class="mb-4 text-center">
    <p class="mb-2">¿Ya tienes una cuenta?</p>
    <div class="d-flex justify-content-center gap-2 flex-wrap">
      <button class="btn btn-primary" @click="goToLogin">
        Iniciar Sesión
      </button>
      <button class="btn btn-primary " @click="continueAsGuest">
        Continuar como Cliente
      </button>
    </div>
  </div>

  <form v-if="isLoggedIn || isGuest" class="mt-3" @submit.prevent="nextStep">
    <div class="mb-3">
      <label for="inputName" class="form-label">👤 Nombre</label>
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
      <label for="inputEmail" class="form-label">📧 Correo Electrónico</label>
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

    <div class="mb-4">
      <label for="inputPhone" class="form-label">📱 Teléfono</label>
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

    <div class="text-center">
      <button class="btn btn-primary px-4" type="submit">
        Siguiente 
      </button>
    </div>
  </form>
</div>


        <!-- Paso 2 o Formulario de Edición: Selección de Fecha y Hora + Mis Citas -->
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
          <!-- Lista de Citas (solo para usuarios autenticados no administradores) -->
          <div v-if="isLoggedIn && !isAdmin" class="mt-4">
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
        <!-- Paso 3: Confirmación (solo para creación) -->
      <div v-else-if="!isEditing && step === 3">
  <div class="alert alert-success text-center">
    <h6 class="mb-2">Confirmación de Cita</h6>
    <p class="mb-0">
      Su cita ha sido agendada para el día:
      <strong>{{ selectedDateTime ? formatDateTime(selectedDateTime) : 'N/A' }}</strong>
    </p>
  </div>

  <div class="d-flex justify-content-end gap-2 mt-3">
    <button class="btn btn-secondary" @click="prevStep">Anterior</button>
    <button class="btn btn-primary" @click="submitForm">Confirmar y Guardar</button>
  </div>

  <p v-if="error" class="text-danger mt-2">{{ error }}</p>
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
        initialView: 'timeGridWeek', // Cambiado a vista semanal
        events: [],
        selectable: true,
        select: this.handleDateSelect,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay', // Agregar opción para alternar vistas
        },
        slotMinTime: '07:00:00',
        slotMaxTime: '19:00:00',
        slotDuration: '02:00:00',
        allDaySlot: false,
        height: 'auto',
      },
    };
  },
  computed: {
    isLoggedIn() {
      return isLoggedIn();
    },
  },
  async created() {
    // Verificar si es edición
    const quoteId = this.$route.params.id;
    if (quoteId) {
      this.isEditing = true;
      this.quoteId = quoteId;
      await this.loadQuote(quoteId);
    }

    // Verificar si el usuario es administrador y llenar datos
    if (this.isLoggedIn) {
      const user = getUser();
      this.isAdmin = user && user.role === 'Admin';
      if (user && !this.isEditing) {
        this.form.clientName = user.name || '';
        this.form.clientEmail = user.email || '';
        this.form.clientPhone = user.phone || '';
        if (this.form.clientName && this.form.clientEmail && this.form.clientPhone) {
          this.step = 2; // Saltar al paso 2 para usuarios autenticados
        }
      }
    }

    // Cargar datos
    await this.fetchAvailableSlots();
    if (this.isLoggedIn) {
      await this.fetchQuotes(); // Cargar citas solo para usuarios autenticados
    }
  },
  methods: {
    async fetchAvailableSlots() {
      try {
        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(now.getDate() + 10); // Próximos 10 días

        const slots = [];
        // Obtener meses necesarios (máximo 2 meses si cruza el límite de mes)
        const startYear = now.getFullYear();
        const startMonth = now.getMonth() + 1;
        const endYear = endDate.getFullYear();
        const endMonth = endDate.getMonth() + 1;

        // Solicitar horarios para el mes actual
        const response1 = await axios.get(`/Availabilities/available/${startYear}/${startMonth}`);
        slots.push(...response1.data);

        // Si el rango incluye el próximo mes, hacer otra solicitud
        if (startMonth !== endMonth || startYear !== endYear) {
          const response2 = await axios.get(`/Availabilities/available/${endYear}/${endMonth}`);
          slots.push(...response2.data);
        }

        // Filtrar slots para los próximos 10 días
        this.availableSlots = slots.filter(slot => {
          const slotDate = new Date(slot.availableDate.split('T')[0]);
          return slotDate >= now && slotDate <= endDate;
        });

        console.log('Horarios disponibles:', this.availableSlots);

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
        console.error('Error en fetchAvailableSlots:', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      }
    },
    async fetchQuotes() {
      try {
        const response = await axios.get('/Quotes/user');
        this.quotes = response.data.filter(quote => quote.isActive);
        console.log('Citas cargadas:', this.quotes);
      } catch (error) {
        this.error = 'Error al cargar citas';
        console.error('Error en fetchQuotes:', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
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
        console.error('Error en loadQuote:', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
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

        let response;
        if (this.isEditing) {
          response = await axios.put(`/Quotes/${this.quoteId}`, payload);
          console.log('Respuesta de actualizar cita:', response.data);
          alert('Cita actualizada con éxito');
        } else {
          response = await axios.post('/Quotes', payload);
          console.log('Respuesta de crear cita:', response.data);
          alert('Cita agendada con éxito');
        }

        // Limpiar formulario
        const user = this.isLoggedIn ? getUser() : null;
        this.form = {
          clientName: user ? user.name || '' : '',
          clientEmail: user ? user.email || '' : '',
          clientPhone: user ? user.phone || '' : '',
          availabilityId: '',
          notes: '',
        };
        this.isGuest = false;
        this.step = this.isLoggedIn ? 2 : 1;
        this.error = '';
        this.selectedDateTime = null;

        // Refrescar datos
        await this.fetchAvailableSlots();
        if (this.isLoggedIn) {
          await this.fetchQuotes();
        }

        // Redirigir
        if (this.isAdmin) {
          this.$router.push('/admin');
        } else {
          this.$router.push('/appointment');
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al guardar la cita';
        console.error('Error en submitForm:', error);
        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
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
      this.step = 2;
    },
    async deleteQuote(id) {
      if (confirm('¿Confirmar eliminación de cita?')) {
        try {
          const response = await axios.delete(`/Quotes/${id}`);
          console.log('Respuesta de deleteQuote:', response.status);
          this.error = '';
          await this.fetchQuotes();
          await this.fetchAvailableSlots();
          alert('Cita eliminada con éxito');
        } catch (error) {
          this.error = error.response?.data?.message || 'Error al eliminar cita';
          console.error('Error en deleteQuote:', error);
          if (error.response) {
            console.error('Respuesta del servidor:', error.response.data);
          }
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
/* Estilos modernos para FullCalendar - usando ::deep() para scoped */
:deep(.fc) {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

:deep(.fc-toolbar-title) {
  font-size: 1.25rem;
  font-weight: bold;
  color: #343a40;
}

:deep(.fc-daygrid-day-number),
:deep(.fc-timegrid-slot-label),
:deep(.fc-col-header-cell-cushion) {
  color: #000 !important; /* ⬅️ Cambiar azul a negro */
  font-weight: 500;
  font-size: 1rem;
}

:deep(.fc-button:hover) {
  background-color: #9a9ea5 !important;
}

:deep(.fc-daygrid-day-number),
:deep(.fc-timegrid-slot-label) {
  color: #495057;
}

:deep(.fc-event) {
  background-color: #3a6298 !important;
  border: none !important;
  border-radius: 4px;
  font-size: 0.9rem;
}

:deep(.fc-event-selected),
:deep(.fc-event:focus) {
  outline: 2px solid #0d6efd;
}

:deep(.fc-timegrid-slot) {
  background-color: #ffffff !important;
}
:deep(.fc-event) {
  white-space: normal !important; /* Permitir que el texto se expanda a varias líneas */
  overflow: visible !important;
  min-height: 2.5em !important; /* Aumentar la altura mínima de los eventos */
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
}

:deep(.fc-timegrid-slot) {
  height: 50px !important; /* ⬅️ Altura entre filas */
}

:deep(.fc-timegrid-col) {
  min-width: 110px !important; /* ⬅️ Aumenta el ancho de cada columna del día */
}

</style>