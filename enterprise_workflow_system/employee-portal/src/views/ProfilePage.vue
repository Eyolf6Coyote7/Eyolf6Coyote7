<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const auth = useAuthStore()

const profile = ref({
  name: auth.user?.name || 'Wei Chen',
  email: auth.user?.email || 'wei.chen@company.com',
  phone: '+86 138 0000 0000',
  department: auth.user?.department || 'Engineering',
  employeeId: 'EMP-94021',
  joinDate: 'Oct 12, 2021',
  role: auth.user?.role || 'employee',
})

const twoFactorEnabled = ref(true)

const notifications = ref([
  { labelKey: 'profile.emailApproval', enabled: true },
  { labelKey: 'profile.emailStatus', enabled: true },
  { labelKey: 'profile.emailDigest', enabled: false },
  { labelKey: 'profile.pushApprovals', enabled: true },
  { labelKey: 'profile.pushUpdates', enabled: true },
  { labelKey: 'profile.pushReminders', enabled: false },
  { labelKey: 'profile.smsUrgent', enabled: true },
])

const sessions = [
  { device: 'Chrome on macOS', location: 'Shanghai, CN · Last active now', current: true },
  {
    device: 'WorkflowOS App on iOS',
    location: 'Shanghai, CN · Last active 1h ago',
    current: false,
  },
]
</script>

<template>
  <div class="profile-page">
    <h1 class="page-title">{{ t('profile.title') }}</h1>

    <div class="profile-grid">
      <!-- Left Column -->
      <div class="left-col">
        <!-- Personal Info Card -->
        <div class="card">
          <div class="profile-header">
            <div class="avatar-box">
              <span class="material-symbols-outlined" style="font-size: 24px; color: #707784"
                >person</span
              >
            </div>
            <div class="profile-info">
              <div class="name-row">
                <h2 class="profile-name">{{ profile.name }}</h2>
                <a class="edit-btn">{{ t('profile.edit') }}</a>
              </div>
              <span class="profile-email">{{ profile.email }}</span>
              <div class="tag-row">
                <span class="profile-tag">{{ profile.department }}</span>
                <span class="profile-tag">Senior Developer</span>
              </div>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-field form-field-full">
              <label class="fl">{{ t('profile.fullName') }}</label>
              <input :value="profile.name" class="fi" />
            </div>
            <div class="form-field form-field-full">
              <label class="fl">{{ t('profile.emailManaged') }}</label>
              <input :value="profile.email" class="fi fi-disabled" disabled />
            </div>
            <div class="form-field">
              <label class="fl">{{ t('profile.phone') }}</label>
              <input :value="profile.phone" class="fi" />
            </div>
            <div class="form-field">
              <label class="fl">{{ t('profile.department') }}</label>
              <input :value="profile.department" class="fi fi-disabled" disabled />
            </div>
            <div class="form-field">
              <label class="fl">{{ t('profile.employeeId') }}</label>
              <input :value="profile.employeeId" class="fi fi-disabled" disabled />
            </div>
            <div class="form-field">
              <label class="fl">{{ t('profile.joinDate') }}</label>
              <input :value="profile.joinDate" class="fi fi-disabled" disabled />
            </div>
          </div>
        </div>

        <!-- 2FA Card -->
        <div class="card">
          <div class="tfa-header">
            <h3 class="section-title">{{ t('profile.twoFactor') }}</h3>
            <div
              :class="['toggle', { on: twoFactorEnabled }]"
              @click="twoFactorEnabled = !twoFactorEnabled"
            >
              <div class="toggle-thumb"></div>
            </div>
          </div>

          <div class="tfa-status" v-if="twoFactorEnabled">
            <span class="material-symbols-outlined" style="font-size: 16px; color: #67c23a"
              >shield</span
            >
            <span class="tfa-text">{{ t('profile.twoFactorEnabled') }}</span>
          </div>

          <div class="backup-section">
            <h4 class="backup-title">{{ t('profile.backupCodes') }}</h4>
            <div class="backup-row">
              <span class="backup-desc">{{ t('profile.unusedCodes') }}</span>
              <div class="backup-btns">
                <button class="btn-outline-sm">{{ t('profile.regenerateCodes') }}</button>
                <a class="link-sm">{{ t('profile.viewCodes') }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-col">
        <!-- Notification Preferences -->
        <div class="card">
          <h3 class="section-title">{{ t('profile.notifPreferences') }}</h3>
          <div class="notif-list">
            <div v-for="n in notifications" :key="n.labelKey" class="notif-row">
              <span class="notif-label">{{ t(n.labelKey) }}</span>
              <div :class="['toggle', { on: n.enabled }]" @click="n.enabled = !n.enabled">
                <div class="toggle-thumb"></div>
              </div>
            </div>
          </div>

          <div class="quiet-section">
            <h4 class="quiet-title">{{ t('profile.quietHours') }}</h4>
            <div class="quiet-row">
              <span class="quiet-label">{{ t('profile.doNotDisturb') }}</span>
              <div class="quiet-inputs">
                <input value="22:00" class="quiet-input" />
                <span class="quiet-to">{{ t('profile.to') }}</span>
                <input value="07:00" class="quiet-input" />
              </div>
            </div>
          </div>
        </div>

        <!-- Active Sessions -->
        <div class="card">
          <h3 class="section-title">{{ t('profile.activeSessions') }}</h3>
          <div class="session-list">
            <div v-for="s in sessions" :key="s.device" class="session-row">
              <div class="session-icon">
                <span class="material-symbols-outlined" style="font-size: 16px; color: #404752">{{
                  s.current ? 'computer' : 'phone_iphone'
                }}</span>
              </div>
              <div class="session-info">
                <div class="session-device-row">
                  <span class="session-device">{{ s.device }}</span>
                  <span v-if="s.current" class="session-current">{{ t('profile.current') }}</span>
                </div>
                <span class="session-location">{{ s.location }}</span>
              </div>
              <a v-if="!s.current" class="revoke-link">{{ t('profile.revoke') }}</a>
            </div>
          </div>
          <a class="logout-all">{{ t('profile.logoutAll') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.page-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: #303133;
  margin: 0;
}
.profile-grid {
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 24px;
}
.left-col,
.right-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.card {
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 32px;
}

/* Profile Header */
.profile-header {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
}
.avatar-box {
  width: 80px;
  height: 80px;
  background: #e6e8ef;
  border: 2px solid #e0e2e9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.profile-info {
  display: flex;
  flex-direction: column;
}
.name-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.profile-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #303133;
  margin: 0;
}
.edit-btn {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #0060a9;
  cursor: pointer;
}
.profile-email {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #909399;
  margin-top: 2px;
}
.tag-row {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}
.profile-tag {
  padding: 2px 8px;
  background: #f1f3fa;
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #606266;
}

/* Form */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-field-full {
  grid-column: 1 / -1;
}
.fl {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #404752;
}
.fi {
  height: 40px;
  padding: 0 16px;
  background: #ffffff;
  border: 1px solid rgba(192, 199, 212, 0.3);
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #303133;
  outline: none;
  box-sizing: border-box;
  width: 100%;
}
.fi:focus {
  border-color: #0060a9;
}
.fi-disabled {
  background: #f5f7fa;
  color: #909399;
}

/* 2FA */
.tfa-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #303133;
  margin: 0 0 16px;
}
.tfa-header .section-title {
  margin: 0;
}
.tfa-status {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f0f9eb;
  border-radius: 8px;
  margin-bottom: 24px;
}
.tfa-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #67c23a;
}
.backup-section {
  padding-top: 8px;
}
.backup-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  color: #303133;
  margin: 0 0 16px;
}
.backup-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.backup-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #606266;
}
.backup-btns {
  display: flex;
  gap: 16px;
  align-items: center;
}
.btn-outline-sm {
  padding: 8px 24px;
  border: 1px solid #c0c7d4;
  border-radius: 8px;
  background: transparent;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #181c20;
  cursor: pointer;
}
.link-sm {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #0060a9;
  cursor: pointer;
}

/* Toggle */
.toggle {
  width: 40px;
  height: 20px;
  background: #dcdfe6;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
}
.toggle.on {
  background: #67c23a;
}
.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  transition: left 0.2s;
}
.toggle.on .toggle-thumb {
  left: 22px;
}

/* Notifications */
.notif-list {
  display: flex;
  flex-direction: column;
}
.notif-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #ebeef5;
}
.notif-row:last-child {
  border-bottom: none;
}
.notif-label {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #303133;
}
.quiet-section {
  border-top: 1px solid rgba(192, 199, 212, 0.1);
  padding-top: 32px;
  margin-top: 16px;
}
.quiet-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #303133;
  margin: 0 0 16px;
}
.quiet-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
.quiet-label {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #303133;
  flex: 1;
}
.quiet-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}
.quiet-input {
  width: 100px;
  height: 36px;
  padding: 0 12px;
  background: #f1f3fa;
  border: 1px solid rgba(192, 199, 212, 0.3);
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #181c20;
  text-align: center;
  outline: none;
}
.quiet-to {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #707784;
}

/* Sessions */
.session-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}
.session-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.session-icon {
  width: 40px;
  height: 40px;
  background: #f1f3fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.session-info {
  flex: 1;
}
.session-device-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.session-device {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #191c1e;
}
.session-current {
  padding: 1px 6px;
  background: #ecf5ff;
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 10px;
  color: #409eff;
  text-transform: uppercase;
}
.session-location {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #707784;
}
.revoke-link {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #f56c6c;
  cursor: pointer;
}
.logout-all {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #0060a9;
  cursor: pointer;
  display: block;
  text-align: center;
}
</style>
