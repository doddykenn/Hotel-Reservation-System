import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useReservationsStore = defineStore('reservations', () => {
  const reservations = ref([
    { id: 1, guestName: 'John Doe', roomType: 'Deluxe', checkIn: '2024-02-01', checkOut: '2024-02-05', status: 'confirmed' },
    { id: 2, guestName: 'Jane Smith', roomType: 'Suite', checkIn: '2024-02-10', checkOut: '2024-02-15', status: 'pending' }
  ])

  const nextId = ref(3)

  const allReservations = computed(() => reservations.value)

  const addReservation = (reservation) => {
    reservations.value.push({ ...reservation, id: nextId.value++, status: 'pending' })
  }

  const updateReservation = (id, updatedData) => {
    const index = reservations.value.findIndex(r => r.id === id)
    if (index !== -1) {
      reservations.value[index] = { ...reservations.value[index], ...updatedData }
    }
  }

  const deleteReservation = (id) => {
    reservations.value = reservations.value.filter(r => r.id !== id)
  }

  const getReservationById = (id) => {
    return reservations.value.find(r => r.id === id)
  }

  return { reservations, allReservations, addReservation, updateReservation, deleteReservation, getReservationById }
})
