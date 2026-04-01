<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DemoTooltip from '@/components/DemoTooltip.vue'

useI18n()

const toggles = ref([
  {
    nameKey: 'toggles.autoEscalation',
    categoryKey: 'toggles.workflow',
    categoryColor: '#1D4ED8',
    categoryBg: '#DBEAFE',
    descKey: 'toggles.autoEscalationDesc',
    created: 'Nov 1, 2024',
    lastToggled: 'Dec 15, 2024 by Li Wei',
    enabled: true,
  },
  {
    nameKey: 'toggles.parallelApprovals',
    categoryKey: 'toggles.workflow',
    categoryColor: '#1D4ED8',
    categoryBg: '#DBEAFE',
    descKey: 'toggles.parallelApprovalsDesc',
    created: 'Oct 24, 2024',
    lastToggled: 'Jan 2, 2025 by Sarah J.',
    enabled: true,
  },
  {
    nameKey: 'toggles.emailNotifications',
    categoryKey: 'toggles.notifications',
    categoryColor: '#626468',
    categoryBg: '#E1E2E7',
    descKey: 'toggles.emailNotificationsDesc',
    created: 'Sep 12, 2024',
    lastToggled: 'Dec 20, 2024 by System',
    enabled: true,
  },
  {
    nameKey: 'toggles.smsAlerts',
    categoryKey: 'toggles.notifications',
    categoryColor: '#626468',
    categoryBg: '#E1E2E7',
    descKey: 'toggles.smsAlertsDesc',
    created: 'Aug 05, 2024',
    lastToggled: 'Nov 14, 2024 by Alex T.',
    enabled: false,
  },
  {
    nameKey: 'toggles.mobilePush',
    categoryKey: 'toggles.notifications',
    categoryColor: '#1D4ED8',
    categoryBg: '#DBEAFE',
    descKey: 'toggles.mobilePushDesc',
    created: 'Jan 15, 2025',
    lastToggled: 'Jan 15, 2025 by Li Wei',
    enabled: true,
  },
  {
    nameKey: 'toggles.auditRetention',
    categoryKey: 'toggles.compliance',
    categoryColor: '#93000A',
    categoryBg: '#FFDAD6',
    descKey: 'toggles.auditRetentionDesc',
    created: 'Jun 10, 2024',
    lastToggled: 'Aug 01, 2024 by Legal Dept',
    enabled: true,
  },
  {
    nameKey: 'toggles.darkMode',
    categoryKey: 'toggles.beta',
    categoryColor: '#1D5200',
    categoryBg: '#9BFA6B',
    descKey: 'toggles.darkModeDesc',
    created: 'Dec 20, 2024',
    lastToggled: 'Dec 21, 2024 by Design Team',
    enabled: false,
    beta: true,
  },
  {
    nameKey: 'toggles.bulkApproval',
    categoryKey: 'toggles.workflow',
    categoryColor: '#1D4ED8',
    categoryBg: '#DBEAFE',
    descKey: 'toggles.bulkApprovalDesc',
    created: 'Jan 10, 2025',
    lastToggled: 'Jan 12, 2025 by Product Eng',
    enabled: false,
    beta: true,
  },
])
</script>

<template>
  <div class="ft-page">
    <div class="page-header">
      <div>
        <h1 class="page-title-lg">{{ $t('toggles.title') }}</h1>
        <p class="page-sub">{{ $t('toggles.subtitle') }}</p>
      </div>
      <div class="header-btns">
        <button class="btn-outline">
          <span class="material-symbols-outlined" style="font-size: 14px">filter_list</span>
          {{ $t('toggles.filter') }}
        </button>
        <DemoTooltip :message="$t('demo.toggleRequired')">
          <button class="btn-primary">
            <span class="material-symbols-outlined" style="font-size: 11px">add</span>
            {{ $t('toggles.addToggle') }}
          </button>
        </DemoTooltip>
      </div>
    </div>

    <div class="info-banner">
      <span class="material-symbols-outlined" style="font-size: 20px; color: #0060a9">info</span>
      <span class="banner-text">{{ $t('toggles.warning') }}</span>
    </div>

    <div class="toggle-list">
      <div
        v-for="tog in toggles"
        :key="tog.nameKey"
        :class="['toggle-card', { off: !tog.enabled }]"
      >
        <div class="tc-content">
          <div class="tc-top">
            <span class="tc-name">{{ $t(tog.nameKey) }}</span>
            <span
              class="tc-cat"
              :style="{ background: tog.categoryBg, color: tog.categoryColor }"
              >{{ $t(tog.categoryKey) }}</span
            >
            <span v-if="tog.beta" class="tc-beta">{{ $t('toggles.beta') }}</span>
          </div>
          <p class="tc-desc">{{ $t(tog.descKey) }}</p>
          <div class="tc-meta">
            <span class="meta-item"
              ><span class="material-symbols-outlined" style="font-size: 11px">calendar_today</span>
              Created: {{ tog.created }}</span
            >
            <span class="meta-dot"></span>
            <span class="meta-item"
              ><span class="material-symbols-outlined" style="font-size: 10px">person</span> Last
              toggled: {{ tog.lastToggled }}</span
            >
          </div>
        </div>
        <div class="tc-actions">
          <div class="toggle-control">
            <span class="toggle-label" :style="{ color: tog.enabled ? '#286C00' : '#707784' }">{{
              tog.enabled ? $t('toggles.on') : $t('toggles.off')
            }}</span>
            <DemoTooltip :message="$t('demo.toggleRequired')">
              <div :class="['toggle', { on: tog.enabled }]" @click="tog.enabled = !tog.enabled">
                <div class="toggle-thumb"></div>
              </div>
            </DemoTooltip>
          </div>
          <button class="btn-dots">
            <span class="material-symbols-outlined" style="font-size: 16px">more_vert</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ft-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.page-title-lg {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 44px;
  line-height: 55px;
  letter-spacing: -1.1px;
  color: #181c20;
  margin: 0;
}
.page-sub {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #404752;
  margin: 4px 0 0;
}
.header-btns {
  display: flex;
  gap: 16px;
}
.btn-outline {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: #fff;
  border: 1px solid rgba(192, 199, 212, 0.3);
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #404752;
  cursor: pointer;
}
.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  background: linear-gradient(90deg, #0060a9, #409eff);
  border: none;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px 10px 15px -3px rgba(59, 130, 246, 0.2);
}

.info-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(211, 228, 255, 0.3);
  border-left: 4px solid #0060a9;
  border-radius: 16px;
}
.banner-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #004881;
}

.toggle-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.toggle-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: #fff;
  border-radius: 16px;
}
.toggle-card.off {
  opacity: 0.8;
  border-left: 4px solid #e2e8f0;
  background: rgba(241, 243, 250, 0.5);
}
.tc-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.tc-top {
  display: flex;
  align-items: center;
  gap: 12px;
}
.tc-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #181c20;
}
.toggle-card.off .tc-name {
  color: rgba(24, 28, 32, 0.6);
}
.tc-cat {
  padding: 2px 8px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.tc-beta {
  padding: 2px 8px;
  background: #9bfa6b;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 9px;
  letter-spacing: 0.9px;
  text-transform: uppercase;
  color: #1d5200;
}
.tc-desc {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #404752;
  margin: 0;
  max-width: 672px;
}
.tc-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 12px;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: #707784;
}
.meta-dot {
  width: 4px;
  height: 4px;
  background: #cbd5e1;
  border-radius: 12px;
}
.tc-actions {
  display: flex;
  align-items: center;
  gap: 32px;
  padding-left: 48px;
}
.toggle-control {
  display: flex;
  align-items: center;
  gap: 12px;
}
.toggle-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 12px;
}
.toggle {
  width: 48px;
  height: 24px;
  background: #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
}
.toggle.on {
  background: #286c00;
}
.toggle-thumb {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: left 0.2s;
}
.toggle.on .toggle-thumb {
  left: 28px;
}
.btn-dots {
  background: none;
  border: none;
  cursor: pointer;
  color: #707784;
  padding: 8px;
  border-radius: 12px;
}
</style>
