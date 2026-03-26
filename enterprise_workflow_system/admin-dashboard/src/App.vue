<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const showLayout = computed(() => auth.isAuthenticated && route.path !== '/login')

const menuItems = [
  { index: '/dashboard', icon: 'DataLine', title: 'Dashboard' },
  { index: '/users', icon: 'User', title: 'Users' },
  { index: '/templates', icon: 'Document', title: 'Templates' },
  { index: '/audit-log', icon: 'List', title: 'Audit Log' },
  { index: '/feature-flags', icon: 'Flag', title: 'Feature Flags' },
  { index: '/config', icon: 'Setting', title: 'Config' },
]

function handleMenuSelect(index: string) {
  router.push(index)
}

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div v-if="showLayout" class="admin-layout">
    <el-container style="height: 100vh">
      <el-aside width="220px" style="background: #304156">
        <div class="logo">Admin Dashboard</div>
        <el-menu
          :default-active="route.path"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409eff"
          @select="handleMenuSelect"
        >
          <el-menu-item v-for="item in menuItems" :key="item.index" :index="item.index">
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header
          style="
            display: flex;
            align-items: center;
            justify-content: flex-end;
            background: #fff;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
          "
        >
          <span style="margin-right: 16px">{{ auth.user?.name }}</span>
          <el-button type="danger" size="small" @click="handleLogout">Logout</el-button>
        </el-header>
        <el-main style="background: #f0f2f5">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
  <router-view v-else />
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
.logo {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 20px 16px;
  text-align: center;
}
</style>
