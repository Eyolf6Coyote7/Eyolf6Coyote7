import type { Meta, StoryObj } from '@storybook/vue3'
import ApprovalQueuePage from './ApprovalQueuePage.vue'

const meta: Meta<typeof ApprovalQueuePage> = {
  title: 'Pages/ApprovalQueuePage',
  component: ApprovalQueuePage,
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
type Story = StoryObj<typeof ApprovalQueuePage>

export const Default: Story = {}
