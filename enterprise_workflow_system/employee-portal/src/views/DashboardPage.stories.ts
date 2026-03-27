import type { Meta, StoryObj } from '@storybook/vue3'
import DashboardPage from './DashboardPage.vue'

const meta: Meta<typeof DashboardPage> = {
  title: 'Pages/DashboardPage',
  component: DashboardPage,
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
type Story = StoryObj<typeof DashboardPage>

export const Default: Story = {}
