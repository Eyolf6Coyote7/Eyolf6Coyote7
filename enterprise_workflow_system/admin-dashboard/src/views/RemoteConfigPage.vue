<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DemoTooltip from '@/components/DemoTooltip.vue'

useI18n()
const activeTab = ref('brand')
const brandForm = ref({
  companyName: 'Acme Corporation',
  primaryColor: '#409EFF',
  loginMessage: '',
  footerText: '',
})
const emailForm = ref({ headerColor: '#409EFF', footerText: '', includeLogo: true })
</script>

<template>
  <div class="config-page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('config.title') }}</h1>
      <p class="page-sub">{{ $t('config.subtitle') }}</p>
    </div>

    <div class="tabs">
      <button :class="['tab', { active: activeTab === 'brand' }]" @click="activeTab = 'brand'">
        {{ $t('config.brandSettings') }}
      </button>
      <button :class="['tab', { active: activeTab === 'notif' }]" @click="activeTab = 'notif'">
        {{ $t('config.notifTemplates') }}
      </button>
    </div>

    <div class="config-grid">
      <!-- Company Branding -->
      <div class="card">
        <h3 class="section-title">
          <span class="material-symbols-outlined" style="font-size: 20px; color: #0060a9"
            >computer</span
          >
          {{ $t('config.companyBranding') }}
        </h3>
        <div class="brand-form">
          <div class="logo-section">
            <div class="logo-placeholder">
              <span
                class="material-symbols-outlined"
                style="font-size: 48px; color: #c0c7d4; opacity: 0.5"
                >image</span
              >
            </div>
            <div class="logo-info">
              <span class="logo-label">Company Logo</span>
              <div class="logo-btns">
                <DemoTooltip :message="$t('demo.uploadRequired')">
                  <button class="btn-sm-primary">{{ $t('config.uploadLogo') }}</button>
                </DemoTooltip>
                <DemoTooltip :message="$t('demo.removeRequired')">
                  <a class="link-danger">{{ $t('config.remove') }}</a>
                </DemoTooltip>
              </div>
              <span class="logo-hint">{{ $t('config.logoHint') }}</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label class="ff-label">{{ $t('config.companyName') }}</label>
              <input v-model="brandForm.companyName" class="ff-input" />
            </div>
            <div class="form-field">
              <label class="ff-label">{{ $t('config.primaryColor') }}</label>
              <div class="color-row">
                <div class="color-swatch" :style="{ background: brandForm.primaryColor }"></div>
                <input
                  v-model="brandForm.primaryColor"
                  class="ff-input"
                  style="font-family: monospace; text-transform: uppercase"
                />
              </div>
            </div>
          </div>

          <div class="form-field">
            <label class="ff-label">{{ $t('config.loginMessage') }}</label>
            <textarea
              v-model="brandForm.loginMessage"
              :placeholder="$t('config.loginPlaceholder')"
              class="ff-textarea"
            ></textarea>
          </div>

          <div class="form-field">
            <label class="ff-label">{{ $t('config.footerText') }}</label>
            <input
              v-model="brandForm.footerText"
              placeholder="e.g. © 2024 Acme Corp. All rights reserved."
              class="ff-input"
            />
          </div>

          <div class="form-footer">
            <DemoTooltip :message="$t('demo.resetRequired')">
              <a class="link-muted">{{ $t('config.resetDefaults') }}</a>
            </DemoTooltip>
            <DemoTooltip :message="$t('demo.saveRequired')">
              <button class="btn-primary-lg">{{ $t('config.saveChanges') }}</button>
            </DemoTooltip>
          </div>
        </div>
      </div>

      <!-- Email Branding -->
      <div class="card card-sm">
        <h3 class="section-title">
          <span class="material-symbols-outlined" style="font-size: 20px; color: #0060a9"
            >mail</span
          >
          {{ $t('config.emailBranding') }}
        </h3>
        <div class="email-form">
          <div class="form-field">
            <label class="ff-label">{{ $t('config.emailHeaderColor') }}</label>
            <div class="color-row-lg">
              <div class="color-swatch-lg" :style="{ background: emailForm.headerColor }"></div>
              <span class="color-text">{{ emailForm.headerColor }}</span>
            </div>
          </div>

          <div class="form-field">
            <label class="ff-label">{{ $t('config.emailFooterText') }}</label>
            <textarea
              v-model="emailForm.footerText"
              placeholder="You are receiving this email because you have an account at Acme Corp..."
              class="ff-textarea ff-textarea-sm"
            ></textarea>
          </div>

          <div class="toggle-row">
            <div class="toggle-info">
              <span class="toggle-name">{{ $t('config.includeLogo') }}</span>
              <span class="toggle-desc">{{ $t('config.showLogo') }}</span>
            </div>
            <div
              :class="['toggle', { on: emailForm.includeLogo }]"
              @click="emailForm.includeLogo = !emailForm.includeLogo"
            >
              <div class="toggle-thumb"></div>
            </div>
          </div>

          <div class="preview-box">
            <p class="preview-text">
              Preview: All transactional emails including password resets and account alerts will
              use these global brand styles.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.config-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.page-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.page-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #303133;
  margin: 0;
}
.page-sub {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #909399;
  margin: 0;
}
.tabs {
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #e6e8eb;
}
.tab {
  padding: 0 0 12px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #404752;
  cursor: pointer;
}
.tab.active {
  border-bottom-color: #409eff;
  color: #409eff;
  font-weight: 600;
}
.config-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: start;
}
.card {
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 32px;
}
.card-sm {
  padding: 24px;
}
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #191c1e;
  margin: 0 0 24px;
}
.brand-form,
.email-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.logo-section {
  display: flex;
  gap: 32px;
}
.logo-placeholder {
  width: 80px;
  height: 80px;
  background: #f2f4f7;
  border: 1px dashed #c0c7d4;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.logo-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.logo-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #191c1e;
}
.logo-btns {
  display: flex;
  gap: 16px;
  align-items: center;
}
.btn-sm-primary {
  padding: 8px 24px;
  background: #0060a9;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
}
.link-danger {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #ba1a1a;
  cursor: pointer;
}
.logo-hint {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #404752;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ff-label {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #404752;
}
.ff-input {
  height: 44px;
  padding: 0 12px;
  background: #f2f4f7;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #191c1e;
  outline: none;
  box-sizing: border-box;
  width: 100%;
}
.ff-input::placeholder {
  color: #6b7280;
}
.ff-textarea {
  padding: 12px;
  background: #f2f4f7;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #191c1e;
  outline: none;
  resize: vertical;
  min-height: 84px;
  width: 100%;
  box-sizing: border-box;
}
.ff-textarea::placeholder {
  color: #6b7280;
}
.ff-textarea-sm {
  min-height: 104px;
}
.color-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.color-swatch {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  flex-shrink: 0;
}
.color-row-lg {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: #f2f4f7;
  border-radius: 8px;
}
.color-swatch-lg {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  flex-shrink: 0;
}
.color-text {
  font-family: monospace;
  font-size: 14px;
  color: #191c1e;
}
.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: rgba(242, 244, 247, 0.3);
  border-radius: 12px;
}
.toggle-info {
  display: flex;
  flex-direction: column;
}
.toggle-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #191c1e;
}
.toggle-desc {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #404752;
}
.toggle {
  width: 44px;
  height: 24px;
  background: #e2e8f0;
  border-radius: 9999px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
}
.toggle.on {
  background: #0060a9;
}
.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 9999px;
  transition: left 0.2s;
}
.toggle.on .toggle-thumb {
  left: 22px;
}
.preview-box {
  padding: 16px;
  background: #f2f4f7;
  border: 1px solid rgba(192, 199, 212, 0.1);
  border-radius: 8px;
}
.preview-text {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #404752;
  margin: 0;
}
.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid #e6e8eb;
}
.link-muted {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #404752;
  cursor: pointer;
}
.btn-primary-lg {
  padding: 12px 40px;
  background: linear-gradient(135deg, #0060a9, #409eff);
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
