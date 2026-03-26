<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/api'
import type { WorkflowRequest } from '@/api'

const requests = ref<WorkflowRequest[]>([])
const loading = ref(true)
const search = ref('')

onMounted(async () => {
  requests.value = await api.getRequests()
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

const filtered = ref<WorkflowRequest[]>([])
import { watch } from 'vue'
watch(
  [requests, search],
  () => {
    const q = search.value.toLowerCase()
    filtered.value = requests.value.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.submittedBy.toLowerCase().includes(q),
    )
  },
  { immediate: true },
)
</script>

<template>
  <div v-loading="loading">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      "
    >
      <h2 style="margin: 0">Workflow Requests</h2>
      <el-input
        v-model="search"
        placeholder="Search requests..."
        prefix-icon="Search"
        style="width: 280px"
        clearable
      />
    </div>

    <el-card shadow="never">
      <el-table :data="filtered" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="110" />
        <el-table-column prop="title" label="Title" min-width="220" />
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
        <el-table-column label="Actions" width="100">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              size="small"
              @click="$router.push(`/requests/${row.id}`)"
            >
              View
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
