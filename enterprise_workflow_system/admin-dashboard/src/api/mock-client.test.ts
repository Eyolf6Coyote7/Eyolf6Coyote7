import { describe, it, expect } from 'vitest'
import { mockClient } from './mock-client'

describe('admin-dashboard mockClient', () => {
  it('getKpi should return approval rate data', async () => {
    const kpi = await mockClient.getKpi()
    expect(kpi.approvalRate.approved).toBe(142)
    expect(kpi.approvalRate.rejected).toBe(23)
    expect(kpi.approvalRate.pending).toBe(35)
  })

  it('getKpi should return monthly volume data', async () => {
    const kpi = await mockClient.getKpi()
    expect(kpi.monthlyVolume).toHaveLength(6)
    expect(kpi.monthlyVolume[0].month).toBe('Oct')
  })

  it('getUsers should return 10 users', async () => {
    const users = await mockClient.getUsers()
    expect(users).toHaveLength(10)
    expect(users[0].name).toBe('Alice Chen')
  })

  it('createUser should return user with new id', async () => {
    const newUser = await mockClient.createUser({
      name: 'Test User',
      email: 'test@corp.com',
      role: 'Employee',
      status: 'Active',
      createdAt: '2026-01-01',
    })
    expect(newUser.id).toBeGreaterThan(0)
    expect(newUser.name).toBe('Test User')
  })

  it('updateUser should modify existing user', async () => {
    const updated = await mockClient.updateUser(1, { name: 'Updated Alice' })
    expect(updated.name).toBe('Updated Alice')
  })

  it('deleteUser should remove user from list', async () => {
    const remaining = await mockClient.deleteUser(1)
    expect(remaining.every((u) => u.id !== 1)).toBe(true)
  })

  it('getTemplates should return 5 templates', async () => {
    const templates = await mockClient.getTemplates()
    expect(templates).toHaveLength(5)
    expect(templates[0].name).toBe('Expense Approval')
  })

  it('getAuditLog should return 20 entries', async () => {
    const log = await mockClient.getAuditLog()
    expect(log).toHaveLength(20)
    expect(log[0].id).toBe(1)
  })
})
