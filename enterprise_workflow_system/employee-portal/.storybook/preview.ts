import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import en from '../src/i18n/en.json'
import zhTW from '../src/i18n/zh-TW.json'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/dashboard', component: { template: '<div />' } },
    { path: '/login', component: { template: '<div />' } },
    { path: '/requests/new', component: { template: '<div />' } },
    { path: '/requests/:id', component: { template: '<div />' } },
    { path: '/approvals', component: { template: '<div />' } },
    { path: '/history', component: { template: '<div />' } },
    { path: '/profile', component: { template: '<div />' } },
  ],
})

setup((app) => {
  const pinia = createPinia()
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, 'zh-TW': zhTW },
  })

  app.use(pinia)
  app.use(router)
  app.use(ElementPlus)
  app.use(i18n)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
