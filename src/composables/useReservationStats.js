import { computed } from 'vue'
import { useReservationsStore } from '../stores/reservations'

export function useReservationStats() {
  const reservationsStore = useReservationsStore()

  const totalReservations = computed(() => 
    reservationsStore.allReservations.length
  )

  const confirmedCount = computed(() => 
    reservationsStore.allReservations.filter(r => r.status === 'confirmed').length
  )

  const pendingCount = computed(() => 
    reservationsStore.allReservations.filter(r => r.status === 'pending').length
  )

  const cancelledCount = computed(() => 
    reservationsStore.allReservations.filter(r => r.status === 'cancelled').length
  )

  const getReservationsByStatus = (status) => {
    return reservationsStore.allReservations.filter(r => r.status === status)
  }

  return {
    totalReservations,
    confirmedCount,
    pendingCount,
    cancelledCount,
    getReservationsByStatus
  }
}
