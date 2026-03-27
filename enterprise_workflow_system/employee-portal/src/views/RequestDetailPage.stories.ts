import type { Meta, StoryObj } from '@storybook/vue3'
import RequestDetailPage from './RequestDetailPage.vue'

const meta: Meta<typeof RequestDetailPage> = {
  title: 'Pages/RequestDetailPage',
  component: RequestDetailPage,
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
type Story = StoryObj<typeof RequestDetailPage>

export const Default: Story = {}
