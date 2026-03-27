<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import DemoTooltip from '@/components/DemoTooltip.vue'

const { t, locale } = useI18n()
const router = useRouter()
const auth = useAuthStore()
const loading = ref(false)
const step = ref<'login' | '2fa'>('login')

const form = reactive({
  email: '',
  password: '',
})

const otpDigits = reactive(['', '', '', '', '', ''])
const otpRefs = ref<HTMLInputElement[]>([])

async function handleSSOLogin() {
  loading.value = true
  try {
    step.value = '2fa'
    await nextTick()
    otpRefs.value[0]?.focus()
  } finally {
    loading.value = false
  }
}

function handleOtpInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '')
  otpDigits[index] = value.slice(-1)
  if (value && index < 5) {
    otpRefs.value[index + 1]?.focus()
  }
}

function handleOtpKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
    otpRefs.value[index - 1]?.focus()
  }
}

function handleOtpPaste(event: ClipboardEvent) {
  event.preventDefault()
  const paste = event.clipboardData?.getData('text')?.replace(/\D/g, '').slice(0, 6) || ''
  paste.split('').forEach((char, i) => {
    otpDigits[i] = char
  })
  const nextEmpty = paste.length < 6 ? paste.length : 5
  otpRefs.value[nextEmpty]?.focus()
}

async function handleVerify() {
  const code = otpDigits.join('')
  if (code.length < 6) {
    ElMessage.warning('Please enter the full 6-digit code')
    return
  }
  loading.value = true
  try {
    await auth.login('sso-user', code)
    ElMessage.success('Welcome back!')
    router.push('/dashboard')
  } catch {
    ElMessage.error('Verification failed')
  } finally {
    loading.value = false
  }
}

function toggleLocale() {
  const next = locale.value === 'en' ? 'zh-TW' : 'en'
  locale.value = next
  localStorage.setItem('lang', next)
}

const footerLinks = [
  { labelKey: 'footer.privacy', href: '#' },
  { labelKey: 'footer.terms', href: '#' },
  { labelKey: 'footer.trust', href: '#' },
  { labelKey: 'footer.status', href: '#' },
]
</script>

<template>
  <div class="login-page">
    <!-- Background Decoration -->
    <div class="bg-decoration" v-if="step === 'login'">
      <div class="bg-blur"></div>
      <div class="bg-border"></div>
    </div>
    <div class="bg-decoration-2fa" v-else>
      <div class="bg-blur-left"></div>
      <div class="bg-blur-right"></div>
    </div>

    <!-- Header -->
    <header class="top-header">
      <div class="header-inner">
        <div class="header-brand">
          <div class="brand-icon">
            <span class="material-symbols-outlined" style="color: #fff; font-size: 20px"
              >shield</span
            >
          </div>
          <span class="brand-name">WorkflowOS</span>
        </div>
        <nav class="header-nav">
          <button class="icon-btn" aria-label="Help">
            <span class="material-symbols-outlined">help_outline</span>
          </button>
          <button class="icon-btn" aria-label="Language" @click="toggleLocale">
            <span class="material-symbols-outlined">language</span>
            <span class="lang-label">{{ locale === 'en' ? '中文' : 'EN' }}</span>
          </button>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Editorial Side (2FA only) -->
      <div v-if="step === '2fa'" class="editorial-side">
        <div class="editorial-inner">
          <div class="editorial-accent"></div>
          <h3 class="editorial-title">{{ t('auth.secureByDesign') }}</h3>
          <p class="editorial-body">{{ t('auth.securityDesc') }}</p>
        </div>
        <div class="editorial-dots">
          <span class="dot dot-active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>

      <!-- Login Card -->
      <div v-if="step === 'login'" class="login-card">
        <!-- Brand Header -->
        <div class="card-brand">
          <div class="brand-icon">
            <span class="material-symbols-outlined" style="color: #fff; font-size: 20px"
              >shield</span
            >
          </div>
          <div class="brand-text">
            <span class="brand-title">WorkflowOS</span>
            <span class="brand-subtitle">Enterprise Workflow System</span>
          </div>
        </div>

        <div class="card-divider"></div>

        <!-- Form -->
        <div class="card-form">
          <h2 class="form-heading">{{ t('auth.signIn') }}</h2>

          <!-- Email -->
          <div class="field">
            <label class="field-label">{{ t('auth.corporateEmail') }}</label>
            <div class="field-input-wrap">
              <span class="field-icon material-symbols-outlined">mail</span>
              <input
                v-model="form.email"
                type="email"
                :placeholder="t('auth.emailPlaceholder')"
                class="field-input"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="field">
            <div class="field-label-row">
              <label class="field-label">{{ t('auth.securityKey') }}</label>
              <a href="#" class="field-link">{{ t('auth.forgotPassword') }}</a>
            </div>
            <div class="field-input-wrap">
              <span class="field-icon material-symbols-outlined">lock</span>
              <input
                v-model="form.password"
                type="password"
                :placeholder="t('auth.passwordPlaceholder')"
                class="field-input"
              />
              <button class="field-icon-btn" type="button" tabindex="-1">
                <span class="material-symbols-outlined">visibility</span>
              </button>
            </div>
          </div>

          <!-- SSO Button -->
          <DemoTooltip :message="t('demo.ssoRequired')">
            <button class="sso-btn" :disabled="loading" @click="handleSSOLogin">
              <span class="material-symbols-outlined" style="font-size: 16px">shield</span>
              {{ t('auth.ssoSignIn') }}
            </button>
          </DemoTooltip>

          <!-- Divider -->
          <div class="or-divider">
            <span class="or-line"></span>
            <span class="or-text">{{ t('auth.or') }}</span>
            <span class="or-line"></span>
          </div>

          <!-- Social SSO -->
          <div class="social-grid">
            <DemoTooltip :message="t('demo.ssoRequired')">
              <button class="social-btn">
                <span class="material-symbols-outlined" style="font-size: 14px">grid_view</span>
                {{ t('auth.microsoft') }}
              </button>
            </DemoTooltip>
            <DemoTooltip :message="t('demo.ssoRequired')">
              <button class="social-btn">
                <span
                  style="font-family: 'Material Symbols Outlined'; font-size: 18px; color: #404752"
                  >GOOGLE</span
                >
                {{ t('auth.google') }}
              </button>
            </DemoTooltip>
          </div>
        </div>
      </div>

      <!-- 2FA Card -->
      <div v-if="step === '2fa'" class="login-card tfa-card">
        <!-- Brand Header -->
        <div class="card-brand">
          <div class="brand-icon">
            <span class="material-symbols-outlined" style="color: #fff; font-size: 16px"
              >shield</span
            >
          </div>
          <span class="brand-title">WorkflowOS</span>
        </div>

        <div class="card-divider"></div>

        <!-- 2FA Content -->
        <div class="tfa-heading">
          <h2 class="form-heading">{{ t('auth.twoFactor') }}</h2>
          <p class="tfa-desc">{{ t('auth.twoFactorDesc') }}</p>
        </div>

        <!-- OTP Grid -->
        <div class="otp-grid" @paste="handleOtpPaste">
          <input
            v-for="(_, i) in otpDigits"
            :key="i"
            :ref="
              (el) => {
                if (el) otpRefs[i] = el as HTMLInputElement
              }
            "
            :value="otpDigits[i]"
            type="text"
            inputmode="numeric"
            maxlength="1"
            :class="['otp-box', { 'otp-active': !otpDigits[i] && (i === 0 || otpDigits[i - 1]) }]"
            @input="handleOtpInput(i, $event)"
            @keydown="handleOtpKeydown(i, $event)"
          />
        </div>

        <!-- Action Area -->
        <div class="tfa-actions">
          <DemoTooltip :message="t('demo.ssoRequired')">
            <button class="sso-btn" :disabled="loading" @click="handleVerify">
              {{ t('auth.verify') }}
            </button>
          </DemoTooltip>
          <div class="tfa-links">
            <a href="#" class="link-primary">{{ t('auth.resendCode') }}</a>
            <a href="#" class="link-muted">
              {{ t('auth.tryAnother') }}
              <span class="material-symbols-outlined" style="font-size: 8px; vertical-align: middle"
                >chevron_right</span
              >
            </a>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="page-footer">
      <span class="footer-copy">{{ t('footer.copyright') }}</span>
      <div class="footer-links">
        <template v-for="link in footerLinks" :key="link.labelKey">
          <a :href="link.href" class="footer-link">{{ t(link.labelKey) }}</a>
        </template>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ===== Page Shell ===== */
.login-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f9fc;
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  overflow: hidden;
}

/* ===== Background Decorations ===== */
.bg-decoration {
  position: absolute;
  width: 427px;
  height: 100%;
  right: 0;
  top: 0;
  opacity: 0.5;
  pointer-events: none;
}
.bg-blur {
  position: absolute;
  width: 600px;
  height: 600px;
  right: -96px;
  top: 256px;
  background: rgba(0, 96, 169, 0.05);
  filter: blur(60px);
  border-radius: 9999px;
}
.bg-border {
  position: absolute;
  width: 427px;
  height: 523px;
  right: -207px;
  bottom: -11px;
  background: rgba(242, 244, 247, 0.4);
  border-left: 1px solid rgba(192, 199, 212, 0.1);
  transform: matrix(1, 0, 0.21, 0.98, 0, 0);
}

.bg-decoration-2fa {
  position: absolute;
  inset: 0;
  opacity: 0.4;
  pointer-events: none;
}
.bg-blur-left {
  position: absolute;
  width: 512px;
  height: 557px;
  left: -64px;
  top: -93px;
  background: rgba(64, 158, 255, 0.1);
  filter: blur(60px);
  border-radius: 9999px;
}
.bg-blur-right {
  position: absolute;
  width: 512px;
  height: 557px;
  right: -64px;
  bottom: -93px;
  background: rgba(183, 212, 254, 0.1);
  filter: blur(60px);
  border-radius: 9999px;
}

/* ===== Header ===== */
.top-header {
  position: relative;
  width: 100%;
  z-index: 3;
  background: #f7f9fc;
}
.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 48px;
  height: 84px;
  box-sizing: border-box;
}
.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.brand-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background: #409eff;
  border-radius: 8px;
  flex-shrink: 0;
}
.brand-name {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.5px;
  color: #191c1e;
}
.header-nav {
  display: flex;
  align-items: center;
  gap: 16px;
}
.icon-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 9999px;
  cursor: pointer;
  color: #64748b;
  padding: 0;
}
.icon-btn:hover {
  background: rgba(0, 0, 0, 0.04);
}
.lang-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 11px;
  line-height: 1;
  color: #64748b;
  margin-left: 2px;
}

/* ===== Main Content ===== */
.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0 16px;
  gap: 80px;
}

/* ===== Login Card ===== */
.login-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  width: 440px;
  max-width: 440px;
  background: #ffffff;
  box-shadow: 0px 24px 48px rgba(25, 28, 30, 0.06);
  border-radius: 8px;
  box-sizing: border-box;
}

/* ===== Card Brand ===== */
.card-brand {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 8px;
}
.brand-text {
  display: flex;
  flex-direction: column;
}
.brand-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: #191c1e;
}
.brand-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #404752;
}

/* ===== Card Divider ===== */
.card-divider {
  width: 100%;
  height: 1px;
  background: #e6e8eb;
  margin: 24px 0;
}

/* ===== Form ===== */
.card-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}
.form-heading {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  color: #191c1e;
  margin: 0;
}

/* ===== Field ===== */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
}
.field-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.55px;
  text-transform: uppercase;
  color: #404752;
}
.field-link {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #0060a9;
  text-decoration: none;
}
.field-link:hover {
  text-decoration: underline;
}
.field-input-wrap {
  display: flex;
  align-items: center;
  position: relative;
  height: 42px;
  background: #eceef1;
  border-radius: 8px;
  overflow: hidden;
}
.field-icon {
  position: absolute;
  left: 12px;
  font-size: 20px;
  color: #404752;
  pointer-events: none;
}
.field-input {
  width: 100%;
  height: 40px;
  border: none;
  background: transparent;
  padding: 0 16px 0 40px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #191c1e;
  outline: none;
}
.field-input::placeholder {
  color: #707784;
}
.field-input:focus {
  outline: none;
}
.field-input-wrap:focus-within {
  box-shadow: 0 0 0 2px rgba(0, 96, 169, 0.3);
}
.field-icon-btn {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #404752;
  padding: 0;
}

/* ===== SSO Button ===== */
.sso-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, #0060a9 0%, #409eff 100%);
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
  cursor: pointer;
  position: relative;
  box-shadow:
    0px 10px 15px -3px rgba(0, 96, 169, 0.2),
    0px 4px 6px -4px rgba(0, 96, 169, 0.2);
}
.sso-btn:hover {
  opacity: 0.92;
}
.sso-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== Or Divider ===== */
.or-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
}
.or-line {
  flex: 1;
  height: 1px;
  background: #e6e8eb;
}
.or-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #404752;
}

/* ===== Social Grid ===== */
.social-grid {
  display: flex;
  gap: 20px;
}
.social-btn {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 40px;
  background: #f2f4f7;
  border: 1px solid rgba(192, 199, 212, 0.2);
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  color: #191c1e;
  cursor: pointer;
}
.social-btn:hover {
  background: #eceef1;
}

/* ===== 2FA Card ===== */
.tfa-card {
  gap: 32px;
}
.tfa-card .card-divider {
  margin: 0;
}
.tfa-heading {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.tfa-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 23px;
  color: #404752;
  margin: 0;
}

/* ===== OTP Grid ===== */
.otp-grid {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
}
.otp-box {
  width: 48px;
  height: 48px;
  background: #eceef1;
  border: 2px solid transparent;
  border-radius: 8px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #191c1e;
  outline: none;
  caret-color: #0060a9;
}
.otp-box:focus,
.otp-active:focus {
  background: #ffffff;
  border-color: #0060a9;
  color: #0060a9;
}

/* ===== 2FA Actions ===== */
.tfa-actions {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}
.tfa-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.link-primary {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #0060a9;
  text-decoration: none;
}
.link-primary:hover {
  text-decoration: underline;
}
.link-muted {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #909399;
  text-decoration: none;
}

/* ===== Editorial Side ===== */
.editorial-side {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 280px;
}
.editorial-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.editorial-accent {
  width: 48px;
  height: 2px;
  background: #0060a9;
}
.editorial-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 36px;
  line-height: 45px;
  letter-spacing: -1.8px;
  color: #191c1e;
  margin: 0;
}
.editorial-body {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #404752;
  margin: 0;
}
.editorial-dots {
  display: flex;
  gap: 8px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: #c0c7d4;
}
.dot-active {
  background: #0060a9;
}

/* ===== Footer ===== */
.page-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 32px 16px;
  width: 100%;
  z-index: 2;
  flex-wrap: wrap;
}
.footer-copy {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.55px;
  text-transform: uppercase;
  color: #94a3b8;
}
.footer-links {
  display: flex;
  gap: 16px;
}
.footer-link {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.55px;
  text-transform: uppercase;
  color: #94a3b8;
  text-decoration: none;
}
.footer-link:hover {
  color: #64748b;
}
</style>
