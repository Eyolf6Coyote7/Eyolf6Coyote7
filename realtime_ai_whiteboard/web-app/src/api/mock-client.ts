import type { ApiClient, Board } from './client.interface';

const mockBoards: Board[] = [
  { id: '1', title: 'Sprint Planning', templateId: 'kanban', thumbnailUrl: null, createdAt: '2026-04-01', updatedAt: '2026-04-01' },
  { id: '2', title: 'Product Brainstorm', templateId: null, thumbnailUrl: null, createdAt: '2026-03-28', updatedAt: '2026-04-01' },
  { id: '3', title: 'Retro Q1', templateId: 'retro', thumbnailUrl: null, createdAt: '2026-03-15', updatedAt: '2026-03-20' },
];

export const mockClient: ApiClient = {
  async register() { return { accessToken: 'mock-token', user: { id: '1', email: 'demo@example.com', displayName: 'Demo User', role: 'owner' } }; },
  async login() { return { accessToken: 'mock-token', user: { id: '1', email: 'demo@example.com', displayName: 'Demo User', role: 'owner' } }; },
  async getBoards() { return mockBoards; },
  async createBoard(title, templateId) { return { id: String(Date.now()), title, templateId, thumbnailUrl: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }; },
  async getBoard(id) { return mockBoards.find(b => b.id === id) || mockBoards[0]; },
  async deleteBoard() {},
};
