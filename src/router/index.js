import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import GuestDashboard from '../views/GuestDashboard.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView, meta: { requiresGuest: true } },
  { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/guest', component: GuestDashboard, meta: { requiresAuth: true, role: 'guest' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next(authStore.userRole === 'admin' ? '/admin' : '/guest')
  } else if (to.meta.role && authStore.userRole !== to.meta.role) {
    next('/')
  } else {
    next()
  }
})

export default router
