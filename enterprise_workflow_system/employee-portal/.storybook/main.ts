import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/vue3-vite', options: {} },
  viteFinal: (config) => {
    config.define = {
      ...config.define,
      'import.meta.env.VITE_MOCK': JSON.stringify('true'),
    }
    return config
  },
}

export default config
