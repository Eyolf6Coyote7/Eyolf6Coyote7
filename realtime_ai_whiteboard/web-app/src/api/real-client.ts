import type { ApiClient, AuthResponse, Board } from './client.interface';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4001';

let token = '';

export function setToken(t: string) { token = t; }

const headers = () => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const realClient: ApiClient = {
  async register(email, password, displayName) {
    const res = await fetch(`${BASE}/api/web/auth/register`, {
      method: 'POST', headers: headers(),
      body: JSON.stringify({ email, password, displayName }),
    });
    return res.json();
  },
  async login(email, password) {
    const res = await fetch(`${BASE}/api/web/auth/login`, {
      method: 'POST', headers: headers(),
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },
  async getBoards(page = 1) {
    const res = await fetch(`${BASE}/api/web/boards?page=${page}`, { headers: headers() });
    return res.json();
  },
  async createBoard(title, templateId) {
    const res = await fetch(`${BASE}/api/web/boards`, {
      method: 'POST', headers: headers(),
      body: JSON.stringify({ title, templateId }),
    });
    return res.json();
  },
  async getBoard(id) {
    const res = await fetch(`${BASE}/api/web/boards/${id}`, { headers: headers() });
    return res.json();
  },
  async deleteBoard(id) {
    await fetch(`${BASE}/api/web/boards/${id}`, { method: 'DELETE', headers: headers() });
  },
};
