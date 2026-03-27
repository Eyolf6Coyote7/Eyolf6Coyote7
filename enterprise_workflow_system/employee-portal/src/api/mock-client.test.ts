import { describe, it, expect } from 'vitest'
import { mockClient } from './mock-client'

describe('employee-portal mockClient', () => {
  it('getRequests should return all requests', async () => {
    const requests = await mockClient.getRequests()
    expect(requests.length).toBe(5)
    expect(requests[0].id).toBe('REQ-001')
  })

  it('getRequestById should find existing request', async () => {
    const req = await mockClient.getRequestById('REQ-002')
    expect(req).toBeDefined()
    expect(req!.title).toContain('Annual Leave')
  })

  it('getRequestById should return undefined for unknown id', async () => {
    const req = await mockClient.getRequestById('UNKNOWN')
    expect(req).toBeUndefined()
  })

  it('getPendingApprovals should return pending and in_review', async () => {
    const approvals = await mockClient.getPendingApprovals()
    approvals.forEach((a) => {
      expect(['pending', 'in_review']).toContain(a.status)
    })
    expect(approvals.length).toBeGreaterThan(0)
  })

  it('getStats should return correct counts', async () => {
    const stats = await mockClient.getStats()
    expect(stats.total).toBe(5)
    expect(stats.pending + stats.approved + stats.rejected).toBe(stats.total)
  })

  it('approveRequest should change status to approved', async () => {
    const req = await mockClient.approveRequest('REQ-001')
    expect(req.status).toBe('approved')
  })

  it('rejectRequest should change status to rejected', async () => {
    const req = await mockClient.rejectRequest('REQ-003')
    expect(req.status).toBe('rejected')
  })
})
