<template>
  <div class="dashboard">
    <Navbar title="Guest Dashboard" :username="authStore.user.username" />
    
    <main class="dashboard-content">
      <div class="dashboard-header">
        <h2>My Reservations</h2>
        <button @click="openCreateModal" class="btn-create">
          + Book a Room
        </button>
      </div>

      <div class="info-message" role="status">
        <p>Welcome! You can view your reservations and book new rooms.</p>
      </div>

      <ReservationTable 
        :reservations="reservationsStore.allReservations"
        :can-edit="false"
        :can-delete="false"
      />

      <ReservationForm 
        v-if="showModal"
        :is-edit="false"
        @close="closeModal"
        @submit="handleSubmit"
      />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useReservationsStore } from '../stores/reservations'
import Navbar from '../components/Navbar.vue'
import ReservationTable from '../components/ReservationTable.vue'
import ReservationForm from '../components/ReservationForm.vue'

const authStore = useAuthStore()
const reservationsStore = useReservationsStore()

const showModal = ref(false)

const openCreateModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleSubmit = (formData) => {
  reservationsStore.addReservation(formData)
  closeModal()
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f5f5f5;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.dashboard-header h2 {
  color: #333;
  font-size: 28px;
}

.btn-create {
  padding: 12px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s;
}

.btn-create:hover {
  background: #2980b9;
}

.info-message {
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.info-message p {
  color: #1565c0;
  margin: 0;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .btn-create {
    width: 100%;
  }
}
</style>
