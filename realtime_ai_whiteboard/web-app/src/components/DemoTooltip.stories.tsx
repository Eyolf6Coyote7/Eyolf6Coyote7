import type { Meta, StoryObj } from '@storybook/react';
import { DemoTooltip } from './DemoTooltip';

const meta: Meta<typeof DemoTooltip> = {
  title: 'Components/DemoTooltip',
  component: DemoTooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof DemoTooltip>;

export const Default: Story = {
  args: { children: <button>Click me</button> },
};
