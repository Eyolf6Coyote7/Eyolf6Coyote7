<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const showLayout = computed(() => auth.isAuthenticated)

function handleLogout() {
  auth.logout()
  router.push('/login')
}

const menuItems = [
  { index: '/dashboard', icon: 'grid_view', labelKey: 'nav.dashboard' },
  { index: '/requests/new', icon: 'add_circle_outline', labelKey: 'nav.newRequest' },
  { index: '/approvals', icon: 'checklist', labelKey: 'nav.approvals' },
  { index: '/history', icon: 'history', labelKey: 'nav.history' },
  { index: '/profile', icon: 'person_outline', labelKey: 'nav.profile' },
]
</script>

<template>
  <!-- Login: no shell -->
  <div v-if="!showLayout" class="login-shell">
    <router-view />
  </div>

  <!-- Authenticated: full shell -->
  <div v-else class="app-shell">
    <!-- Top Nav Bar -->
    <header class="top-nav">
      <div class="top-nav-left">
        <div class="top-nav-brand">
          <span class="material-symbols-outlined" style="font-size: 18px; color: #409eff">hub</span>
          <span class="top-nav-brand-text">WorkflowOS</span>
        </div>
        <div class="top-nav-search">
          <span class="material-symbols-outlined search-icon">search</span>
          <input type="text" :placeholder="t('nav.searchPlaceholder')" class="search-input" />
        </div>
      </div>
      <div class="top-nav-right">
        <button class="nav-icon-btn" style="position: relative">
          <span class="material-symbols-outlined">notifications</span>
          <span class="notif-badge"></span>
        </button>
        <span class="nav-divider"></span>
        <div class="user-area" @click="handleLogout">
          <div class="user-info">
            <span class="user-name-text">{{ auth.user?.name || 'User' }}</span>
            <span class="user-role-text">{{ auth.user?.role?.toUpperCase() || 'EMPLOYEE' }}</span>
          </div>
          <div class="user-avatar">
            {{ auth.user?.name?.charAt(0) || 'U' }}
          </div>
        </div>
      </div>
    </header>

    <div class="app-body">
      <!-- Side Nav -->
      <aside class="side-nav">
        <nav class="side-nav-links">
          <router-link
            v-for="item in menuItems"
            :key="item.index"
            :to="item.index"
            :class="[
              'nav-link',
              { active: route.path === item.index || route.path.startsWith(item.index + '/') },
            ]"
          >
            <span class="material-symbols-outlined nav-link-icon">{{ item.icon }}</span>
            <span class="nav-link-label">{{ t(item.labelKey) }}</span>
            <span v-if="item.index === '/approvals'" class="nav-badge">3</span>
          </router-link>
        </nav>
        <div class="side-nav-footer">
          <div class="system-status-box">
            <span class="status-label">{{ t('system.status') }}</span>
            <div class="status-row">
              <span class="status-dot"></span>
              <span class="status-text">{{ t('system.allOperational') }}</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style>
/* ===== Reset & Base ===== */
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* ===== Login Shell ===== */
.login-shell {
  height: 100vh;
}

/* ===== App Shell ===== */
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f7f9fc;
}

/* ===== Top Navigation ===== */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  flex-shrink: 0;
  z-index: 10;
}
.top-nav-left {
  display: flex;
  align-items: center;
  gap: 32px;
}
.top-nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.top-nav-brand-text {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5px;
  color: #0f172a;
}
.top-nav-search {
  position: relative;
  width: 360px;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #c0c7d4;
  pointer-events: none;
}
.search-input {
  width: 100%;
  height: 39px;
  padding: 0 16px 0 40px;
  background: #f2f4f7;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #191c1e;
  outline: none;
  box-sizing: border-box;
}
.search-input::placeholder {
  color: #6b7280;
}
.search-input:focus {
  box-shadow: 0 0 0 2px rgba(0, 96, 169, 0.2);
}
.top-nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.nav-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 36px;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #64748b;
  padding: 0;
}
.nav-icon-btn:hover {
  background: rgba(0, 0, 0, 0.04);
}
.notif-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background: #ba1a1a;
  border: 2px solid #ffffff;
  border-radius: 12px;
}
.nav-divider {
  width: 1px;
  height: 24px;
  background: #e0e3e6;
}
.user-area {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.user-name-text {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #191c1e;
}
.user-role-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #707784;
}
.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #e6e8eb;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #404752;
}

/* ===== App Body ===== */
.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* ===== Side Navigation ===== */
.side-nav {
  display: flex;
  flex-direction: column;
  width: 220px;
  min-width: 220px;
  background: #f8fafc;
  border-right: 1px solid #f1f5f9;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
}
.side-nav-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.15s;
}
.nav-link:hover {
  background: rgba(239, 246, 255, 0.3);
}
.nav-link.active {
  background: rgba(239, 246, 255, 0.5);
}
.nav-link-icon {
  font-size: 18px;
  color: #475569;
}
.nav-link.active .nav-link-icon {
  color: #2563eb;
}
.nav-link-label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #475569;
}
.nav-link.active .nav-link-label {
  color: #2563eb;
}
.nav-badge {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 19px;
  padding: 2px 6px;
  background: #409eff;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 10px;
  line-height: 15px;
  color: #003460;
}
.side-nav-footer {
  margin-top: auto;
  padding-top: 16px;
}
.system-status-box {
  background: #f2f4f7;
  border-radius: 8px;
  padding: 12px;
}
.status-label {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: #707784;
  display: block;
  margin-bottom: 8px;
}
.status-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.status-dot {
  width: 8px;
  height: 8px;
  background: #67c23a;
  border-radius: 12px;
  flex-shrink: 0;
}
.status-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  color: #707784;
}

/* ===== Main Content ===== */
.main-content {
  flex: 1;
  padding: 24px;
  gap: 32px;
  background: #f5f7fa;
  overflow-y: auto;
}
</style>
