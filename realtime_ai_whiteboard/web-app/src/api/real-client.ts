import type { ApiClient, AuthResponse, Board, AiPromptResponse } from './client.interface';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4001';
let token = '';

export function setToken(t: string) {
  token = t;
}

const headers = () => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { ...init, headers: headers() });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const realClient: ApiClient = {
  register: (email, password, displayName) =>
    request<AuthResponse>('/api/web/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, displayName }),
    }),
  login: (email, password) =>
    request<AuthResponse>('/api/web/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  getBoards: (page = 1) => request<Board[]>(`/api/web/boards?page=${page}`),
  createBoard: (title, templateId) =>
    request<Board>('/api/web/boards', {
      method: 'POST',
      body: JSON.stringify({ title, templateId }),
    }),
  getBoard: (id) => request<Board>(`/api/web/boards/${encodeURIComponent(id)}`),
  deleteBoard: (id) =>
    request<void>(`/api/web/boards/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  submitAiPrompt: (boardId, prompt) =>
    request<AiPromptResponse>('/api/web/ai/prompt', {
      method: 'POST',
      body: JSON.stringify({ boardId, prompt }),
    }),
};
