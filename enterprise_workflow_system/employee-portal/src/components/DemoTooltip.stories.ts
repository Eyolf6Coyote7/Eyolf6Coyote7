import type { Meta, StoryObj } from '@storybook/vue3'
import DemoTooltip from './DemoTooltip.vue'

const meta: Meta<typeof DemoTooltip> = {
  title: 'Components/DemoTooltip',
  component: DemoTooltip,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
  decorators: [
    () => ({
      template: '<div style="padding: 60px 40px;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof DemoTooltip>

export const Default: Story = {
  render: (args) => ({
    components: { DemoTooltip },
    setup() {
      return { args }
    },
    template: `
      <DemoTooltip v-bind="args">
        <button style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
          Hover me
        </button>
      </DemoTooltip>
    `,
  }),
}

export const CustomMessage: Story = {
  args: {
    message: 'This feature requires a paid subscription',
  },
  render: (args) => ({
    components: { DemoTooltip },
    setup() {
      return { args }
    },
    template: `
      <DemoTooltip v-bind="args">
        <button style="padding: 8px 16px; background: #409eff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Premium Feature
        </button>
      </DemoTooltip>
    `,
  }),
}
