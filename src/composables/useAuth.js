import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

export function useAuth() {
  const authStore = useAuthStore()

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const currentUser = computed(() => authStore.user)
  const userRole = computed(() => authStore.userRole)

  const isAdmin = computed(() => authStore.userRole === 'admin')
  const isGuest = computed(() => authStore.userRole === 'guest')

  const login = (username, password) => {
    return authStore.login(username, password)
  }

  const logout = () => {
    authStore.logout()
  }

  return {
    isAuthenticated,
    currentUser,
    userRole,
    isAdmin,
    isGuest,
    login,
    logout
  }
}
