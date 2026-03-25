import type { Meta, StoryObj } from '@storybook/react';
import { CursorPresence } from './CursorPresence';

const meta: Meta<typeof CursorPresence> = {
  title: 'Canvas/CursorPresence',
  component: CursorPresence,
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: 400,
          height: 300,
          background: '#F9FAFB',
          border: '1px solid #E5E7EB',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CursorPresence>;

export const MultipleCursors: Story = {
  args: {
    cursors: [
      { userId: '1', name: 'Alice', color: '#2563EB', x: 100, y: 80 },
      { userId: '2', name: 'Bob', color: '#10B981', x: 250, y: 150 },
      { userId: '3', name: 'Charlie', color: '#F59E0B', x: 180, y: 220 },
    ],
  },
};

export const SingleCursor: Story = {
  args: {
    cursors: [{ userId: '1', name: 'Alice', color: '#2563EB', x: 150, y: 120 }],
  },
};

export const NoCursors: Story = {
  args: { cursors: [] },
};
