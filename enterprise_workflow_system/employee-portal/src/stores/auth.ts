import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  username: string
  name: string
  email: string
  role: 'employee' | 'manager' | 'admin'
  department: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!token.value)
  const isManager = computed(() => user.value?.role === 'manager' || user.value?.role === 'admin')

  async function login(username: string, _password: string) {
    // Mock login
    const mockUser: User = {
      id: '1',
      username,
      name: 'Jane Smith',
      email: 'jane.smith@acme.com',
      role: 'manager',
      department: 'Engineering',
    }
    user.value = mockUser
    token.value = 'mock-jwt-token-' + Date.now()
    localStorage.setItem('token', token.value)
    return mockUser
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  // Restore session
  if (token.value) {
    user.value = {
      id: '1',
      username: 'jsmith',
      name: 'Jane Smith',
      email: 'jane.smith@acme.com',
      role: 'manager',
      department: 'Engineering',
    }
  }

  return { user, token, isAuthenticated, isManager, login, logout }
})
