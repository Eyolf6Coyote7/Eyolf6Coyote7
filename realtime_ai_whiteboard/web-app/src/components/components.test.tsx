import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BoardThumbnail } from './BoardThumbnail';
import { DemoTooltip } from './DemoTooltip';
import { LanguageToggle } from './LanguageToggle';
import { DemoModal } from './DemoModal';

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

describe('Component render tests', () => {
  it('BoardThumbnail renders without crashing', () => {
    const { container } = withRouter(
      <BoardThumbnail
        board={{ id: '1', title: 'Test', createdAt: '2026-01-01', updatedAt: '2026-01-02' }}
      />,
    );
    expect(container).toBeTruthy();
  });

  it('DemoTooltip renders children', () => {
    const { getByText } = withRouter(
      <DemoTooltip message="hint">
        <span>child</span>
      </DemoTooltip>,
    );
    expect(getByText('child')).toBeTruthy();
  });

  it('LanguageToggle renders without crashing', () => {
    const { container } = withRouter(<LanguageToggle />);
    expect(container).toBeTruthy();
  });

  it('DemoModal renders without crashing', () => {
    const { container } = withRouter(<DemoModal open={false} onClose={vi.fn()} />);
    expect(container).toBeTruthy();
  });
});
