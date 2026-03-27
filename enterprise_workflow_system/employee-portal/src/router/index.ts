import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginPage.vue'),
      meta: { public: true },
    },
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardPage.vue'),
    },
    {
      path: '/requests/new',
      name: 'NewRequest',
      component: () => import('@/views/NewRequestPage.vue'),
    },
    {
      path: '/requests/:id',
      name: 'RequestDetail',
      component: () => import('@/views/RequestDetailPage.vue'),
    },
    {
      path: '/approvals',
      name: 'Approvals',
      component: () => import('@/views/ApprovalQueuePage.vue'),
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('@/views/RequestListPage.vue'),
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/ProfilePage.vue'),
    },
  ],
})

const isMock = import.meta.env.VITE_MOCK === 'true'

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (isMock && !auth.isAuthenticated) {
    await auth.login('demo', 'demo')
  }
  if (!to.meta.public && !auth.isAuthenticated) {
    return { name: 'Login' }
  }
})

export default router
