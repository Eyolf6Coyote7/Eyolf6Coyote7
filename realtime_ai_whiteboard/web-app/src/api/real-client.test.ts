import { describe, it, expect, vi, beforeEach } from 'vitest';
import { realClient, setToken } from './real-client';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('realClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setToken('');
  });

  it('setToken should set authorization header for subsequent requests', async () => {
    setToken('my-token');
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    await realClient.getBoards();

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/boards'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer my-token',
        }),
      }),
    );
  });

  it('login should POST to /api/v1/auth/login', async () => {
    const mockResponse = {
      accessToken: 'jwt',
      user: { id: '1', role: 'owner' },
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await realClient.login('a@b.com', 'pass');
    expect(result).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/auth/login'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('register should POST to /api/v1/auth/register', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ accessToken: 'jwt', user: { id: '1', role: 'owner' } }),
    });

    await realClient.register('a@b.com', 'pass', 'User');
    const body = JSON.parse((mockFetch.mock.calls[0][1] as RequestInit).body as string);
    expect(body).toEqual({
      email: 'a@b.com',
      password: 'pass',
      displayName: 'User',
    });
  });

  it('createBoard should POST with title and templateId', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: '1',
          title: 'New',
          createdAt: '',
          updatedAt: '',
        }),
    });

    await realClient.createBoard('New', 'kanban');
    const body = JSON.parse((mockFetch.mock.calls[0][1] as RequestInit).body as string);
    expect(body).toEqual({ title: 'New', templateId: 'kanban' });
  });

  it('should throw on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });

    await expect(realClient.getBoards()).rejects.toThrow('API 401');
  });

  it('deleteBoard should DELETE with encoded id', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(undefined),
    });

    await realClient.deleteBoard('board-123');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/boards/board-123'),
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
