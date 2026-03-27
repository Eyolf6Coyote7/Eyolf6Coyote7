import axios from 'axios'
import type { User, Template, AuditEntry, KpiData } from './mock-client'

const http = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const realClient = {
  getKpi: () => http.get<KpiData>('/kpi').then((r) => r.data),
  getUsers: () => http.get<User[]>('/users').then((r) => r.data),
  createUser: (u: Omit<User, 'id'>) => http.post<User>('/users', u).then((r) => r.data),
  updateUser: (id: number, u: Partial<User>) =>
    http.put<User>(`/users/${id}`, u).then((r) => r.data),
  deleteUser: (id: number) => http.delete(`/users/${id}`).then((r) => r.data),
  getTemplates: () => http.get<Template[]>('/templates').then((r) => r.data),
  getAuditLog: () => http.get<AuditEntry[]>('/audit-log').then((r) => r.data),
}
