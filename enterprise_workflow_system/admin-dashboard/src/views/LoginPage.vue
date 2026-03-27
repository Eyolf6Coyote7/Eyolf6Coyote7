<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const username = ref('admin')
const password = ref('admin')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  auth.login(username.value, password.value)
  setTimeout(() => {
    loading.value = false
    router.push('/dashboard')
  }, 300)
}
</script>

<template>
  <div class="login-wrapper">
    <el-card class="login-card" shadow="always">
      <template #header>
        <h2 style="margin: 0; text-align: center">{{ $t('auth.adminLogin') }}</h2>
      </template>
      <el-form @submit.prevent="handleLogin">
        <el-form-item :label="$t('auth.username')">
          <el-input v-model="username" prefix-icon="User" />
        </el-form-item>
        <el-form-item :label="$t('auth.password')">
          <el-input v-model="password" type="password" prefix-icon="Lock" show-password />
        </el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading" style="width: 100%">
          {{ $t('auth.signIn') }}
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.login-card {
  width: 400px;
}
</style>
