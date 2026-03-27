import type { Meta, StoryObj } from '@storybook/vue3'
import NewRequestPage from './NewRequestPage.vue'

const meta: Meta<typeof NewRequestPage> = {
  title: 'Pages/NewRequestPage',
  component: NewRequestPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    () => ({
      template:
        '<div style="padding: 24px; background: #f7f9fc; min-height: 100vh;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof NewRequestPage>

export const Default: Story = {}
