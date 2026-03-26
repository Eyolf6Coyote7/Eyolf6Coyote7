import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      nav: {
        dashboard: 'Dashboard',
        newRequest: 'New Request',
        approvals: 'Approvals',
        history: 'History',
        profile: 'Profile',
      },
      auth: {
        login: 'Login',
        logout: 'Logout',
        username: 'Username',
        password: 'Password',
      },
    },
  },
})

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(i18n)

app.mount('#app')
