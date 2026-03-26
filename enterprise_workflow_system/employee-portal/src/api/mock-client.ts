export interface WorkflowRequest {
  id: string
  title: string
  type: string
  status: 'pending' | 'approved' | 'rejected' | 'in_review'
  submittedBy: string
  submittedAt: string
  department: string
  amount?: number
  description: string
}

const mockRequests: WorkflowRequest[] = [
  {
    id: 'REQ-001',
    title: 'MacBook Pro M4 Purchase',
    type: 'Equipment Purchase',
    status: 'pending',
    submittedBy: 'Alice Johnson',
    submittedAt: '2026-03-24T09:30:00Z',
    department: 'Engineering',
    amount: 3499,
    description: 'New MacBook Pro M4 for development work. Current machine is 4 years old.',
  },
  {
    id: 'REQ-002',
    title: 'Annual Leave - April 2026',
    type: 'Leave Request',
    status: 'approved',
    submittedBy: 'Bob Williams',
    submittedAt: '2026-03-20T14:15:00Z',
    department: 'Marketing',
    description: 'Requesting 5 days annual leave from April 7-11, 2026.',
  },
  {
    id: 'REQ-003',
    title: 'Conference Travel - React Summit',
    type: 'Travel Request',
    status: 'in_review',
    submittedBy: 'Carol Chen',
    submittedAt: '2026-03-22T11:00:00Z',
    department: 'Engineering',
    amount: 2850,
    description: 'Travel to React Summit in Amsterdam. Flights + 3 nights hotel + conference pass.',
  },
  {
    id: 'REQ-004',
    title: 'Office Supply Restock',
    type: 'Supply Request',
    status: 'approved',
    submittedBy: 'David Park',
    submittedAt: '2026-03-18T08:45:00Z',
    department: 'Operations',
    amount: 420,
    description: 'Monthly office supply restock: paper, toner, pens, sticky notes.',
  },
  {
    id: 'REQ-005',
    title: 'Sick Leave - March 25',
    type: 'Leave Request',
    status: 'rejected',
    submittedBy: 'Eva Martinez',
    submittedAt: '2026-03-25T07:00:00Z',
    department: 'Sales',
    description:
      'Sick leave for March 25. Doctor appointment scheduled. (Rejected: insufficient documentation)',
  },
]

export const mockClient = {
  async getRequests(): Promise<WorkflowRequest[]> {
    await delay(300)
    return [...mockRequests]
  },

  async getRequestById(id: string): Promise<WorkflowRequest | undefined> {
    await delay(200)
    return mockRequests.find((r) => r.id === id)
  },

  async getPendingApprovals(): Promise<WorkflowRequest[]> {
    await delay(300)
    return mockRequests.filter((r) => r.status === 'pending' || r.status === 'in_review')
  },

  async getStats() {
    await delay(200)
    return {
      total: mockRequests.length,
      pending: mockRequests.filter((r) => r.status === 'pending' || r.status === 'in_review')
        .length,
      approved: mockRequests.filter((r) => r.status === 'approved').length,
      rejected: mockRequests.filter((r) => r.status === 'rejected').length,
    }
  },

  async approveRequest(id: string): Promise<WorkflowRequest> {
    await delay(500)
    const req = mockRequests.find((r) => r.id === id)
    if (req) req.status = 'approved'
    return req!
  },

  async rejectRequest(id: string): Promise<WorkflowRequest> {
    await delay(500)
    const req = mockRequests.find((r) => r.id === id)
    if (req) req.status = 'rejected'
    return req!
  },
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
