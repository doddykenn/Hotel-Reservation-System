<template>
  <div class="dashboard">
    <Navbar title="Admin Dashboard" :username="authStore.user.username" />
    
    <main class="dashboard-content">
      <div class="dashboard-header">
        <h2>Manage Reservations</h2>
        <button @click="openCreateModal" class="btn-create">
          + New Reservation
        </button>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Reservations</h3>
          <p class="stat-number">{{ totalReservations }}</p>
        </div>
        <div class="stat-card">
          <h3>Confirmed</h3>
          <p class="stat-number">{{ confirmedCount }}</p>
        </div>
        <div class="stat-card">
          <h3>Pending</h3>
          <p class="stat-number">{{ pendingCount }}</p>
        </div>
        <div class="stat-card">
          <h3>Cancelled</h3>
          <p class="stat-number">{{ cancelledCount }}</p>
        </div>
      </div>

      <ReservationTable 
        :reservations="reservationsStore.allReservations"
        :can-edit="true"
        :can-delete="true"
        @edit="openEditModal"
        @delete="handleDelete"
      />

      <ReservationForm 
        v-if="showModal"
        :reservation="selectedReservation"
        :is-edit="isEdit"
        @close="closeModal"
        @submit="handleSubmit"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useReservationsStore } from '../stores/reservations'
import Navbar from '../components/Navbar.vue'
import ReservationTable from '../components/ReservationTable.vue'
import ReservationForm from '../components/ReservationForm.vue'

const authStore = useAuthStore()
const reservationsStore = useReservationsStore()

const showModal = ref(false)
const isEdit = ref(false)
const selectedReservation = ref(null)

const totalReservations = computed(() => reservationsStore.allReservations.length)
const confirmedCount = computed(() => 
  reservationsStore.allReservations.filter(r => r.status === 'confirmed').length
)
const pendingCount = computed(() => 
  reservationsStore.allReservations.filter(r => r.status === 'pending').length
)
const cancelledCount = computed(() => 
  reservationsStore.allReservations.filter(r => r.status === 'cancelled').length
)

const openCreateModal = () => {
  isEdit.value = false
  selectedReservation.value = null
  showModal.value = true
}

const openEditModal = (reservation) => {
  isEdit.value = true
  selectedReservation.value = { ...reservation }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedReservation.value = null
}

const handleSubmit = (formData) => {
  if (isEdit.value) {
    reservationsStore.updateReservation(formData.id, formData)
  } else {
    reservationsStore.addReservation(formData)
  }
  closeModal()
}

const handleDelete = (id) => {
  if (confirm('Are you sure you want to delete this reservation?')) {
    reservationsStore.deleteReservation(id)
  }
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
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s;
}

.btn-create:hover {
  background: #229954;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-card h3 {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
  color: #333;
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
