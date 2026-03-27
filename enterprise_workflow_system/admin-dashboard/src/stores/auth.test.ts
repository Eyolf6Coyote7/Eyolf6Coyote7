import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from './auth'

describe('admin-dashboard auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('should start unauthenticated when no token', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
  })

  it('login should set token and user', () => {
    const store = useAuthStore()
    store.login('admin', 'admin')

    expect(store.token).toBe('mock-jwt-token')
    expect(store.user).toEqual({ name: 'admin', role: 'Admin' })
    expect(store.isAuthenticated).toBe(true)
    expect(localStorage.getItem('admin_token')).toBe('mock-jwt-token')
  })

  it('logout should clear state and localStorage', () => {
    const store = useAuthStore()
    store.login('admin', 'admin')
    store.logout()

    expect(store.token).toBe('')
    expect(store.user).toBeNull()
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem('admin_token')).toBeNull()
  })
})
