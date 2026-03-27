import type { Meta, StoryObj } from '@storybook/react';
import { BoardSettingsModal } from './BoardSettingsModal';

const meta: Meta<typeof BoardSettingsModal> = {
  title: 'Components/BoardSettingsModal',
  component: BoardSettingsModal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof BoardSettingsModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

export const CustomBoardName: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    boardName: 'Sprint Retro Q4',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
};
