<template>
  <nav class="navbar" role="navigation" aria-label="Main navigation">
    <div class="nav-content">
      <h2 class="nav-title">{{ title }}</h2>
      <div class="nav-actions">
        <span class="user-info">Welcome, {{ username }}</span>
        <button @click="handleLogout" class="btn-logout" aria-label="Logout">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

defineProps({
  title: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
})

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background: #2c3e50;
  color: white;
  padding: 15px 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-title {
  font-size: 20px;
  font-weight: bold;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  font-size: 14px;
}

.btn-logout {
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  transition: background 0.3s;
}

.btn-logout:hover {
  background: #c0392b;
}

@media (max-width: 600px) {
  .nav-content {
    flex-direction: column;
    gap: 10px;
  }
  
  .user-info {
    font-size: 12px;
  }
}
</style>
