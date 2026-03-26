<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'

const router = useRouter()
const auth = useAuthStore()
const loading = ref(false)

const form = reactive({
  username: 'jsmith',
  password: 'demo123',
})

async function handleLogin() {
  loading.value = true
  try {
    await auth.login(form.username, form.password)
    ElMessage.success('Welcome back!')
    router.push('/dashboard')
  } catch {
    ElMessage.error('Login failed')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-card class="login-card" shadow="always">
    <template #header>
      <div class="login-header">
        <el-icon :size="40" color="#409EFF"><Unlock /></el-icon>
        <h2>Employee Portal</h2>
        <p class="login-subtitle">Sign in to your account</p>
      </div>
    </template>

    <el-form :model="form" label-position="top" @submit.prevent="handleLogin">
      <el-form-item label="Username">
        <el-input
          v-model="form.username"
          prefix-icon="User"
          placeholder="Enter username"
          size="large"
        />
      </el-form-item>

      <el-form-item label="Password">
        <el-input
          v-model="form.password"
          type="password"
          prefix-icon="Lock"
          placeholder="Enter password"
          size="large"
          show-password
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          size="large"
          :loading="loading"
          native-type="submit"
          class="login-btn"
        >
          Sign In
        </el-button>
      </el-form-item>
    </el-form>

    <div class="demo-hint">
      <el-tag type="info" size="small">Demo Mode</el-tag>
      <span>Use any credentials to sign in</span>
    </div>
  </el-card>
</template>

<style scoped>
.login-card {
  width: 420px;
  border-radius: 12px;
}

.login-header {
  text-align: center;
}

.login-header h2 {
  margin: 12px 0 4px;
  color: #303133;
}

.login-subtitle {
  color: #909399;
  margin: 0;
  font-size: 14px;
}

.login-btn {
  width: 100%;
}

.demo-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}
</style>
