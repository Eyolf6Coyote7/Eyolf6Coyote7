<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/api'
import type { WorkflowRequest } from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'

const approvals = ref<WorkflowRequest[]>([])
const loading = ref(true)

onMounted(async () => {
  approvals.value = await api.getPendingApprovals()
  loading.value = false
})

async function handleApprove(row: WorkflowRequest) {
  await ElMessageBox.confirm(`Approve "${row.title}"?`, 'Confirm Approval', {
    confirmButtonText: 'Approve',
    type: 'success',
  })
  await api.approveRequest(row.id)
  row.status = 'approved'
  ElMessage.success(`${row.id} approved`)
}

async function handleReject(row: WorkflowRequest) {
  await ElMessageBox.confirm(`Reject "${row.title}"?`, 'Confirm Rejection', {
    confirmButtonText: 'Reject',
    confirmButtonClass: 'el-button--danger',
    type: 'warning',
  })
  await api.rejectRequest(row.id)
  row.status = 'rejected'
  ElMessage.warning(`${row.id} rejected`)
}

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
    <h2 style="margin-top: 0">Approval Queue</h2>

    <el-alert
      v-if="!loading && approvals.length === 0"
      title="No pending approvals"
      type="success"
      show-icon
      :closable="false"
      style="margin-bottom: 20px"
    />

    <el-card shadow="never">
      <el-table :data="approvals" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="110" />
        <el-table-column prop="title" label="Title" min-width="200" />
        <el-table-column prop="type" label="Type" width="150">
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
        <el-table-column label="Actions" width="180" fixed="right">
          <template #default="{ row }">
            <template v-if="row.status === 'pending' || row.status === 'in_review'">
              <el-button type="success" size="small" @click="handleApprove(row)">
                Approve
              </el-button>
              <el-button type="danger" size="small" @click="handleReject(row)"> Reject </el-button>
            </template>
            <el-tag v-else :type="statusType(row.status)" size="small">
              {{ statusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
