import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import en from '../src/i18n/en.json'
import zhTW from '../src/i18n/zh-TW.json'

// Load Material Symbols font (same as index.html)
const link = document.createElement('link')
link.href =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)

// Load Inter + Manrope fonts
const fontLink = document.createElement('link')
fontLink.href =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

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
