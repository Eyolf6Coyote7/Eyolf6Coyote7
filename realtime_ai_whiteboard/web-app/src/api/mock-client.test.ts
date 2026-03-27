import { describe, it, expect } from 'vitest';
import { mockClient } from './mock-client';

describe('mockClient', () => {
  it('login should return mock token and user', async () => {
    const result = await mockClient.login('test@test.com', 'pass');
    expect(result.accessToken).toBe('mock-token');
    expect(result.user).toEqual({ id: '1', role: 'owner' });
  });

  it('register should return mock token and user', async () => {
    const result = await mockClient.register('a@b.com', 'pass', 'Test');
    expect(result.accessToken).toBe('mock-token');
    expect(result.user.id).toBe('1');
  });

  it('getBoards should return 6 boards', async () => {
    const boards = await mockClient.getBoards();
    expect(boards).toHaveLength(6);
    expect(boards[0].title).toBe('Sprint Planning');
  });

  it('createBoard should return a board with generated id', async () => {
    const board = await mockClient.createBoard('Test Board');
    expect(board.title).toBe('Test Board');
    expect(board.id).toBeDefined();
    expect(board.createdAt).toBeDefined();
  });

  it('createBoard should include templateId when provided', async () => {
    const board = await mockClient.createBoard('Kanban', 'kanban');
    expect(board.templateId).toBe('kanban');
  });

  it('getBoard should return board by id', async () => {
    const board = await mockClient.getBoard('2');
    expect(board.title).toBe('Product Brainstorm');
  });

  it('getBoard should return first board for unknown id', async () => {
    const board = await mockClient.getBoard('unknown');
    expect(board.title).toBe('Sprint Planning');
  });

  it('deleteBoard should resolve without error', async () => {
    await expect(mockClient.deleteBoard('1')).resolves.toBeUndefined();
  });

  it('submitAiPrompt should return a taskId', async () => {
    const result = await mockClient.submitAiPrompt('board-1', 'test');
    expect(result.taskId).toContain('mock-');
  });
});
