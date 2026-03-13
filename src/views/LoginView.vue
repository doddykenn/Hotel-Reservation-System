<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Hotel Reservation System</h1>
      <form @submit.prevent="handleLogin" novalidate>
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            id="username"
            v-model="username" 
            type="text"
            required
            aria-required="true"
            aria-describedby="username-hint"
            @input="clearError"
          />
          <small id="username-hint">Enter your username</small>
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password"
            v-model="password" 
            type="password"
            required
            aria-required="true"
            aria-describedby="password-hint"
            @input="clearError"
          />
          <small id="password-hint">Enter your password</small>
        </div>

        <div v-if="error" class="error-message" role="alert" aria-live="polite">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading" class="btn-primary">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div class="demo-credentials">
        <p><strong>Demo Credentials:</strong></p>
        <p>Admin: admin / admin123</p>
        <p>Guest: guest / guest123</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const clearError = () => {
  error.value = ''
}

const handleLogin = async () => {
  error.value = ''
  
  if (!username.value.trim() || !password.value.trim()) {
    error.value = 'Please enter both username and password'
    return
  }

  loading.value = true
  
  setTimeout(() => {
    const success = authStore.login(username.value.trim(), password.value)
    
    if (success) {
      const route = authStore.userRole === 'admin' ? '/admin' : '/guest'
      router.push(route)
    } else {
      error.value = 'Invalid username or password'
    }
    
    loading.value = false
  }, 500)
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

small {
  display: block;
  margin-top: 5px;
  color: #777;
  font-size: 12px;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px solid #fcc;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: #5568d3;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.demo-credentials {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.demo-credentials p {
  margin: 5px 0;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
  
  h1 {
    font-size: 20px;
  }
}
</style>
