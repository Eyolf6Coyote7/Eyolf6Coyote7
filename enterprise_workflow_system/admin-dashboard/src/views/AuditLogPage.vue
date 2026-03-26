<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { api } from '@/api'
import type { AuditEntry } from '@/api'

const auditLog = ref<AuditEntry[]>([])
const search = ref('')

onMounted(async () => {
  auditLog.value = await api.getAuditLog()
})

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return auditLog.value
  return auditLog.value.filter(
    (e) =>
      e.user.toLowerCase().includes(q) ||
      e.action.toLowerCase().includes(q) ||
      e.resource.toLowerCase().includes(q) ||
      e.details.toLowerCase().includes(q),
  )
})
</script>

<template>
  <div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      "
    >
      <h2 style="margin: 0">Audit Log</h2>
      <el-input
        v-model="search"
        placeholder="Search logs..."
        prefix-icon="Search"
        style="width: 300px"
        clearable
      />
    </div>

    <el-table :data="filtered" stripe border>
      <el-table-column prop="id" label="#" width="50" />
      <el-table-column label="Timestamp" width="180">
        <template #default="{ row }">
          {{ new Date(row.timestamp).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="user" label="User" width="140" />
      <el-table-column prop="action" label="Action" width="110">
        <template #default="{ row }">
          <el-tag
            :type="
              row.action === 'Approved'
                ? 'success'
                : row.action === 'Rejected'
                  ? 'danger'
                  : row.action === 'Deleted'
                    ? 'danger'
                    : 'info'
            "
            size="small"
          >
            {{ row.action }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="resource" label="Resource" />
      <el-table-column prop="details" label="Details" />
    </el-table>
  </div>
</template>
