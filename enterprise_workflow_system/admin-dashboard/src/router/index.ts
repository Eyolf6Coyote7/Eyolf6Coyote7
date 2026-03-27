import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginPage.vue'),
      meta: { public: true },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardPage.vue'),
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('@/views/UserManagementPage.vue'),
    },
    {
      path: '/templates',
      name: 'Templates',
      component: () => import('@/views/TemplateListPage.vue'),
    },
    {
      path: '/templates/:id/edit',
      name: 'TemplateEdit',
      component: () => import('@/views/TemplateListPage.vue'),
    },
    {
      path: '/audit-log',
      name: 'AuditLog',
      component: () => import('@/views/AuditLogPage.vue'),
    },
    {
      path: '/feature-flags',
      name: 'FeatureFlags',
      component: () => import('@/views/FeatureTogglesPage.vue'),
    },
    {
      path: '/config',
      name: 'Config',
      component: () => import('@/views/RemoteConfigPage.vue'),
    },
    { path: '/', redirect: '/dashboard' },
  ],
})

const isMock = import.meta.env.VITE_MOCK === 'true'

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (isMock && !auth.isAuthenticated) {
    await auth.login('admin', 'admin')
  }
  if (!to.meta.public && !auth.isAuthenticated) {
    return '/login'
  }
})

export default router
