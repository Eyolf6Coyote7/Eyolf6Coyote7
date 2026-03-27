<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { api } from '@/api'
import type { Template } from '@/api'

const router = useRouter()
const { t } = useI18n()
const templates = ref<Template[]>([])
const loading = ref(true)

onMounted(async () => {
  templates.value = await api.getTemplates()
  loading.value = false
})

const cards = [
  {
    name: 'Expense Reimbursement',
    desc: 'Standard multi-level approval for employee travel and operational expenses.',
    icon: 'receipt_long',
    gradient: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)',
    iconColor: '#0060A9',
    steps: 4,
    avg: '24h',
    eff: '98%',
    statusKey: 'templates.published',
    statusBg: 'rgba(225,133,0,0.1)',
    statusColor: '#E18500',
  },
  {
    name: 'IT Equipment Procurement',
    desc: 'Hardware procurement workflow with vendor selection and security review.',
    icon: 'shopping_cart',
    gradient: 'linear-gradient(135deg,#ECFDF5,#D1FAE5)',
    iconColor: '#059669',
    steps: 6,
    avg: '72h',
    eff: '92%',
    statusKey: 'templates.published',
    statusBg: 'rgba(225,133,0,0.1)',
    statusColor: '#E18500',
  },
  {
    name: 'International Travel Authorization',
    desc: 'Approval process for cross-border business travel and visa sponsorship.',
    icon: 'flight',
    gradient: 'linear-gradient(135deg,#FFF7ED,#FFEDD5)',
    iconColor: '#EA580C',
    steps: 3,
    avg: '48h',
    eff: '95%',
    statusKey: 'templates.published',
    statusBg: 'rgba(225,133,0,0.1)',
    statusColor: '#E18500',
  },
  {
    name: 'Infrastructure Provisioning',
    desc: 'Automated cloud infrastructure approval workflow for DevOps teams.',
    icon: 'settings',
    gradient: '#F8FAFC',
    iconColor: '#94A3B8',
    steps: 5,
    avg: '—',
    eff: '—',
    statusKey: 'templates.draft',
    statusBg: '#E0E3E6',
    statusColor: '#707784',
    draft: true,
  },
  {
    name: 'New Hire Onboarding',
    desc: 'Comprehensive onboarding checklist from contract signing to first-day setup.',
    icon: 'person_add',
    gradient: 'linear-gradient(135deg,#FAF5FF,#F3E8FF)',
    iconColor: '#9333EA',
    steps: 8,
    avg: '120h',
    eff: '100%',
    statusKey: 'templates.published',
    statusBg: 'rgba(225,133,0,0.1)',
    statusColor: '#E18500',
  },
]
</script>

<template>
  <div class="tpl-page" v-loading="loading">
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ $t('templates.title') }}</h1>
        <p class="page-sub">{{ $t('templates.subtitle') }}</p>
      </div>
      <button class="btn-primary">
        <span class="material-symbols-outlined" style="font-size: 14px">add</span>
        {{ $t('templates.createTemplate') }}
      </button>
    </div>

    <div class="template-grid">
      <div v-for="c in cards" :key="c.name" :class="['tpl-card', { draft: c.draft }]">
        <div class="tpl-hero" :style="{ background: c.gradient }">
          <span
            class="material-symbols-outlined"
            :style="{ color: c.iconColor, fontSize: '40px' }"
            >{{ c.icon }}</span
          >
          <span class="tpl-status" :style="{ background: c.statusBg, color: c.statusColor }">{{
            $t(c.statusKey)
          }}</span>
        </div>
        <div class="tpl-body">
          <h3 class="tpl-name">{{ c.name }}</h3>
          <p class="tpl-desc">{{ c.desc }}</p>
          <div class="tpl-meta">
            <span class="tm"
              ><span class="material-symbols-outlined" style="font-size: 13px">schema</span>
              {{ c.steps }} {{ $t('templates.steps') }}</span
            >
            <span class="tm"
              ><span class="material-symbols-outlined" style="font-size: 13px">schedule</span>
              {{ c.avg }} {{ $t('templates.avg') }}</span
            >
            <span class="tm"
              ><span class="material-symbols-outlined" style="font-size: 11px">trending_up</span>
              {{ c.eff }} {{ $t('templates.eff') }}</span
            >
          </div>
        </div>
        <div class="tpl-footer">
          <span class="tpl-edited">Last edited: {{ c.draft ? 'Just now' : '2 days ago' }}</span>
          <div class="tpl-actions">
            <button class="tpl-btn">
              <span class="material-symbols-outlined" style="font-size: 14px">edit</span>
            </button>
            <button class="tpl-btn">
              <span class="material-symbols-outlined" style="font-size: 14px">content_copy</span>
            </button>
            <button class="tpl-btn">
              <span class="material-symbols-outlined" style="font-size: 14px">delete</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Create New placeholder -->
      <div class="tpl-card tpl-placeholder">
        <div class="ph-content">
          <div class="ph-icon">
            <span class="material-symbols-outlined" style="font-size: 27px; color: #94a3b8"
              >add_circle_outline</span
            >
          </div>
          <span class="ph-title">{{ $t('templates.createNew') }}</span>
          <span class="ph-sub">{{ $t('templates.blankCanvas') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tpl-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
  color: #909399;
  margin: 4px 0 0;
}
.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: #409eff;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px 4px 6px -1px rgba(59, 130, 246, 0.2);
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.tpl-card {
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}
.tpl-card.draft {
  border: 2px dashed #c0c7d4;
}
.tpl-hero {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.tpl-status {
  position: absolute;
  right: 12px;
  top: 9px;
  padding: 2.5px 12px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.tpl-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.tpl-name {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #191c1e;
  margin: 0;
}
.tpl-desc {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 21px;
  color: #404752;
  margin: 0;
}
.tpl-meta {
  display: flex;
  gap: 16px;
  padding-top: 12px;
}
.tm {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #707784;
}
.tpl-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f2f4f7;
}
.tpl-edited {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #707784;
}
.tpl-actions {
  display: flex;
  gap: 8px;
}
.tpl-btn {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 4px;
  color: #707784;
  cursor: pointer;
  padding: 0;
}
.tpl-btn:hover {
  background: rgba(0, 0, 0, 0.04);
}
.tpl-placeholder {
  border: 2px dashed #c0c7d4;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  cursor: pointer;
}
.ph-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.ph-icon {
  width: 64px;
  height: 64px;
  background: #f1f5f9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ph-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #94a3b8;
}
.ph-sub {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #94a3b8;
}
</style>
