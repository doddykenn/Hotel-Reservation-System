// Application constants

export const USER_ROLES = {
  ADMIN: 'admin',
  GUEST: 'guest'
}

export const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled'
}

export const ROOM_TYPES = [
  { value: 'Standard', label: 'Standard Room' },
  { value: 'Deluxe', label: 'Deluxe Room' },
  { value: 'Suite', label: 'Suite' }
]

export const DEMO_CREDENTIALS = {
  ADMIN: { username: 'admin', password: 'admin123' },
  GUEST: { username: 'guest', password: 'guest123' }
}
