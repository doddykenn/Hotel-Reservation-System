import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => user.value !== null)
  const userRole = computed(() => user.value?.role || null)

  const login = (username, password) => {
    // Simulated authentication
    if (username === 'admin' && password === 'admin123') {
      user.value = { username: 'admin', role: 'admin' }
      return true
    } else if (username === 'guest' && password === 'guest123') {
      user.value = { username: 'guest', role: 'guest' }
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
  }

  return { user, isAuthenticated, userRole, login, logout }
})
