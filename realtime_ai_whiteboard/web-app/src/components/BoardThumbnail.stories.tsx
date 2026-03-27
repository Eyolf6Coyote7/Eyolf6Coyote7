import type { Meta, StoryObj } from '@storybook/react';
import { BoardThumbnail } from './BoardThumbnail';

const meta: Meta<typeof BoardThumbnail> = {
  title: 'Components/BoardThumbnail',
  component: BoardThumbnail,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BoardThumbnail>;

export const SprintPlanning: Story = { args: { boardId: '1' } };
export const MindMap: Story = { args: { boardId: '2' } };
export const Retrospective: Story = { args: { boardId: '3' } };
export const Architecture: Story = { args: { boardId: '4' } };
export const CheckoutFlow: Story = { args: { boardId: '5' } };
export const DesignSystem: Story = { args: { boardId: '6' } };
export const Fallback: Story = { args: { boardId: 'unknown' } };
