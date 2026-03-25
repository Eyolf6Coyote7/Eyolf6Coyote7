import { realClient } from './real-client';
import { mockClient } from './mock-client';

const useMock = import.meta.env.VITE_MOCK === 'true';
export const api = useMock ? mockClient : realClient;
export { setToken } from './real-client';
export type { ApiClient, Board, User, AuthResponse } from './client.interface';
