<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/api'
import type { WorkflowRequest } from '@/api'
import { useI18n } from 'vue-i18n'
import DemoTooltip from '@/components/DemoTooltip.vue'

const { t } = useI18n()
const router = useRouter()
const loading = ref(true)
const recentRequests = ref<WorkflowRequest[]>([])

const statsCards = ref([
  {
    labelKey: 'dashboard.pendingApprovals',
    value: '5',
    badgeKey: 'dashboard.needsAction',
    iconBg: 'rgba(139,80,0,0.1)',
    iconColor: '#8B5000',
    icon: 'pending_actions',
    valueColor: '#409EFF',
  },
  {
    labelKey: 'dashboard.myActiveRequests',
    value: '12',
    badgeKey: 'dashboard.ongoing',
    iconBg: 'rgba(0,96,169,0.1)',
    iconColor: '#0060A9',
    icon: 'description',
    valueColor: '#303133',
  },
  {
    labelKey: 'dashboard.approvedThisMonth',
    value: '28',
    badgeKey: 'dashboard.efficiency',
    iconBg: 'rgba(103,194,58,0.1)',
    iconColor: '#67C23A',
    icon: 'check_circle',
    valueColor: '#67C23A',
  },
  {
    labelKey: 'dashboard.avgResponseTime',
    value: '4.2h',
    badgeKey: 'dashboard.velocity',
    iconBg: 'rgba(192,199,212,0.1)',
    iconColor: '#707784',
    icon: 'schedule',
    valueColor: '#303133',
  },
])

const quickActions = [
  { labelKey: 'dashboard.submitLeave', icon: 'event_note', route: '/requests/new' },
  { labelKey: 'dashboard.submitPurchase', icon: 'shopping_cart', route: '/requests/new' },
  { labelKey: 'dashboard.viewOrgChart', icon: 'groups', route: '/profile' },
]

onMounted(async () => {
  try {
    const r = await api.getRequests()
    recentRequests.value = r.slice(0, 5)
  } catch {
    // use empty data
  } finally {
    loading.value = false
  }
})

function statusStyle(status: string) {
  const map: Record<string, { bg: string; color: string; labelKey: string }> = {
    pending: { bg: '#FFDCBE', color: '#4E2A00', labelKey: 'status.pending' },
    in_review: { bg: '#B7D4FE', color: '#003460', labelKey: 'status.inProgress' },
    in_progress: { bg: '#B7D4FE', color: '#003460', labelKey: 'status.inProgress' },
    approved: { bg: '#DCFCE7', color: '#15803D', labelKey: 'status.approved' },
    rejected: { bg: '#FFDAD6', color: '#93000A', labelKey: 'status.rejected' },
  }
  return map[status] || { bg: '#E6E8EB', color: '#404752', labelKey: '' }
}

function statusLabel(status: string) {
  const style = statusStyle(status)
  return style.labelKey ? t(style.labelKey) : status.toUpperCase()
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 24) return `${hours} ${t('dashboard.hoursAgo')}`
  if (hours < 48) return t('dashboard.yesterday')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="dashboard" v-loading="loading">
    <!-- Stats Cards Row -->
    <div class="stats-row">
      <div v-for="card in statsCards" :key="card.labelKey" class="stat-card">
        <div class="stat-card-top">
          <div class="stat-icon" :style="{ background: card.iconBg }">
            <span
              class="material-symbols-outlined"
              :style="{ color: card.iconColor, fontSize: '20px' }"
              >{{ card.icon }}</span
            >
          </div>
          <span class="stat-badge">{{ t(card.badgeKey) }}</span>
        </div>
        <div class="stat-card-bottom">
          <span class="stat-value" :style="{ color: card.valueColor }">{{ card.value }}</span>
          <span class="stat-label">{{ t(card.labelKey) }}</span>
        </div>
      </div>
    </div>

    <!-- Recent Requests Table -->
    <div class="recent-card">
      <div class="recent-header">
        <h3 class="recent-title">{{ t('dashboard.myRecentRequests') }}</h3>
        <a class="view-all-link" @click="router.push('/history')">
          {{ t('dashboard.viewAll') }}
          <span class="material-symbols-outlined" style="font-size: 10px">arrow_forward</span>
        </a>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>{{ t('table.requestId') }}</th>
              <th>{{ t('table.type') }}</th>
              <th>{{ t('table.title') }}</th>
              <th>{{ t('table.status') }}</th>
              <th>{{ t('table.submitted') }}</th>
              <th>{{ t('table.assignee') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in recentRequests"
              :key="row.id"
              @click="router.push(`/requests/${row.id}`)"
            >
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
              <td class="cell-assignee">
                <span class="assignee-avatar">{{ row.submittedBy?.charAt(0) || '?' }}</span>
                {{ row.submittedBy }}
              </td>
            </tr>
            <tr v-if="!recentRequests.length && !loading">
              <td colspan="6" class="cell-empty">{{ t('dashboard.noRequestsYet') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions">
      <span class="quick-label">{{ t('dashboard.fastAccess') }}</span>
      <div class="quick-btns">
        <DemoTooltip
          v-for="action in quickActions"
          :key="action.labelKey"
          :message="t('demo.submitRequired')"
        >
          <button class="quick-btn" @click="router.push(action.route)">
            <span class="material-symbols-outlined" style="font-size: 18px; color: #0060a9">{{
              action.icon
            }}</span>
            {{ t(action.labelKey) }}
          </button>
        </DemoTooltip>
      </div>
    </div>

    <!-- FAB -->
    <button class="fab" @click="router.push('/requests/new')">
      <span class="material-symbols-outlined" style="font-size: 16px; color: #fff">add</span>
    </button>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
}

/* ===== Stats Row ===== */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.stat-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 12px;
  background: #ffffff;
  box-shadow: 0px 12px 32px rgba(0, 52, 96, 0.08);
  border-radius: 8px;
}
.stat-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
}
.stat-badge {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #707784;
}
.stat-card-bottom {
  display: flex;
  flex-direction: column;
}
.stat-value {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;
}
.stat-label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #404752;
}

/* ===== Recent Requests Card ===== */
.recent-card {
  background: #ffffff;
  box-shadow: 0px 12px 32px rgba(0, 52, 96, 0.08);
  border-radius: 8px;
  overflow: hidden;
}
.recent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
}
.recent-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  color: #191c1e;
  margin: 0;
}
.view-all-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #0060a9;
  cursor: pointer;
  text-decoration: none;
}
.view-all-link:hover {
  text-decoration: underline;
}

/* ===== Table ===== */
.table-wrap {
  overflow-x: auto;
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
  padding: 16px 24px;
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: #707784;
  text-align: left;
  white-space: nowrap;
}
.data-table tbody tr {
  border-top: 1px solid #eceef1;
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
  padding: 17px 24px;
  font-size: 14px;
  line-height: 20px;
  color: #404752;
  white-space: nowrap;
}
.cell-id {
  font-weight: 700;
  color: #0060a9;
}
.cell-type {
  font-weight: 400;
}
.cell-title {
  font-weight: 500;
  color: #191c1e;
}
.cell-date {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}
.cell-assignee {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;
}
.cell-empty {
  text-align: center;
  color: #909399;
  padding: 40px 24px;
}
.assignee-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #e6e8eb;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: #404752;
  flex-shrink: 0;
}
.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 1px 12px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 11px;
  line-height: 20px;
  letter-spacing: 0.55px;
  text-transform: uppercase;
  white-space: nowrap;
}

/* ===== Quick Actions ===== */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.quick-label {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: #707784;
}
.quick-btns {
  display: flex;
  gap: 16px;
}
.quick-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #ffffff;
  border: 1px solid rgba(192, 199, 212, 0.4);
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #0060a9;
  cursor: pointer;
  white-space: nowrap;
}
.quick-btn:hover {
  background: #f9fafb;
  border-color: #0060a9;
}

/* ===== FAB ===== */
.fab {
  position: fixed;
  right: 24px;
  bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #0060a9 0%, #409eff 100%);
  box-shadow: 0px 12px 32px rgba(0, 52, 96, 0.08);
  border-radius: 12px;
  border: none;
  cursor: pointer;
  z-index: 5;
}
.fab:hover {
  opacity: 0.9;
}
</style>
