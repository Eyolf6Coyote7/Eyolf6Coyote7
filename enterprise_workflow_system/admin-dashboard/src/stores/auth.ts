import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('admin_token') || '')
  const user = ref<{ name: string; role: string } | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function login(username: string, _password: string) {
    token.value = 'mock-jwt-token'
    user.value = { name: username, role: 'Admin' }
    localStorage.setItem('admin_token', token.value)
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('admin_token')
  }

  return { token, user, isAuthenticated, login, logout }
})
