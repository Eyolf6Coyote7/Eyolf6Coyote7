import type { Meta, StoryObj } from '@storybook/react';
import { AiChatPanel } from './AiChatPanel';
import { useAiStore } from '../../stores/ai.store';

// Set store state synchronously before each story renders
function initStore(overrides: Partial<ReturnType<typeof useAiStore.getState>>) {
  return (Story: React.ComponentType) => {
    useAiStore.setState({
      messages: [],
      isStreaming: false,
      isOpen: true,
      ...overrides,
    });
    return <Story />;
  };
}

const meta: Meta<typeof AiChatPanel> = {
  title: 'Components/AI/AiChatPanel',
  component: AiChatPanel,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    initStore({ isOpen: true }),
    (Story) => (
      <div style={{ width: 380, height: 520, position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AiChatPanel>;

export const Empty: Story = {
  args: { boardId: 'board-1' },
};

export const WithMessages: Story = {
  args: { boardId: 'board-1' },
  decorators: [
    initStore({
      isOpen: true,
      isStreaming: false,
      messages: [
        { id: '1', role: 'user', content: 'Summarize this board', timestamp: new Date() },
        {
          id: '2',
          role: 'assistant',
          content:
            '**Board Summary**\n\n1. **Sprint Planning** — 3 tasks in progress\n2. **Design Review** — Wireframes approved\n3. **Tech Debt** — Redis caching needs refactor',
          timestamp: new Date(),
        },
      ],
    }),
  ],
};

export const Streaming: Story = {
  args: { boardId: 'board-1' },
  decorators: [
    initStore({
      isOpen: true,
      isStreaming: true,
      messages: [
        {
          id: '1',
          role: 'user',
          content: 'Generate a flowchart for checkout',
          timestamp: new Date(),
        },
      ],
    }),
  ],
};
