import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../api', () => ({
  api: {
    login: vi.fn(),
    register: vi.fn(),
  },
  setToken: vi.fn(),
}));

import { useAuthStore } from './auth.store';
import { api, setToken } from '../api';

describe('auth.store', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    vi.clearAllMocks();
  });

  it('should have correct initial state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('login should set user, token, and isAuthenticated', async () => {
    const mockResponse = {
      accessToken: 'test-token-123',
      user: { id: '1', role: 'owner' },
    };
    vi.mocked(api.login).mockResolvedValue(mockResponse);

    await useAuthStore.getState().login('test@test.com', 'password');

    const state = useAuthStore.getState();
    expect(api.login).toHaveBeenCalledWith('test@test.com', 'password');
    expect(setToken).toHaveBeenCalledWith('test-token-123');
    expect(state.user).toEqual({ id: '1', role: 'owner' });
    expect(state.token).toBe('test-token-123');
    expect(state.isAuthenticated).toBe(true);
  });

  it('register should set user, token, and isAuthenticated', async () => {
    const mockResponse = {
      accessToken: 'reg-token-456',
      user: { id: '2', role: 'owner' },
    };
    vi.mocked(api.register).mockResolvedValue(mockResponse);

    await useAuthStore.getState().register('new@test.com', 'pass', 'New User');

    const state = useAuthStore.getState();
    expect(api.register).toHaveBeenCalledWith('new@test.com', 'pass', 'New User');
    expect(setToken).toHaveBeenCalledWith('reg-token-456');
    expect(state.isAuthenticated).toBe(true);
  });

  it('logout should clear state and reset token', () => {
    useAuthStore.setState({
      user: { id: '1', role: 'owner' },
      token: 'existing-token',
      isAuthenticated: true,
    });

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(setToken).toHaveBeenCalledWith('');
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
