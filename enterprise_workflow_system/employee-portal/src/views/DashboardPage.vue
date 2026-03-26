<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/api'
import type { WorkflowRequest } from '@/api'

const stats = ref({ total: 0, pending: 0, approved: 0, rejected: 0 })
const recentRequests = ref<WorkflowRequest[]>([])
const loading = ref(true)

onMounted(async () => {
  const [s, r] = await Promise.all([api.getStats(), api.getRequests()])
  stats.value = s
  recentRequests.value = r.slice(0, 5)
  loading.value = false
})

function statusType(status: string) {
  const map: Record<string, string> = {
    pending: 'warning',
    in_review: 'info',
    approved: 'success',
    rejected: 'danger',
  }
  return map[status] || 'info'
}

function statusLabel(status: string) {
  return status.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <div v-loading="loading">
    <h2 style="margin-top: 0">Dashboard</h2>

    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card stat-total">
          <el-statistic title="Total Requests" :value="stats.total">
            <template #prefix
              ><el-icon><Document /></el-icon
            ></template>
          </el-statistic>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card stat-pending">
          <el-statistic title="Pending" :value="stats.pending">
            <template #prefix
              ><el-icon color="#E6A23C"><Clock /></el-icon
            ></template>
          </el-statistic>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card stat-approved">
          <el-statistic title="Approved" :value="stats.approved">
            <template #prefix
              ><el-icon color="#67C23A"><CircleCheck /></el-icon
            ></template>
          </el-statistic>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card stat-rejected">
          <el-statistic title="Rejected" :value="stats.rejected">
            <template #prefix
              ><el-icon color="#F56C6C"><CircleClose /></el-icon
            ></template>
          </el-statistic>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never" style="margin-top: 24px">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span style="font-weight: 600">Recent Requests</span>
          <el-button type="primary" text @click="$router.push('/history')">View All</el-button>
        </div>
      </template>

      <el-table :data="recentRequests" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="110" />
        <el-table-column prop="title" label="Title" min-width="200" />
        <el-table-column prop="type" label="Type" width="160">
          <template #default="{ row }">
            <el-tag size="small" effect="plain">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="submittedBy" label="Submitted By" width="150" />
        <el-table-column prop="submittedAt" label="Date" width="130">
          <template #default="{ row }">{{ formatDate(row.submittedAt) }}</template>
        </el-table-column>
        <el-table-column prop="amount" label="Amount" width="110">
          <template #default="{ row }">
            {{ row.amount ? `$${row.amount.toLocaleString()}` : '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="120">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)" size="small">
              {{ statusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.stats-row {
  margin-bottom: 8px;
}

.stat-card {
  border-radius: 8px;
}
</style>
