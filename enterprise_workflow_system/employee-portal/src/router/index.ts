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
      component: () => import('@/views/RequestListPage.vue'),
    },
    {
      path: '/requests/:id',
      name: 'RequestDetail',
      component: () => import('@/views/RequestListPage.vue'),
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
      component: () => import('@/views/DashboardPage.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!to.meta.public && !auth.isAuthenticated) {
    return { name: 'Login' }
  }
})

export default router
