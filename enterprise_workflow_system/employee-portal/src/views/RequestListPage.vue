<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/api'
import type { WorkflowRequest } from '@/api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const requests = ref<WorkflowRequest[]>([])
const loading = ref(true)
const search = ref('')
const statusFilter = ref('all')
const typeFilter = ref('all')

onMounted(async () => {
  requests.value = await api.getRequests()
  loading.value = false
})

const filtered = ref<WorkflowRequest[]>([])
watch(
  [requests, search, statusFilter, typeFilter],
  () => {
    const q = search.value.toLowerCase()
    filtered.value = requests.value.filter((r) => {
      const matchSearch =
        r.title.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
      const matchStatus = statusFilter.value === 'all' || r.status === statusFilter.value
      const matchType = typeFilter.value === 'all' || r.type === typeFilter.value
      return matchSearch && matchStatus && matchType
    })
  },
  { immediate: true },
)

function statusStyle(status: string) {
  const map: Record<string, { bg: string; color: string; labelKey: string }> = {
    pending: { bg: '#FDF6EC', color: '#E6A23C', labelKey: 'status.pending' },
    in_review: { bg: '#ECF5FF', color: '#409EFF', labelKey: 'status.inProgress' },
    in_progress: { bg: '#ECF5FF', color: '#409EFF', labelKey: 'status.inProgress' },
    approved: { bg: '#F0F9EB', color: '#67C23A', labelKey: 'status.approved' },
    rejected: { bg: '#FEF0F0', color: '#F56C6C', labelKey: 'status.rejected' },
    escalated: { bg: '#FDF6EC', color: '#E6A23C', labelKey: 'status.escalated' },
  }
  return map[status] || { bg: '#F0F9EB', color: '#67C23A', labelKey: '' }
}

function statusLabel(status: string) {
  const style = statusStyle(status)
  return style.labelKey ? t(style.labelKey) : status.toUpperCase()
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
  <div class="history-page" v-loading="loading">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ t('history.title') }}</h1>
        <p class="page-subtitle">{{ t('history.subtitle') }}</p>
      </div>
      <button class="btn-export">
        <span class="material-symbols-outlined" style="font-size: 12px">download</span>
        {{ t('history.exportCsv') }}
      </button>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="filter-row">
        <select v-model="statusFilter" class="filter-select" style="width: 130px">
          <option value="all">{{ t('history.statusAll') }}</option>
          <option value="pending">{{ t('status.pending') }}</option>
          <option value="in_review">{{ t('status.inProgress') }}</option>
          <option value="approved">{{ t('status.approved') }}</option>
          <option value="rejected">{{ t('status.rejected') }}</option>
        </select>
        <select v-model="typeFilter" class="filter-select" style="width: 150px">
          <option value="all">{{ t('history.typeAll') }}</option>
          <option value="Leave Request">{{ t('types.leave') }}</option>
          <option value="Purchase Order">{{ t('types.purchase') }}</option>
          <option value="Equipment Purchase">{{ t('types.equipment') }}</option>
          <option value="Travel">{{ t('types.travel') }}</option>
        </select>
        <div class="filter-input-wrap" style="width: 210px">
          <span class="material-symbols-outlined fi-icon">calendar_today</span>
          <input type="text" :value="t('history.last30Days')" class="filter-input" readonly />
        </div>
        <div class="filter-input-wrap" style="width: 240px">
          <span class="material-symbols-outlined fi-icon">search</span>
          <input
            v-model="search"
            type="text"
            :placeholder="t('history.searchPlaceholder')"
            class="filter-input"
          />
        </div>
        <button
          class="filter-reset"
          @click="
            statusFilter = 'all'
            typeFilter = 'all'
            search = ''
          "
        >
          {{ t('history.reset') }}
        </button>
      </div>
    </div>

    <!-- Results Summary -->
    <p class="results-summary">
      {{ t('history.showing') }} <strong>1-{{ filtered.length }}</strong> {{ t('history.of') }}
      <strong>{{ filtered.length }}</strong> {{ t('history.requests') }}
    </p>

    <!-- Data Table -->
    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>{{ t('table.requestId') }}</th>
            <th>{{ t('table.type') }}</th>
            <th>{{ t('table.title') }}</th>
            <th>{{ t('table.status') }}</th>
            <th>
              {{ t('table.submitted') }}
              <span
                class="material-symbols-outlined"
                style="font-size: 10px; color: #0060a9; vertical-align: middle"
                >arrow_upward</span
              >
            </th>
            <th>{{ t('table.resolved') }}</th>
            <th>{{ t('table.duration') }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in filtered" :key="row.id" @click="router.push(`/requests/${row.id}`)">
            <td class="cell-id">#{{ row.id }}</td>
            <td class="cell-type">{{ row.type }}</td>
            <td class="cell-title">{{ row.title }}</td>
            <td>
              <span
                class="status-pill"
                :style="{
                  background: statusStyle(row.status).bg,
                  color: statusStyle(row.status).color,
                }"
              >
                {{ statusLabel(row.status) }}
              </span>
            </td>
            <td class="cell-date">{{ formatDate(row.submittedAt) }}</td>
            <td class="cell-date">
              {{
                row.status === 'approved' || row.status === 'rejected'
                  ? formatDate(row.submittedAt)
                  : '—'
              }}
            </td>
            <td class="cell-date">
              {{ row.status === 'approved' ? '2h' : row.status === 'rejected' ? '3d' : '—' }}
            </td>
            <td class="cell-arrow">
              <span class="material-symbols-outlined" style="font-size: 12px; color: #c0c4cc"
                >chevron_right</span
              >
            </td>
          </tr>
          <tr v-if="!filtered.length && !loading">
            <td colspan="8" class="cell-empty">{{ t('history.noRequests') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="filtered.length > 0">
      <select class="page-size">
        <option>20 / page</option>
        <option>50 / page</option>
      </select>
      <div class="page-nav">
        <button class="page-btn" disabled>&lt;</button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn">&gt;</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.6px;
  color: #303133;
  margin: 0;
}
.page-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #909399;
  margin: 4px 0 0;
}
.btn-export {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6.5px 16px;
  background: transparent;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
}

/* Filter Bar */
.filter-bar {
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 16px;
}
.filter-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.filter-select {
  height: 36px;
  padding: 0 12px;
  background: #e6e8eb;
  border: none;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #191c1e;
  appearance: auto;
}
.filter-input-wrap {
  position: relative;
}
.fi-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #404752;
  pointer-events: none;
}
.filter-input {
  width: 100%;
  height: 36px;
  padding: 0 12px 0 40px;
  background: #e6e8eb;
  border: none;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #191c1e;
  outline: none;
  box-sizing: border-box;
}
.filter-input::placeholder {
  color: #6b7280;
}
.filter-reset {
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #909399;
  cursor: pointer;
}

/* Results */
.results-summary {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #909399;
  margin: 0;
}

/* Table */
.table-card {
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  overflow: hidden;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
}
.data-table thead tr {
  background: #f2f4f7;
}
.data-table th {
  padding: 8px 24px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #909399;
  text-align: left;
  white-space: nowrap;
}
.data-table tbody tr {
  border-top: 1px solid #ebeef5;
  cursor: pointer;
  transition: background 0.1s;
}
.data-table tbody tr:first-child {
  border-top: none;
}
.data-table tbody tr:hover {
  background: #f9fafb;
}
.data-table td {
  padding: 15px 24px;
  font-size: 14px;
  line-height: 20px;
  color: #606266;
}
.cell-id {
  font-weight: 500;
  color: #409eff;
}
.cell-type {
  font-weight: 400;
}
.cell-title {
  font-weight: 500;
  color: #191c1e;
  max-width: 180px;
}
.cell-date {
  font-weight: 400;
  font-size: 14px;
}
.cell-arrow {
  text-align: right;
}
.cell-empty {
  text-align: center;
  color: #909399;
  padding: 40px 24px;
}
.status-pill {
  display: inline-flex;
  padding: 2px 10px;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-size {
  height: 32px;
  padding: 0 8px;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #606266;
}
.page-nav {
  display: flex;
  gap: 4px;
}
.page-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
}
.page-btn.active {
  background: #409eff;
  color: #ffffff;
  border-color: #409eff;
}
.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
