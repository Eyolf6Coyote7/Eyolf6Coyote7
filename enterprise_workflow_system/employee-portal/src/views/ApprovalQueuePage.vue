<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/api'
import type { WorkflowRequest } from '@/api'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const approvals = ref<WorkflowRequest[]>([])
const loading = ref(true)
const showModal = ref(false)
const modalAction = ref<'approve' | 'reject'>('approve')
const selectedRequest = ref<WorkflowRequest | null>(null)
const comment = ref('')
const confirmed = ref(false)

onMounted(async () => {
  approvals.value = await api.getPendingApprovals()
  loading.value = false
})

function openModal(row: WorkflowRequest, action: 'approve' | 'reject') {
  selectedRequest.value = row
  modalAction.value = action
  comment.value = ''
  confirmed.value = false
  showModal.value = true
}

async function handleConfirm() {
  if (!selectedRequest.value) return
  const row = selectedRequest.value
  if (modalAction.value === 'approve') {
    await api.approveRequest(row.id)
    row.status = 'approved'
    ElMessage.success(`${row.id} approved`)
  } else {
    if (!comment.value.trim()) {
      ElMessage.warning(t('approvals.commentRequired'))
      return
    }
    await api.rejectRequest(row.id)
    row.status = 'rejected'
    ElMessage.warning(`${row.id} rejected`)
  }
  showModal.value = false
}

function priorityStyle(type: string) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    'Leave Request': { bg: '#ECF5FF', color: '#409EFF', label: 'LEAVE REQUEST' },
    'Purchase Order': { bg: '#ECF5FF', color: '#409EFF', label: 'PURCHASE ORDER' },
    'Equipment Purchase': { bg: '#ECF5FF', color: '#409EFF', label: 'PURCHASE ORDER' },
    Travel: { bg: '#ECF5FF', color: '#409EFF', label: 'TRAVEL APPROVAL' },
    Expense: { bg: '#ECF5FF', color: '#409EFF', label: 'EXPENSE' },
  }
  return map[type] || { bg: '#ECF5FF', color: '#409EFF', label: type.toUpperCase() }
}

function formatAmount(amount?: number) {
  if (!amount) return '--'
  return `\u00a5${amount.toLocaleString()}`
}
</script>

<template>
  <div class="approval-page" v-loading="loading">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ t('approvals.title') }}</h1>
        <p class="page-subtitle">{{ approvals.length }} {{ t('approvals.awaitingApproval') }}</p>
      </div>
      <button class="btn-filter">
        {{ t('approvals.bulkActions') }}
        <span class="material-symbols-outlined" style="font-size: 8px">expand_more</span>
      </button>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <select class="filter-select" style="width: 120px">
        <option>{{ t('approvals.filterStatus') }}</option>
      </select>
      <select class="filter-select" style="width: 140px">
        <option>{{ t('approvals.filterType') }}</option>
      </select>
      <select class="filter-select" style="width: 120px">
        <option>{{ t('approvals.filterPriority') }}</option>
      </select>
      <div class="filter-input-wrap">
        <span class="material-symbols-outlined fi-icon">calendar_today</span>
        <input type="text" :placeholder="t('approvals.dateRange')" class="filter-input" />
      </div>
      <div class="filter-input-wrap">
        <span class="material-symbols-outlined fi-icon">search</span>
        <input type="text" :placeholder="t('approvals.searchPlaceholder')" class="filter-input" />
      </div>
      <button class="filter-reset">{{ t('approvals.resetFilters') }}</button>
    </div>

    <!-- Request Cards -->
    <div class="card-list">
      <div
        v-for="row in approvals"
        :key="row.id"
        :class="['approval-card', { 'card-urgent': row.status === 'rejected' }]"
      >
        <div class="card-left">
          <div class="card-top-row">
            <span class="card-id">#{{ row.id }}</span>
            <span class="card-title-text">{{ row.title }}</span>
            <span class="card-priority-pill" style="background: #fdf6ec; color: #e6a23c">{{
              t('priority.high').toUpperCase()
            }}</span>
            <span
              class="card-type-pill"
              :style="{
                background: priorityStyle(row.type).bg,
                color: priorityStyle(row.type).color,
              }"
            >
              {{ priorityStyle(row.type).label }}
            </span>
          </div>
          <div class="card-meta-row">
            <div class="meta-item">
              <span class="meta-avatar">{{ row.submittedBy?.charAt(0) }}</span>
              <span class="meta-text-dark">{{ row.submittedBy }}</span>
            </div>
            <div class="meta-item">
              <span class="material-symbols-outlined" style="font-size: 11px; color: #909399"
                >work</span
              >
              <span class="meta-text">{{ t('departments.engineering') }}</span>
            </div>
            <div class="meta-item">
              <span class="material-symbols-outlined" style="font-size: 12px; color: #909399"
                >schedule</span
              >
              <span class="meta-text"
                >{{ t('detail.submitted') }} 2h {{ t('dashboard.hoursAgo') }}</span
              >
            </div>
          </div>
        </div>
        <div class="card-amount">
          {{ formatAmount(row.amount) }}
        </div>
        <div class="card-actions">
          <div class="action-btns">
            <button class="btn-approve" @click="openModal(row, 'approve')">
              <span class="material-symbols-outlined" style="font-size: 12px">check</span>
              {{ t('approvals.approve') }}
            </button>
            <button class="btn-reject" @click="openModal(row, 'reject')">
              <span class="material-symbols-outlined" style="font-size: 11px">close</span>
              {{ t('approvals.reject') }}
            </button>
          </div>
          <a class="view-link" @click="$router.push(`/requests/${row.id}`)">
            {{ t('approvals.viewDetails') }}
            <span class="material-symbols-outlined" style="font-size: 6px">arrow_forward</span>
          </a>
        </div>
      </div>

      <div v-if="!approvals.length && !loading" class="empty-state">
        <span class="material-symbols-outlined" style="font-size: 48px; color: #c0c7d4"
          >check_circle</span
        >
        <p>{{ t('approvals.noPending') }}</p>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title-row">
            <span
              class="material-symbols-outlined"
              :style="{
                color: modalAction === 'approve' ? '#55AF28' : '#BA1A1A',
                fontSize: '20px',
              }"
            >
              {{ modalAction === 'approve' ? 'check_circle' : 'cancel' }}
            </span>
            <h3 class="modal-title">
              {{
                modalAction === 'approve'
                  ? t('approvals.approveRequest')
                  : t('approvals.rejectRequest')
              }}
            </h3>
          </div>
          <button class="modal-close" @click="showModal = false">
            <span class="material-symbols-outlined" style="font-size: 12px">close</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="summary-box" v-if="selectedRequest">
            <div class="summary-id">#{{ selectedRequest.id }}</div>
            <div class="summary-title">{{ selectedRequest.title }}</div>
            <div class="summary-grid">
              <div class="summary-field">
                <span class="sf-label">{{ t('approvals.requester') }}</span
                ><span class="sf-value">{{ selectedRequest.submittedBy }}</span>
              </div>
              <div class="summary-field">
                <span class="sf-label">{{ t('approvals.amount') }}</span
                ><span class="sf-value">{{ formatAmount(selectedRequest.amount) }}</span>
              </div>
              <div class="summary-field">
                <span class="sf-label">{{ t('approvals.department') }}</span
                ><span class="sf-value">{{ t('departments.engineering') }}</span>
              </div>
              <div class="summary-field">
                <span class="sf-label">{{ t('approvals.priority') }}</span
                ><span class="sf-value-pill">{{ t('priority.high').toUpperCase() }}</span>
              </div>
            </div>
          </div>
          <div class="comment-section">
            <div class="comment-header">
              <label class="comment-label"
                >{{ t('approvals.comment') }}
                {{ modalAction === 'reject' ? '' : t('approvals.optional')
                }}<span v-if="modalAction === 'reject'" class="req">*</span></label
              >
              <span class="comment-count">{{ comment.length }} / 500</span>
            </div>
            <textarea
              v-model="comment"
              placeholder="Add a comment for the requester..."
              class="comment-textarea"
              maxlength="500"
            ></textarea>
          </div>
          <label class="checkbox-row">
            <input type="checkbox" v-model="confirmed" class="checkbox-input" />
            <span class="checkbox-text">
              {{
                modalAction === 'approve'
                  ? t('approvals.confirmApprove')
                  : t('approvals.confirmReject')
              }}
            </span>
          </label>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="showModal = false">{{ t('approvals.cancel') }}</button>
          <button
            :class="['btn-modal-action', modalAction]"
            :disabled="!confirmed"
            @click="handleConfirm"
          >
            <span class="material-symbols-outlined" style="font-size: 13px">{{
              modalAction === 'approve' ? 'check' : 'close'
            }}</span>
            {{ modalAction === 'approve' ? t('approvals.approve') : t('approvals.reject') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.approval-page {
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
  line-height: 30px;
  color: #303133;
  margin: 0;
}
.page-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #909399;
  margin: 4px 0 0;
}
.btn-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #404752;
  cursor: pointer;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.filter-select {
  height: 40px;
  padding: 0 12px;
  background: #f4f3f5;
  border: none;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #1a1c1d;
  appearance: auto;
}
.filter-input-wrap {
  position: relative;
  width: 200px;
}
.fi-icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #404752;
  pointer-events: none;
}
.filter-input {
  width: 100%;
  height: 40px;
  padding: 0 12px 0 36px;
  background: #f4f3f5;
  border: none;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
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
  white-space: nowrap;
}

/* Card List */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.approval-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.card-urgent {
  border-left: 4px solid #f56c6c;
}
.card-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.card-top-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.card-id {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #409eff;
}
.card-title-text {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #303133;
}
.card-priority-pill,
.card-type-pill {
  padding: 2px 8px;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
}
.card-meta-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
.meta-avatar {
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background: #e6e8eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 9px;
  color: #404752;
}
.meta-text-dark {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #1a1c1d;
}
.meta-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #909399;
}
.card-amount {
  padding: 0 16px;
  border-left: 1px solid rgba(192, 199, 212, 0.3);
  min-width: 100px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #303133;
}
.card-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  min-width: 200px;
}
.action-btns {
  display: flex;
  gap: 8px;
}
.btn-approve {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 16px;
  height: 36px;
  background: #67c23a;
  box-shadow: 0px 1px 2px rgba(40, 108, 0, 0.2);
  border: none;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
}
.btn-reject {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 16px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #f56c6c;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #f56c6c;
  cursor: pointer;
}
.view-link {
  display: flex;
  align-items: center;
  gap: 2px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
}
.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #909399;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(24, 28, 33, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  width: 520px;
  background: #ffffff;
  box-shadow: 0px 24px 48px -12px rgba(24, 28, 33, 0.15);
  border-radius: 8px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #ebeef5;
}
.modal-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.modal-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #181c21;
  margin: 0;
}
.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #404752;
  padding: 4px;
  border-radius: 4px;
}
.modal-body {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.summary-box {
  background: #f1f4fb;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.summary-id {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #409eff;
}
.summary-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: #181c21;
}
.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.summary-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.sf-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.55px;
  text-transform: uppercase;
  color: #404752;
}
.sf-value {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #181c21;
}
.sf-value-pill {
  display: inline-flex;
  padding: 2px 8px;
  background: #ffedd5;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 11px;
  color: #c2410c;
  width: fit-content;
}
.comment-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.comment-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #404752;
}
.req {
  color: #ba1a1a;
}
.comment-count {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #707784;
}
.comment-textarea {
  width: 100%;
  height: 112px;
  padding: 16px;
  background: #f1f4fb;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #191c1e;
  resize: none;
  outline: none;
  box-sizing: border-box;
}
.comment-textarea::placeholder {
  color: rgba(112, 119, 132, 0.6);
}
.checkbox-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}
.checkbox-input {
  width: 20px;
  height: 20px;
  accent-color: #0060a9;
  margin-top: 2px;
  flex-shrink: 0;
}
.checkbox-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  color: #404752;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: #ffffff;
  border-top: 1px solid #ebeef5;
}
.btn-cancel {
  padding: 8px 20px;
  background: none;
  border: none;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #45474b;
  cursor: pointer;
}
.btn-modal-action {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  border: none;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
}
.btn-modal-action.approve {
  background: linear-gradient(135deg, #55af28 0%, #4caf50 100%);
}
.btn-modal-action.reject {
  background: #ba1a1a;
}
.btn-modal-action:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
