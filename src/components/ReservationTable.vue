<template>
  <div class="table-container">
    <table role="table" aria-label="Reservations table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Guest Name</th>
          <th scope="col">Room Type</th>
          <th scope="col">Check-in</th>
          <th scope="col">Check-out</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="reservations.length === 0">
          <td colspan="7" class="no-data">No reservations found</td>
        </tr>
        <tr v-for="reservation in reservations" :key="reservation.id">
          <td>{{ reservation.id }}</td>
          <td>{{ reservation.guestName }}</td>
          <td>{{ reservation.roomType }}</td>
          <td>{{ reservation.checkIn }}</td>
          <td>{{ reservation.checkOut }}</td>
          <td>
            <span :class="['status-badge', `status-${reservation.status}`]">
              {{ reservation.status }}
            </span>
          </td>
          <td>
            <div class="action-buttons">
              <button 
                v-if="canEdit"
                @click="$emit('edit', reservation)" 
                class="btn-edit"
                :aria-label="`Edit reservation ${reservation.id}`"
              >
                Edit
              </button>
              <button 
                v-if="canDelete"
                @click="$emit('delete', reservation.id)" 
                class="btn-delete"
                :aria-label="`Delete reservation ${reservation.id}`"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  reservations: {
    type: Array,
    required: true
  },
  canEdit: {
    type: Boolean,
    default: false
  },
  canDelete: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit', 'delete'])
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  font-weight: bold;
  color: #333;
}

tr:hover {
  background: #f8f9fa;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 30px;
}

.status-badge {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  text-transform: capitalize;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-confirmed {
  background: #d4edda;
  color: #155724;
}

.status-cancelled {
  background: #f8d7da;
  color: #721c24;
}

.action-buttons {
  display: flex;
  gap: 5px;
}

.btn-edit, .btn-delete {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.btn-edit {
  background: #3498db;
  color: white;
}

.btn-edit:hover {
  background: #2980b9;
}

.btn-delete {
  background: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background: #c0392b;
}

@media (max-width: 768px) {
  th, td {
    padding: 10px;
    font-size: 12px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
