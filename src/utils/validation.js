// Form validation utilities

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validateDate = (date) => {
  return date && !isNaN(new Date(date).getTime())
}

export const validateDateRange = (checkIn, checkOut) => {
  if (!validateDate(checkIn) || !validateDate(checkOut)) {
    return { valid: false, error: 'Invalid dates' }
  }
  
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  
  if (end <= start) {
    return { valid: false, error: 'Check-out must be after check-in' }
  }
  
  return { valid: true }
}

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0
}

export const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, '')
}
