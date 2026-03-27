<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const requestId = (route.params.id as string) || 'WF-1234'

const request = ref({
  id: requestId,
  title: 'Equipment Purchase Request',
  type: 'Equipment Purchase',
  department: 'Engineering',
  priority: 'HIGH PRIORITY',
  priorityColor: '#E6A23C',
  priorityBg: '#FDF6EC',
  amount: '\u00a545,000.00',
  status: 'In Progress',
  description:
    'Procurement of 3x high-performance development workstations for the new mobile infrastructure team. Units include customized GPUs and 64GB RAM modules.',
  justification:
    '"Current hardware is causing significant build-time delays. Upgrading will reduce CI/CD cycle time by an estimated 40%, directly impacting Q3 delivery targets."',
  submittedBy: 'Wei Chen',
})

const timeline = [
  { labelKey: 'detail.submitted', date: 'Mar 15, 09:42', status: 'done', icon: 'check' },
  { labelKey: 'detail.managerReview', date: 'Mar 16, 14:15', status: 'done', icon: 'check' },
  { labelKey: 'detail.financeReview', dateKey: 'status.inReview', status: 'active', icon: 'sync' },
  {
    labelKey: 'detail.directorApproval',
    dateKey: 'status.pending',
    status: 'pending',
    icon: 'hourglass_empty',
  },
  { labelKey: 'detail.complete', dateKey: 'status.pending', status: 'pending', icon: 'check' },
]

const approvers = [
  {
    name: 'Li Wei',
    role: 'Engineering Manager',
    statusKey: 'status.approved',
    statusColor: '#286C00',
    date: 'Mar 16',
    avatar: 'LW',
    highlight: false,
  },
  {
    name: 'Zhang Min',
    role: 'Finance Director',
    statusKey: 'status.inReview',
    statusColor: '#0060A9',
    date: '',
    avatar: 'ZM',
    highlight: true,
  },
  {
    name: 'Wang Jun',
    role: 'V.P. Operations',
    statusKey: 'status.pending',
    statusColor: '#707784',
    date: '',
    avatar: 'WJ',
    highlight: false,
    dimmed: true,
  },
]

const attachments = [
  {
    name: 'Vendor_Quote_DELL.pdf',
    size: '2.4 MB · PDF Document',
    iconBg: 'rgba(255,218,214,0.2)',
    iconColor: '#BA1A1A',
  },
  {
    name: 'Comparison_Sheet.xlsx',
    size: '1.1 MB · Spreadsheet',
    iconBg: 'rgba(85,175,40,0.2)',
    iconColor: '#286C00',
  },
]

const comments = [
  {
    author: 'Li Wei',
    date: 'Mar 16, 14:20',
    text: "Looks good. I've cross-referenced this with the project roadmap and we definitely need these workstations for the scaling phase.",
    avatar: 'LW',
  },
  {
    author: 'Zhang Min',
    date: 'Mar 17, 10:05',
    text: "Hi Engineering Team, I've reviewed the vendor quote. Is there a reason we didn't go with the preferred supplier discount through GlobalTech?",
    avatar: 'ZM',
  },
]
</script>

<template>
  <div class="detail-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <span class="bc-link" @click="router.push('/dashboard')">{{ t('detail.dashboard') }}</span>
      <span class="material-symbols-outlined bc-sep" style="font-size: 8px">chevron_right</span>
      <span class="bc-link" @click="router.push('/history')">{{ t('detail.myRequests') }}</span>
      <span class="material-symbols-outlined bc-sep" style="font-size: 8px">chevron_right</span>
      <span class="bc-current">#{{ request.id }}</span>
    </div>

    <!-- Title Row -->
    <div class="title-row">
      <div class="title-left">
        <h1 class="page-title">#{{ request.id }} — {{ request.title }}</h1>
        <span class="status-badge">{{ request.status }}</span>
      </div>
      <button class="btn-more">
        <span class="material-symbols-outlined" style="font-size: 16px">more_horiz</span>
      </button>
    </div>

    <!-- Content Grid -->
    <div class="content-grid">
      <!-- Left Column -->
      <div class="left-col">
        <!-- Timeline Card -->
        <div class="card">
          <div class="timeline-row">
            <div v-for="(step, i) in timeline" :key="i" class="tl-step">
              <div :class="['tl-dot', step.status]">
                <span
                  v-if="step.status === 'done'"
                  class="material-symbols-outlined"
                  style="font-size: 15px; color: #133b00"
                  >check</span
                >
                <span
                  v-else-if="step.status === 'active'"
                  class="material-symbols-outlined"
                  style="font-size: 12px; color: #fff"
                  >sync</span
                >
                <span
                  v-else
                  class="material-symbols-outlined"
                  style="font-size: 12px; color: #404752"
                  >{{ step.icon }}</span
                >
              </div>
              <span class="tl-label" :class="step.status">{{ t(step.labelKey) }}</span>
              <span class="tl-date" :class="step.status">{{
                step.dateKey ? t(step.dateKey) : step.date
              }}</span>
              <div v-if="i < timeline.length - 1" :class="['tl-line', step.status]"></div>
            </div>
          </div>
        </div>

        <!-- Request Details Card -->
        <div class="card">
          <div class="card-header-row">
            <span class="card-section-title">{{ t('detail.requestInfo') }}</span>
            <a class="edit-link">{{ t('detail.editDetails') }}</a>
          </div>
          <div class="detail-grid">
            <div class="detail-field">
              <span class="df-label">{{ t('detail.type') }}</span>
              <span class="df-value">{{ request.type }}</span>
            </div>
            <div class="detail-field">
              <span class="df-label">{{ t('detail.department') }}</span>
              <span class="df-value">{{ request.department }}</span>
            </div>
            <div class="detail-field">
              <span class="df-label">{{ t('detail.priority') }}</span>
              <span
                class="df-priority"
                :style="{ background: request.priorityBg, color: request.priorityColor }"
                >{{ request.priority }}</span
              >
            </div>
            <div class="detail-field">
              <span class="df-label">{{ t('detail.budgetAmount') }}</span>
              <span class="df-value" style="font-weight: 700; color: #0060a9">{{
                request.amount
              }}</span>
            </div>
            <div class="detail-field detail-field-full">
              <span class="df-label">{{ t('detail.description') }}</span>
              <p class="df-body">{{ request.description }}</p>
            </div>
            <div class="detail-field detail-field-full">
              <span class="df-label">{{ t('detail.justification') }}</span>
              <p class="df-body">{{ request.justification }}</p>
            </div>
          </div>
        </div>

        <!-- Attachments -->
        <div class="attachments-section">
          <span class="attachments-title"
            >{{ t('detail.attachments') }} ({{ attachments.length }})</span
          >
          <div class="attachments-grid">
            <div v-for="att in attachments" :key="att.name" class="att-card">
              <div class="att-icon" :style="{ background: att.iconBg }">
                <span
                  class="material-symbols-outlined"
                  :style="{ color: att.iconColor, fontSize: '20px' }"
                  >description</span
                >
              </div>
              <div class="att-info">
                <span class="att-name">{{ att.name }}</span>
                <span class="att-size">{{ att.size }}</span>
              </div>
              <button class="att-download">
                <span class="material-symbols-outlined" style="font-size: 12px; color: #404752"
                  >download</span
                >
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-col">
        <!-- Approver Chain -->
        <div class="card">
          <div class="approver-header">
            <span class="card-section-title" style="text-transform: uppercase; font-size: 12px">{{
              t('detail.approvalWorkflow')
            }}</span>
            <span class="approver-badge">3 {{ t('detail.stages') }}</span>
          </div>
          <div class="approver-list">
            <div
              v-for="a in approvers"
              :key="a.name"
              :class="['approver-row', { highlight: a.highlight, dimmed: a.dimmed }]"
            >
              <div class="approver-avatar" :class="{ 'avatar-active': a.highlight }">
                {{ a.avatar }}
              </div>
              <div class="approver-info">
                <span
                  class="approver-name"
                  :style="{ color: a.highlight ? '#0060A9' : '#191C1E' }"
                  >{{ a.name }}</span
                >
                <span
                  class="approver-role"
                  :style="{ color: a.highlight ? '#409EFF' : '#404752' }"
                  >{{ a.role }}</span
                >
              </div>
              <div class="approver-status">
                <span class="as-text" :style="{ color: a.statusColor }">{{ t(a.statusKey) }}</span>
                <span v-if="a.date" class="as-date">{{ a.date }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Discussion -->
        <div class="card">
          <div class="discussion-header">
            <span class="card-section-title">{{ t('detail.discussion') }}</span>
            <span class="comment-count">{{ comments.length }}</span>
          </div>
          <div class="comments-list">
            <div v-for="c in comments" :key="c.date" class="comment">
              <div class="comment-avatar">{{ c.avatar }}</div>
              <div class="comment-body">
                <div class="comment-meta">
                  <span class="comment-author">{{ c.author }}</span>
                  <span class="comment-date">{{ c.date }}</span>
                </div>
                <p class="comment-text">{{ c.text }}</p>
              </div>
            </div>
          </div>
          <div class="comment-input-wrap">
            <input type="text" :placeholder="t('detail.writeComment')" class="comment-input" />
            <button class="comment-send">
              <span class="material-symbols-outlined" style="font-size: 16px; color: #0060a9"
                >send</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
}
.bc-link {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #909399;
  cursor: pointer;
}
.bc-link:hover {
  color: #0060a9;
}
.bc-sep {
  color: #909399;
}
.bc-current {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #303133;
}

/* Title */
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.page-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #303133;
  margin: 0;
}
.status-badge {
  padding: 4px 12px;
  background: #ecf5ff;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #409eff;
  box-shadow: 0 0 0 1px rgba(64, 158, 255, 0.2);
}
.btn-more {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c0c7d4;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
}

/* Grid */
.content-grid {
  display: grid;
  grid-template-columns: 65% 35%;
  gap: 24px;
}

/* Cards */
.card {
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 24px;
}
.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(192, 199, 212, 0.1);
  margin-bottom: 16px;
}
.card-section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.35px;
  text-transform: uppercase;
  color: #191c1e;
}
.edit-link {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #0060a9;
  cursor: pointer;
}

/* Timeline */
.timeline-row {
  display: flex;
  justify-content: space-between;
}
.tl-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}
.tl-dot {
  width: 32px;
  height: 32px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  position: relative;
  z-index: 2;
  box-shadow:
    0 0 0 4px #ffffff,
    0px 1px 2px rgba(0, 0, 0, 0.05);
}
.tl-dot.done {
  background: #55af28;
}
.tl-dot.active {
  background: #0060a9;
  box-shadow:
    0 0 0 4px rgba(162, 201, 255, 0.3),
    0px 1px 2px rgba(0, 0, 0, 0.05);
}
.tl-dot.pending {
  background: #e0e3e6;
}
.tl-label {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  color: #191c1e;
  margin-bottom: 4px;
}
.tl-label.active {
  color: #0060a9;
}
.tl-label.pending {
  color: #404752;
}
.tl-date {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 10px;
  text-align: center;
  color: #404752;
}
.tl-date.active {
  color: #0060a9;
}
.tl-date.pending {
  color: rgba(64, 71, 82, 0.6);
}
.tl-line {
  position: absolute;
  top: 16px;
  left: 50%;
  width: 100%;
  height: 2px;
  z-index: 1;
}
.tl-line.done {
  background: #55af28;
}
.tl-line.active {
  background: rgba(0, 96, 169, 0.2);
}
.tl-line.pending {
  background: #e0e3e6;
}

/* Detail Grid */
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.detail-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.detail-field-full {
  grid-column: 1 / -1;
}
.df-label {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  color: #404752;
}
.df-value {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #191c1e;
}
.df-priority {
  display: inline-flex;
  padding: 0.5px 10px;
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  width: fit-content;
  box-shadow: 0 0 0 1px rgba(230, 162, 60, 0.2);
}
.df-body {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 23px;
  color: #191c1e;
  margin: 0;
}

/* Attachments */
.attachments-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.attachments-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #404752;
}
.attachments-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.att-card {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
  background: #ffffff;
  border: 1px solid rgba(192, 199, 212, 0.1);
  border-radius: 8px;
}
.att-icon {
  width: 40px;
  height: 40px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.att-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.att-name {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #191c1e;
}
.att-size {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 10px;
  color: #404752;
}
.att-download {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
}

/* Approvers */
.approver-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 16px;
  background: #f2f4f7;
  margin: -24px -24px 16px;
  padding: 16px 20px;
  border-radius: 8px 8px 0 0;
}
.approver-badge {
  padding: 2px 8px;
  background: #e0e3e6;
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 10px;
  color: #404752;
}
.approver-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.approver-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0;
}
.approver-row.highlight {
  background: #ecf5ff;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(64, 158, 255, 0.2);
  margin: 0 -12px;
}
.approver-row.dimmed {
  opacity: 0.5;
}
.approver-avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e6e8eb;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #404752;
  flex-shrink: 0;
}
.approver-avatar.avatar-active {
  background: #d3e4ff;
  color: #0060a9;
}
.approver-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.approver-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #191c1e;
}
.approver-role {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 10px;
  text-transform: uppercase;
  color: #404752;
}
.approver-status {
  text-align: right;
}
.as-text {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 11px;
  display: block;
}
.as-date {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 9px;
  color: #404752;
}

/* Discussion */
.discussion-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.comment-count {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #e6e8eb;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 10px;
  color: #404752;
}
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}
.comment {
  display: flex;
  gap: 12px;
}
.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 12px;
  background: #e6e8eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 10px;
  color: #404752;
  flex-shrink: 0;
}
.comment-body {
  flex: 1;
  background: #f1f3fa;
  border-radius: 0 8px 8px 8px;
  padding: 12px;
}
.comment-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}
.comment-author {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  color: #191c1e;
}
.comment-date {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 11px;
  color: #404752;
}
.comment-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #5c5e62;
  margin: 0;
}
.comment-input-wrap {
  display: flex;
  gap: 8px;
  align-items: center;
}
.comment-input {
  flex: 1;
  height: 36px;
  padding: 0 12px;
  background: #f8f9ff;
  border: 1px solid #c0c7d4;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #191c1e;
  outline: none;
}
.comment-input::placeholder {
  color: #6b7280;
}
.comment-send {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

/* Left col stack */
.left-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.right-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
