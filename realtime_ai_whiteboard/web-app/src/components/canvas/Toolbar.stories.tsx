import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar } from './Toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Canvas/Toolbar',
  component: Toolbar,
  argTypes: {
    activeTool: {
      control: 'select',
      options: ['select', 'rect', 'circle', 'line', 'text', 'sticky', 'freehand'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  args: { activeTool: 'select', onToolChange: () => {} },
};

export const DrawingMode: Story = {
  args: { activeTool: 'freehand', onToolChange: () => {} },
};

export const ShapeMode: Story = {
  args: { activeTool: 'rect', onToolChange: () => {} },
};
