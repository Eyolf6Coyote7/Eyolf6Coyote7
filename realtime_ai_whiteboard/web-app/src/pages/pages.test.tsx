import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { AuthPage } from './AuthPage';
import { DashboardPage } from './DashboardPage';
import { PricingPage } from './PricingPage';
import { AccountSettingsPage } from './AccountSettingsPage';

// Mock zustand stores
vi.mock('../stores/auth.store', () => ({
  useAuthStore: () => ({
    user: { id: '1', role: 'owner' },
    token: 'mock',
    isAuthenticated: true,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
  }),
}));

vi.mock('../stores/board.store', () => ({
  useBoardStore: () => ({
    boards: [{ id: '1', title: 'Test Board', createdAt: '2026-01-01', updatedAt: '2026-01-02' }],
    loading: false,
    fetchBoards: vi.fn(),
    createBoard: vi.fn(),
  }),
}));

vi.mock('../stores/ai.store', () => ({
  useAiStore: () => ({
    messages: [],
    isStreaming: false,
    isOpen: false,
    sendPrompt: vi.fn(),
    togglePanel: vi.fn(),
  }),
}));

const withRouter = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('Page render tests', () => {
  it('LandingPage renders without crashing', () => {
    const { container } = withRouter(<LandingPage />);
    expect(container).toBeTruthy();
  });

  it('AuthPage renders without crashing', () => {
    const { container } = withRouter(<AuthPage />);
    expect(container).toBeTruthy();
  });

  it('DashboardPage renders without crashing', () => {
    const { container } = withRouter(<DashboardPage />);
    expect(container).toBeTruthy();
  });

  it('PricingPage renders without crashing', () => {
    const { container } = withRouter(<PricingPage />);
    expect(container).toBeTruthy();
  });

  it('AccountSettingsPage renders without crashing', () => {
    const { container } = withRouter(<AccountSettingsPage />);
    expect(container).toBeTruthy();
  });
});
