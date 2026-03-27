<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { api } from '@/api'
import type { AuditEntry } from '@/api'
import DemoTooltip from '@/components/DemoTooltip.vue'

const { t } = useI18n()
const entries = ref<AuditEntry[]>([])
const loading = ref(true)
const eventFilter = ref('all')
const severityFilter = ref('all')

onMounted(async () => {
  entries.value = await api.getAuditLog()
  loading.value = false
})

const filtered = computed(() => entries.value)

function formatTs(iso: string) {
  const d = new Date(iso)
  return (
    d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) +
    ' ' +
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  )
}

function eventColor(action: string) {
  if (action.includes('Approved') || action.includes('Created'))
    return { dot: '#67C23A', label: action, bg: 'rgba(0,96,169,0.1)', color: '#0060A9' }
  if (action.includes('Failed') || action.includes('Deleted'))
    return { dot: '#BA1A1A', label: action, bg: 'rgba(225,133,0,0.2)', color: '#E18500' }
  return { dot: '#0060A9', label: action, bg: 'rgba(0,96,169,0.1)', color: '#0060A9' }
}
</script>

<template>
  <div class="audit-page" v-loading="loading">
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ $t('audit.title') }}</h1>
        <p class="page-sub">{{ $t('audit.subtitle') }}</p>
      </div>
      <DemoTooltip :message="$t('demo.exportRequired')">
        <button class="btn-export">
          {{ $t('audit.export') }}
          <span class="material-symbols-outlined" style="font-size: 10px">expand_more</span>
        </button>
      </DemoTooltip>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="filter-group">
        <label class="fg-label">{{ $t('audit.eventType') }}</label>
        <select v-model="eventFilter" class="fg-select" style="width: 160px">
          <option value="all">{{ $t('audit.allEvents') }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="fg-label">{{ $t('audit.user') }}</label>
        <div class="fg-search">
          <span class="material-symbols-outlined" style="font-size: 11px; color: #404752"
            >search</span
          ><input :placeholder="$t('audit.allUsers')" class="fg-input" />
        </div>
      </div>
      <div class="filter-group">
        <label class="fg-label">{{ $t('audit.dateRange') }}</label>
        <div class="fg-search">
          <span class="material-symbols-outlined" style="font-size: 15px; color: #404752"
            >calendar_today</span
          ><input value="Dec 1, 2024 — Dec 20, 2024" class="fg-input" readonly />
        </div>
      </div>
      <div class="filter-group">
        <label class="fg-label">{{ $t('audit.severity') }}</label>
        <select v-model="severityFilter" class="fg-select" style="width: 100px">
          <option value="all">{{ $t('audit.all') }}</option>
        </select>
      </div>
      <div class="filter-actions">
        <a class="link-reset">{{ $t('audit.reset') }}</a>
        <DemoTooltip :message="$t('demo.filterRequired')">
          <button class="btn-apply">{{ $t('audit.apply') }}</button>
        </DemoTooltip>
      </div>
    </div>

    <!-- Table -->
    <div class="table-card">
      <div class="table-header-row">
        <span class="th-title">{{ $t('audit.recentActivity') }}</span>
        <span class="th-live"><span class="live-dot"></span> {{ $t('audit.live') }}</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>{{ $t('audit.timestamp') }}</th>
            <th>{{ $t('audit.event') }}</th>
            <th>{{ $t('audit.user') }}</th>
            <th>{{ $t('audit.details') }}</th>
            <th>{{ $t('audit.ipAddress') }}</th>
            <th>{{ $t('audit.severity') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="e in filtered"
            :key="e.id"
            :class="{ 'row-warning': e.action.includes('Failed') }"
          >
            <td class="cell-mono">{{ formatTs(e.timestamp) }}</td>
            <td>
              <div class="event-cell">
                <span class="event-dot" :style="{ background: eventColor(e.action).dot }"></span>
                <span class="event-text">{{ e.action }}</span>
              </div>
            </td>
            <td>
              <div class="user-cell-sm">
                <div class="user-dot">{{ e.user.charAt(0) }}</div>
                <span>{{ e.user }}</span>
              </div>
            </td>
            <td class="cell-details">{{ e.details }}</td>
            <td class="cell-mono cell-ip">
              {{ String(e.id).includes('3') ? '45.76.12.203' : '192.168.1.' + ((e.id % 100) + 1) }}
            </td>
            <td>
              <span
                class="severity-tag"
                :style="{ background: eventColor(e.action).bg, color: eventColor(e.action).color }"
              >
                {{ e.action.includes('Failed') ? $t('audit.warning') : $t('audit.info') }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="table-footer">
        <span class="foot-text">Showing 1-15 of 2,847 events</span>
        <div class="pag">
          <button class="pg-btn" disabled>&lt;</button>
          <button class="pg-btn active">1</button>
          <button class="pg-btn">2</button>
          <button class="pg-btn">3</button>
          <span>...</span>
          <button class="pg-btn">190</button>
          <button class="pg-btn">&gt;</button>
        </div>
        <div class="pg-size">
          50 / page
          <span class="material-symbols-outlined" style="font-size: 10px">expand_more</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.audit-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #303133;
  margin: 0;
}
.page-sub {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #404752;
  margin: 4px 0 0;
}
.btn-export {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid rgba(192, 199, 212, 0.4);
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #191c1e;
  cursor: pointer;
}

/* Filter */
.filter-bar {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 16px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.fg-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.55px;
  text-transform: uppercase;
  color: #404752;
  opacity: 0.6;
  padding: 0 4px;
}
.fg-select {
  height: 32px;
  padding: 0 12px;
  background: #f2f4f7;
  border: none;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #191c1e;
}
.fg-search {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 12px;
  background: #f2f4f7;
  border-radius: 4px;
}
.fg-input {
  border: none;
  background: none;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #191c1e;
  outline: none;
  width: 140px;
}
.fg-input::placeholder {
  color: #6b7280;
}
.filter-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
  padding-top: 16px;
}
.link-reset {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #0060a9;
  cursor: pointer;
}
.btn-apply {
  padding: 8px 24px;
  background: #0060a9;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}

/* Table */
.table-card {
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}
.table-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(192, 199, 212, 0.1);
}
.th-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #191c1e;
}
.th-live {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #67c23a;
}
.live-dot {
  width: 8px;
  height: 8px;
  background: #67c23a;
  border-radius: 12px;
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
  padding: 12px 16px;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.55px;
  text-transform: uppercase;
  color: #404752;
  text-align: left;
}
.data-table tbody tr {
  border-top: 1px solid rgba(192, 199, 212, 0.1);
}
.data-table tbody tr:hover {
  background: #fafbfc;
}
.data-table tbody tr.row-warning {
  background: #fffbf0;
}
.data-table td {
  padding: 16px;
  font-size: 13px;
  color: #404752;
}
.cell-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
}
.cell-ip {
  font-family: 'JetBrains Mono', monospace;
}
.cell-details {
  max-width: 200px;
}
.event-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}
.event-dot {
  width: 6px;
  height: 6px;
  border-radius: 12px;
  flex-shrink: 0;
}
.event-text {
  font-weight: 500;
  font-size: 13px;
  color: #191c1e;
}
.user-cell-sm {
  display: flex;
  align-items: center;
  gap: 8px;
}
.user-dot {
  width: 20px;
  height: 20px;
  border-radius: 12px;
  background: #e0e3e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 400;
  color: #191c1e;
}
.severity-tag {
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 11px;
}
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-top: 1px solid rgba(192, 199, 212, 0.1);
}
.foot-text {
  font-size: 12px;
  color: #707784;
}
.pag {
  display: flex;
  gap: 4px;
  align-items: center;
}
.pg-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 12px;
  color: #606266;
  cursor: pointer;
}
.pg-btn.active {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}
.pg-btn:disabled {
  opacity: 0.4;
}
.pg-size {
  font-size: 12px;
  color: #707784;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
