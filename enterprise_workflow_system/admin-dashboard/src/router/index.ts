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
      component: () => import('@/views/DashboardPage.vue'),
    },
    {
      path: '/config',
      name: 'Config',
      component: () => import('@/views/DashboardPage.vue'),
    },
    { path: '/', redirect: '/dashboard' },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!to.meta.public && !auth.isAuthenticated) {
    return '/login'
  }
})

export default router
