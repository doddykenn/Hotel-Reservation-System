import { ref } from 'vue'

export function useToast() {
  const toasts = ref([])
  let toastId = 0

  const showToast = (message, type = 'info', duration = 3000) => {
    const id = toastId++
    toasts.value.push({ id, message, type })

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  const removeToast = (id) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const success = (message) => showToast(message, 'success')
  const error = (message) => showToast(message, 'error')
  const warning = (message) => showToast(message, 'warning')
  const info = (message) => showToast(message, 'info')

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
}
