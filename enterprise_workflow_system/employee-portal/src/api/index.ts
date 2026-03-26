import { mockClient } from './mock-client'
import { realClient } from './real-client'

const useMock = import.meta.env.VITE_MOCK === 'true'

export const api = useMock ? mockClient : realClient
export type { WorkflowRequest } from './mock-client'
