<template>
  <div class="modal-overlay" @click.self="$emit('close')" role="dialog" aria-modal="true" aria-labelledby="form-title">
    <div class="modal-content">
      <h3 id="form-title">{{ isEdit ? 'Edit Reservation' : 'New Reservation' }}</h3>
      
      <form @submit.prevent="handleSubmit" novalidate>
        <div class="form-group">
          <label for="guestName">Guest Name</label>
          <input 
            id="guestName"
            v-model="form.guestName" 
            type="text"
            required
            aria-required="true"
          />
        </div>

        <div class="form-group">
          <label for="roomType">Room Type</label>
          <select id="roomType" v-model="form.roomType" required aria-required="true">
            <option value="">Select Room Type</option>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
          </select>
        </div>

        <div class="form-group">
          <label for="checkIn">Check-in Date</label>
          <input 
            id="checkIn"
            v-model="form.checkIn" 
            type="date"
            required
            aria-required="true"
          />
        </div>

        <div class="form-group">
          <label for="checkOut">Check-out Date</label>
          <input 
            id="checkOut"
            v-model="form.checkOut" 
            type="date"
            required
            aria-required="true"
          />
        </div>

        <div v-if="isEdit" class="form-group">
          <label for="status">Status</label>
          <select id="status" v-model="form.status" required aria-required="true">
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div v-if="error" class="error-message" role="alert">
          {{ error }}
        </div>

        <div class="form-actions">
          <button type="button" @click="$emit('close')" class="btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn-primary">
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  reservation: {
    type: Object,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  guestName: '',
  roomType: '',
  checkIn: '',
  checkOut: '',
  status: 'pending'
})

const error = ref('')

watch(() => props.reservation, (newVal) => {
  if (newVal) {
    form.value = { ...newVal }
  }
}, { immediate: true })

const handleSubmit = () => {
  error.value = ''

  if (!form.value.guestName.trim()) {
    error.value = 'Guest name is required'
    return
  }

  if (!form.value.roomType) {
    error.value = 'Room type is required'
    return
  }

  if (!form.value.checkIn || !form.value.checkOut) {
    error.value = 'Check-in and check-out dates are required'
    return
  }

  if (new Date(form.value.checkOut) <= new Date(form.value.checkIn)) {
    error.value = 'Check-out date must be after check-in date'
    return
  }

  emit('submit', { ...form.value })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

h3 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

input:focus, select:focus {
  outline: none;
  border-color: #667eea;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px solid #fcc;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-primary, .btn-secondary {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}
</style>
