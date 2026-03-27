import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from './auth'

describe('employee-portal auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('should start unauthenticated when no token in localStorage', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
  })

  it('login should set user and token', async () => {
    const store = useAuthStore()
    const user = await store.login('demo', 'demo')

    expect(user.name).toBe('Jane Smith')
    expect(user.role).toBe('manager')
    expect(store.isAuthenticated).toBe(true)
    expect(store.token).toContain('mock-jwt-token-')
    expect(localStorage.getItem('token')).toBe(store.token)
  })

  it('isManager should be true for manager role', async () => {
    const store = useAuthStore()
    await store.login('demo', 'demo')
    expect(store.isManager).toBe(true)
  })

  it('logout should clear user and token', async () => {
    const store = useAuthStore()
    await store.login('demo', 'demo')
    store.logout()

    expect(store.user).toBeNull()
    expect(store.token).toBeNull()
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('should restore session from localStorage token', () => {
    localStorage.setItem('token', 'existing-token')
    const store = useAuthStore()

    expect(store.isAuthenticated).toBe(true)
    expect(store.user).not.toBeNull()
    expect(store.user!.username).toBe('jsmith')
  })
})
