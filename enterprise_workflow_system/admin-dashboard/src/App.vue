<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const { t } = useI18n()

const showLayout = computed(() => auth.isAuthenticated && route.path !== '/login')

const menuItems = [
  { index: '/dashboard', icon: 'grid_view', titleKey: 'nav.dashboard' },
  { index: '/users', icon: 'group', titleKey: 'nav.userManagement' },
  { index: '/templates', icon: 'schema', titleKey: 'nav.workflowTemplates' },
  { index: '/audit-log', icon: 'shield', titleKey: 'nav.auditLog' },
  { index: '/feature-flags', icon: 'toggle_on', titleKey: 'nav.featureToggles' },
  { index: '/config', icon: 'tune', titleKey: 'nav.remoteConfig' },
]

const bottomItems = [
  { index: '#settings', icon: 'settings', titleKey: 'nav.settings' },
  { index: '#support', icon: 'help_outline', titleKey: 'nav.support' },
]

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div v-if="showLayout" class="admin-shell">
    <!-- Top Nav -->
    <header class="top-nav">
      <div class="top-nav-left">
        <span class="top-brand">Executive Architect</span>
        <a class="top-link" @click="router.push('/dashboard')">{{ $t('nav.dashboard') }}</a>
        <a class="top-link">{{ $t('nav.analytics') }}</a>
        <a class="top-link">{{ $t('nav.reports') }}</a>
      </div>
      <div class="top-nav-right">
        <a class="switch-link" @click="handleLogout">{{ $t('nav.switchToPortal') }}</a>
        <span class="admin-label">{{ $t('nav.admin') }}</span>
        <div class="admin-avatar">
          <span class="material-symbols-outlined" style="font-size: 14px; color: #fff">person</span>
        </div>
      </div>
    </header>

    <div class="app-body">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <span class="sidebar-title">{{ $t('nav.adminConsole') }}</span>
          <span class="sidebar-sub">Enterprise Workflow</span>
        </div>
        <nav class="sidebar-nav">
          <router-link
            v-for="item in menuItems"
            :key="item.index"
            :to="item.index"
            :class="[
              'nav-item',
              { active: route.path === item.index || route.path.startsWith(item.index + '/') },
            ]"
          >
            <span class="material-symbols-outlined nav-icon">{{ item.icon }}</span>
            <span class="nav-label">{{ $t(item.titleKey) }}</span>
          </router-link>
        </nav>
        <div class="sidebar-bottom">
          <div class="sidebar-divider"></div>
          <a v-for="item in bottomItems" :key="item.index" class="nav-item">
            <span class="material-symbols-outlined nav-icon">{{ item.icon }}</span>
            <span class="nav-label">{{ $t(item.titleKey) }}</span>
          </a>
        </div>
      </aside>

      <!-- Main -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
  <router-view v-else />
</template>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.admin-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f7f9fc;
}

/* Top Nav */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(6px);
  flex-shrink: 0;
  z-index: 10;
}
.top-nav-left {
  display: flex;
  align-items: center;
  gap: 32px;
}
.top-brand {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #0f172a;
}
.top-link {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  text-decoration: none;
}
.top-link:hover {
  color: #0f172a;
}
.top-nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.switch-link {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #0060a9;
  cursor: pointer;
}
.admin-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #0f172a;
}
.admin-avatar {
  width: 32px;
  height: 32px;
  background: #409eff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* App Body */
.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 220px;
  min-width: 220px;
  background: #f8fafc;
  border-right: 1px solid rgba(226, 232, 240, 0.15);
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  box-sizing: border-box;
}
.sidebar-header {
  padding: 0 24px 32px;
}
.sidebar-title {
  display: block;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.45px;
  color: #1e293b;
}
.sidebar-sub {
  display: block;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #94a3b8;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  height: 48px;
  text-decoration: none;
  transition: background 0.1s;
  color: #475569;
}
.nav-item:hover {
  background: rgba(239, 246, 255, 0.3);
}
.nav-item.active {
  background: #eff6ff;
  border-left: 4px solid #2563eb;
  padding-left: 12px;
}
.nav-icon {
  font-size: 15px;
  color: #475569;
}
.nav-item.active .nav-icon {
  color: #2563eb;
}
.nav-label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.35px;
  color: inherit;
}
.nav-item.active .nav-label {
  color: #2563eb;
}
.sidebar-bottom {
  margin-top: auto;
}
.sidebar-divider {
  height: 1px;
  background: rgba(226, 232, 240, 0.1);
  margin: 16px 0;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 24px;
  background: #f5f7fa;
  overflow-y: auto;
}
</style>
