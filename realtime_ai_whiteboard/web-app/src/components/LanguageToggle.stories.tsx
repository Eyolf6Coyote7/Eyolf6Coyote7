import type { Meta, StoryObj } from '@storybook/react';
import { LanguageToggle } from './LanguageToggle';

const meta: Meta<typeof LanguageToggle> = {
  title: 'Components/LanguageToggle',
  component: LanguageToggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof LanguageToggle>;

export const Default: Story = {};
