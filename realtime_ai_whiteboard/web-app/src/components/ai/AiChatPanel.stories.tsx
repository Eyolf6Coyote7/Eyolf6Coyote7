import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { AiChatPanel } from './AiChatPanel';
import { useAiStore } from '../../stores/ai.store';

/** Helper decorator that sets Zustand store state before rendering */
function withAiStoreState(overrides: Partial<ReturnType<typeof useAiStore.getState>>) {
  return (Story: React.ComponentType) => {
    useEffect(() => {
      useAiStore.setState(overrides);
      return () => useAiStore.setState({ messages: [], isStreaming: false, isOpen: false });
    }, []);
    return <Story />;
  };
}

const meta: Meta<typeof AiChatPanel> = {
  title: 'Components/AI/AiChatPanel',
  component: AiChatPanel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
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
  decorators: [withAiStoreState({ isOpen: true, messages: [], isStreaming: false })],
};

export const WithMessages: Story = {
  args: { boardId: 'board-1' },
  decorators: [
    withAiStoreState({
      isOpen: true,
      isStreaming: false,
      messages: [
        {
          id: '1',
          role: 'user',
          content: 'Summarize this board',
          timestamp: new Date(),
        },
        {
          id: '2',
          role: 'assistant',
          content:
            '**Board Summary**\n\n1. **Sprint Planning** - 3 tasks in progress\n2. **Design Review** - Wireframes approved\n3. **Tech Debt** - Redis caching needs refactor',
          timestamp: new Date(),
        },
      ],
    }),
  ],
};

export const Streaming: Story = {
  args: { boardId: 'board-1' },
  decorators: [
    withAiStoreState({
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

export const Closed: Story = {
  args: { boardId: 'board-1' },
  decorators: [withAiStoreState({ isOpen: false, messages: [], isStreaming: false })],
};
