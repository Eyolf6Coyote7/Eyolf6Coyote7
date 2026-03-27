import type { Meta, StoryObj } from '@storybook/vue3'
import RequestListPage from './RequestListPage.vue'

const meta: Meta<typeof RequestListPage> = {
  title: 'Pages/RequestListPage',
  component: RequestListPage,
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
type Story = StoryObj<typeof RequestListPage>

export const Default: Story = {}
