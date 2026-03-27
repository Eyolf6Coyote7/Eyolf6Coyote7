import type { Meta, StoryObj } from '@storybook/react';
import { DemoModal } from './DemoModal';

const meta: Meta<typeof DemoModal> = {
  title: 'Components/DemoModal',
  component: DemoModal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof DemoModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    feature: 'Invite Members',
  },
};

export const DeleteFeature: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    feature: 'Delete Board',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    feature: 'Invite Members',
  },
};
