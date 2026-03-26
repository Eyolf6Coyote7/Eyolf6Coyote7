<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const showLayout = computed(() => auth.isAuthenticated)

function handleLogout() {
  auth.logout()
  router.push('/login')
}

const menuItems = [
  { index: '/dashboard', icon: 'Odometer', label: 'Dashboard' },
  { index: '/requests/new', icon: 'DocumentAdd', label: 'New Request' },
  { index: '/approvals', icon: 'Checked', label: 'Approvals' },
  { index: '/history', icon: 'Clock', label: 'History' },
  { index: '/profile', icon: 'User', label: 'Profile' },
]
</script>

<template>
  <div v-if="!showLayout" class="login-wrapper">
    <router-view />
  </div>

  <el-container v-else class="app-layout">
    <el-aside width="220px" class="app-aside">
      <div class="logo-area">
        <el-icon :size="28" color="#409EFF"><Briefcase /></el-icon>
        <span class="logo-text">Employee Portal</span>
      </div>
      <el-menu
        :default-active="$route.path"
        router
        background-color="#1d1e1f"
        text-color="#bbb"
        active-text-color="#409EFF"
      >
        <el-menu-item v-for="item in menuItems" :key="item.index" :index="item.index">
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="app-header">
        <div class="header-left">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown trigger="click">
            <span class="user-dropdown">
              <el-avatar :size="32" class="user-avatar">
                {{ auth.user?.name?.charAt(0) }}
              </el-avatar>
              <span class="user-name">{{ auth.user?.name }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/profile')">Profile</el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="app-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.login-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app-layout {
  height: 100vh;
}

.app-aside {
  background: #1d1e1f;
  border-right: 1px solid #333;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 16px;
  border-bottom: 1px solid #333;
}

.logo-text {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e4e7ed;
  background: #fff;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.user-name {
  font-size: 14px;
  color: #303133;
}

.app-main {
  background: #f5f7fa;
}
</style>
