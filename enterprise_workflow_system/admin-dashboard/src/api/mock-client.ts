export interface User {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Manager' | 'Employee'
  status: 'Active' | 'Inactive'
  createdAt: string
}

export interface Template {
  id: number
  name: string
  description: string
  stepsCount: number
  status: 'Published' | 'Draft'
  updatedAt: string
}

export interface AuditEntry {
  id: number
  timestamp: string
  user: string
  action: string
  resource: string
  details: string
}

export interface KpiData {
  approvalRate: { approved: number; rejected: number; pending: number }
  monthlyVolume: { month: string; count: number }[]
  avgProcessingTime: { month: string; hours: number }[]
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Alice Chen',
    email: 'alice@corp.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2025-01-10',
  },
  {
    id: 2,
    name: 'Bob Martinez',
    email: 'bob@corp.com',
    role: 'Manager',
    status: 'Active',
    createdAt: '2025-02-14',
  },
  {
    id: 3,
    name: 'Carol Wu',
    email: 'carol@corp.com',
    role: 'Employee',
    status: 'Active',
    createdAt: '2025-03-01',
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david@corp.com',
    role: 'Employee',
    status: 'Inactive',
    createdAt: '2025-03-12',
  },
  {
    id: 5,
    name: 'Eva Johansson',
    email: 'eva@corp.com',
    role: 'Manager',
    status: 'Active',
    createdAt: '2025-04-05',
  },
  {
    id: 6,
    name: 'Frank Osei',
    email: 'frank@corp.com',
    role: 'Employee',
    status: 'Active',
    createdAt: '2025-05-18',
  },
  {
    id: 7,
    name: 'Grace Lee',
    email: 'grace@corp.com',
    role: 'Employee',
    status: 'Active',
    createdAt: '2025-06-22',
  },
  {
    id: 8,
    name: 'Hector Ruiz',
    email: 'hector@corp.com',
    role: 'Manager',
    status: 'Active',
    createdAt: '2025-07-09',
  },
  {
    id: 9,
    name: 'Iris Patel',
    email: 'iris@corp.com',
    role: 'Employee',
    status: 'Inactive',
    createdAt: '2025-08-30',
  },
  {
    id: 10,
    name: 'Jake Nguyen',
    email: 'jake@corp.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2025-09-15',
  },
]

const mockTemplates: Template[] = [
  {
    id: 1,
    name: 'Expense Approval',
    description: 'Standard expense reimbursement workflow',
    stepsCount: 4,
    status: 'Published',
    updatedAt: '2025-11-01',
  },
  {
    id: 2,
    name: 'Leave Request',
    description: 'PTO and leave request approval',
    stepsCount: 3,
    status: 'Published',
    updatedAt: '2025-11-10',
  },
  {
    id: 3,
    name: 'Purchase Order',
    description: 'Purchase order creation and approval',
    stepsCount: 5,
    status: 'Published',
    updatedAt: '2025-12-01',
  },
  {
    id: 4,
    name: 'Onboarding',
    description: 'New employee onboarding checklist',
    stepsCount: 8,
    status: 'Draft',
    updatedAt: '2026-01-15',
  },
  {
    id: 5,
    name: 'IT Access Request',
    description: 'System and tool access provisioning',
    stepsCount: 3,
    status: 'Published',
    updatedAt: '2026-02-20',
  },
]

const actions = ['Created', 'Updated', 'Approved', 'Rejected', 'Deleted', 'Viewed', 'Exported']
const resources = [
  'Expense #1042',
  'Leave Request #887',
  'User alice@corp.com',
  'Template "Onboarding"',
  'PO #3301',
  'Config smtp_host',
  'Feature flag dark_mode',
]

const mockAuditLog: AuditEntry[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  timestamp: new Date(2026, 2, 26 - i, 10 + (i % 8), i * 3).toISOString(),
  user: mockUsers[i % mockUsers.length].name,
  action: actions[i % actions.length],
  resource: resources[i % resources.length],
  details: `Performed ${actions[i % actions.length].toLowerCase()} on ${resources[i % resources.length]}`,
}))

const mockKpi: KpiData = {
  approvalRate: { approved: 142, rejected: 23, pending: 35 },
  monthlyVolume: [
    { month: 'Oct', count: 45 },
    { month: 'Nov', count: 62 },
    { month: 'Dec', count: 38 },
    { month: 'Jan', count: 71 },
    { month: 'Feb', count: 56 },
    { month: 'Mar', count: 68 },
  ],
  avgProcessingTime: [
    { month: 'Oct', hours: 18.2 },
    { month: 'Nov', hours: 15.7 },
    { month: 'Dec', hours: 22.1 },
    { month: 'Jan', hours: 12.4 },
    { month: 'Feb', hours: 10.8 },
    { month: 'Mar', hours: 9.3 },
  ],
}

function delay<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), 200))
}

export const mockClient = {
  getKpi: () => delay(mockKpi),
  getUsers: () => delay([...mockUsers]),
  createUser: (u: Omit<User, 'id'>) => delay({ ...u, id: mockUsers.length + 1 } as User),
  updateUser: (id: number, u: Partial<User>) => {
    const idx = mockUsers.findIndex((x) => x.id === id)
    if (idx >= 0) Object.assign(mockUsers[idx], u)
    return delay(mockUsers[idx])
  },
  deleteUser: (id: number) => delay(mockUsers.filter((x) => x.id !== id)),
  getTemplates: () => delay([...mockTemplates]),
  getAuditLog: () => delay([...mockAuditLog]),
}
