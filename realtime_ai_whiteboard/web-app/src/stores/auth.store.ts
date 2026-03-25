import { create } from 'zustand';
import { api, setToken } from '../api';
import type { User } from '../api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, token: null, isAuthenticated: false,
  login: async (email, password) => {
    const res = await api.login(email, password);
    setToken(res.accessToken);
    set({ user: res.user, token: res.accessToken, isAuthenticated: true });
  },
  register: async (email, password, displayName) => {
    const res = await api.register(email, password, displayName);
    setToken(res.accessToken);
    set({ user: res.user, token: res.accessToken, isAuthenticated: true });
  },
  logout: () => { setToken(''); set({ user: null, token: null, isAuthenticated: false }); },
}));
