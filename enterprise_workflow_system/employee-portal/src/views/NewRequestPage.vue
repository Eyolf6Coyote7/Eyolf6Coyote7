<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const currentStep = ref(1)

// Step 1: Template selection
const selectedTemplate = ref('')
const templates = [
  {
    id: 'leave',
    nameKey: 'newRequest.leaveRequest',
    descKey: 'newRequest.leaveDesc',
    icon: 'event_note',
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
  },
  {
    id: 'purchase',
    nameKey: 'newRequest.purchaseOrder',
    descKey: 'newRequest.purchaseDesc',
    icon: 'shopping_cart',
    iconBg: '#F0FDF4',
    iconColor: '#16A34A',
  },
  {
    id: 'travel',
    nameKey: 'newRequest.travelApproval',
    descKey: 'newRequest.travelDesc',
    icon: 'flight',
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
  },
  {
    id: 'equipment',
    nameKey: 'newRequest.equipmentRequest',
    descKey: 'newRequest.equipmentDesc',
    icon: 'devices',
    iconBg: '#FAF5FF',
    iconColor: '#9333EA',
  },
  {
    id: 'expense',
    nameKey: 'newRequest.expenseReport',
    descKey: 'newRequest.expenseDesc',
    icon: 'receipt_long',
    iconBg: '#F0FDFA',
    iconColor: '#0D9488',
  },
  {
    id: 'general',
    nameKey: 'newRequest.generalRequest',
    descKey: 'newRequest.generalDesc',
    icon: 'description',
    iconBg: '#F1F5F9',
    iconColor: '#475569',
  },
]

// Step 2: Form
const form = ref({
  title: '',
  department: 'Marketing & Communications',
  amount: '0.00',
  priority: 'medium',
  description: '',
  justification: '',
  attachment: null as string | null,
})

// Step 3: Review
const selectedTemplateName = computed(() => {
  const tpl = templates.find((tp) => tp.id === selectedTemplate.value)
  return tpl ? t(tpl.nameKey) : ''
})

function nextStep() {
  if (currentStep.value === 1 && !selectedTemplate.value) {
    ElMessage.warning('Please select a template')
    return
  }
  if (currentStep.value === 2 && !form.value.title) {
    ElMessage.warning('Please enter a request title')
    return
  }
  currentStep.value++
}

function prevStep() {
  currentStep.value--
}

async function submitRequest() {
  ElMessage.success('Request submitted successfully!')
  router.push('/dashboard')
}

const stepLabels = computed(() => [
  t('newRequest.step1'),
  t('newRequest.step2'),
  t('newRequest.step3'),
])

const priorityKeys: Record<string, string> = {
  low: 'priority.low',
  medium: 'priority.medium',
  high: 'priority.high',
  urgent: 'priority.urgent',
}
</script>

<template>
  <div class="new-request">
    <!-- Stepper -->
    <div class="stepper">
      <div
        v-for="(label, i) in stepLabels"
        :key="i"
        class="step"
        :class="{ completed: i + 1 < currentStep, active: i + 1 === currentStep }"
      >
        <div class="step-circle">
          <span
            v-if="i + 1 < currentStep"
            class="material-symbols-outlined"
            style="font-size: 14px; color: #fff"
            >check</span
          >
          <span v-else>{{ i + 1 }}</span>
        </div>
        <span class="step-label">{{ label }}</span>
        <div
          v-if="i < stepLabels.length - 1"
          class="step-connector"
          :class="{ filled: i + 1 < currentStep, half: i + 1 === currentStep }"
        ></div>
      </div>
    </div>

    <!-- Step 1: Select Template -->
    <div v-if="currentStep === 1" class="step-content">
      <div class="card">
        <div class="card-header-row">
          <div>
            <h2 class="card-title">{{ t('newRequest.chooseTemplate') }}</h2>
            <p class="card-desc">{{ t('newRequest.chooseTemplateDesc') }}</p>
          </div>
          <div class="search-field" style="width: 320px">
            <span class="material-symbols-outlined search-icon-sm">search</span>
            <input
              type="text"
              :placeholder="t('newRequest.searchTemplates')"
              class="search-input-sm"
            />
          </div>
        </div>

        <div class="template-grid">
          <div
            v-for="tp in templates"
            :key="tp.id"
            :class="['template-card', { selected: selectedTemplate === tp.id }]"
            @click="selectedTemplate = tp.id"
          >
            <div class="template-icon" :style="{ background: tp.iconBg }">
              <span
                class="material-symbols-outlined"
                :style="{ color: tp.iconColor, fontSize: '20px' }"
                >{{ tp.icon }}</span
              >
            </div>
            <h4 class="template-name">{{ t(tp.nameKey) }}</h4>
            <p class="template-desc">{{ t(tp.descKey) }}</p>
            <span class="material-symbols-outlined template-arrow">arrow_forward</span>
          </div>
        </div>

        <div class="card-footer-right">
          <button class="btn-primary" :class="{ disabled: !selectedTemplate }" @click="nextStep">
            {{ t('newRequest.continue') }}
            <span class="material-symbols-outlined" style="font-size: 8px">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Step 2: Fill Details -->
    <div v-if="currentStep === 2" class="step-content">
      <div class="card">
        <div class="card-body">
          <div class="card-heading-row">
            <div class="template-icon-sm" style="background: rgba(40, 108, 0, 0.1)">
              <span class="material-symbols-outlined" style="color: #286c00; font-size: 20px"
                >shopping_cart</span
              >
            </div>
            <h2 class="card-title">{{ selectedTemplateName }}</h2>
          </div>

          <div class="form-fields">
            <div class="field-full">
              <label class="field-label"
                >{{ t('newRequest.requestTitle') }} <span class="req">*</span></label
              >
              <input
                v-model="form.title"
                type="text"
                :placeholder="t('newRequest.titlePlaceholder')"
                class="form-input"
              />
            </div>

            <div class="field-row">
              <div class="field-half">
                <label class="field-label">{{ t('newRequest.department') }}</label>
                <select v-model="form.department" class="form-select">
                  <option>{{ t('departments.marketing') }}</option>
                  <option>{{ t('departments.engineering') }}</option>
                  <option>{{ t('departments.finance') }}</option>
                  <option>{{ t('departments.operations') }}</option>
                </select>
              </div>
              <div class="field-half">
                <label class="field-label">{{ t('newRequest.amount') }}</label>
                <div class="amount-wrap">
                  <span class="amount-prefix">&yen;</span>
                  <input v-model="form.amount" type="text" class="form-input amount-input" />
                </div>
              </div>
            </div>

            <div class="field-full">
              <label class="field-label">{{ t('detail.priority') }}</label>
              <div class="radio-group">
                <label
                  v-for="p in ['low', 'medium', 'high', 'urgent']"
                  :key="p"
                  class="radio-label"
                >
                  <input type="radio" v-model="form.priority" :value="p" class="radio-input" />
                  <span class="radio-text">{{ t(priorityKeys[p]) }}</span>
                </label>
              </div>
            </div>

            <div class="field-full">
              <label class="field-label">{{ t('newRequest.description') }}</label>
              <textarea
                v-model="form.description"
                :placeholder="t('newRequest.descPlaceholder')"
                class="form-textarea"
                rows="4"
              ></textarea>
            </div>

            <div class="field-full">
              <label class="field-label">{{ t('newRequest.justification') }}</label>
              <textarea
                v-model="form.justification"
                :placeholder="t('newRequest.justPlaceholder')"
                class="form-textarea"
                rows="3"
              ></textarea>
            </div>

            <div class="field-full">
              <label class="field-label">{{ t('newRequest.attachments') }}</label>
              <div class="dropzone">
                <span class="material-symbols-outlined" style="font-size: 28px; color: #0060a9"
                  >cloud_upload</span
                >
                <span class="dropzone-text">{{ t('newRequest.dragFiles') }}</span>
                <span class="dropzone-hint">{{ t('newRequest.maxSize') }}</span>
              </div>
              <div v-if="form.attachment" class="file-chip">
                <span class="material-symbols-outlined" style="font-size: 12px">description</span>
                {{ form.attachment }}
                <button class="chip-remove" @click="form.attachment = null">
                  <span class="material-symbols-outlined" style="font-size: 10px">close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer-between">
          <button class="btn-outline" @click="prevStep">{{ t('newRequest.back') }}</button>
          <button class="btn-primary" @click="nextStep">{{ t('newRequest.nextReview') }}</button>
        </div>
      </div>
    </div>

    <!-- Step 3: Review & Submit -->
    <div v-if="currentStep === 3" class="step-content">
      <div class="card">
        <div class="card-body">
          <div class="review-header">
            <h2 class="card-title">{{ t('newRequest.reviewTitle') }}</h2>
            <p class="card-desc">{{ t('newRequest.reviewDesc') }}</p>
          </div>

          <div class="review-rows">
            <div class="review-row">
              <span class="review-term">{{ t('newRequest.requestTitle') }}</span>
              <span class="review-detail">{{ form.title || t('newRequest.untitled') }}</span>
            </div>
            <div class="review-row">
              <span class="review-term">{{ t('newRequest.department') }}</span>
              <span class="review-detail">{{ form.department }}</span>
            </div>
            <div class="review-row">
              <span class="review-term">{{ t('detail.priority') }}</span>
              <span class="review-priority" :class="form.priority">{{
                form.priority.toUpperCase()
              }}</span>
            </div>
            <div class="review-row">
              <span class="review-term">{{ t('newRequest.amount') }}</span>
              <span class="review-detail" style="font-weight: 700">&yen;{{ form.amount }}</span>
            </div>
            <div class="review-row review-row-block" v-if="form.description">
              <span class="review-term">{{ t('newRequest.description') }}</span>
              <p class="review-body">{{ form.description }}</p>
            </div>
            <div class="review-row review-row-block" v-if="form.justification">
              <span class="review-term">{{ t('newRequest.justification') }}</span>
              <p class="review-body">{{ form.justification }}</p>
            </div>
          </div>
        </div>
        <div class="card-footer-between">
          <button class="btn-outline" @click="prevStep">
            <span class="material-symbols-outlined" style="font-size: 12px">arrow_back</span>
            {{ t('newRequest.back') }}
          </button>
          <button class="btn-primary btn-submit" @click="submitRequest">
            {{ t('newRequest.submitRequest') }}
            <span class="material-symbols-outlined" style="font-size: 14px">send</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.new-request {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 8px 0;
}

/* Stepper */
.stepper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0;
  width: 100%;
  max-width: 896px;
  position: relative;
}
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}
.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #64748b;
  background: #e2e8f0;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
}
.step.active .step-circle {
  background: #0060a9;
  color: #fff;
  box-shadow: 0 0 0 4px #dbeafe;
}
.step.completed .step-circle {
  background: #0060a9;
  color: #fff;
  box-shadow: 0 0 0 4px #dbeafe;
}
.step-label {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #94a3b8;
  text-align: center;
}
.step.active .step-label {
  color: #0060a9;
}
.step.completed .step-label {
  color: #64748b;
}
.step-connector {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: #e2e8f0;
  z-index: 1;
}
.step-connector.filled {
  background: #0060a9;
}
.step-connector.half {
  background: linear-gradient(to right, #0060a9 50%, #e2e8f0 50%);
}

/* Card */
.step-content {
  width: 100%;
  max-width: 996px;
}
.card {
  background: #ffffff;
  border: 1px solid rgba(192, 199, 212, 0.1);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}
.card-body {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 32px 32px 0;
  gap: 16px;
}
.card-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5px;
  color: #191c1e;
  margin: 0;
}
.card-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #404752;
  margin: 4px 0 0;
}

/* Search */
.search-field {
  position: relative;
}
.search-icon-sm {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  color: #94a3b8;
  pointer-events: none;
}
.search-input-sm {
  width: 100%;
  height: 40px;
  padding: 0 16px 0 40px;
  background: #f2f4f7;
  border: 1px solid rgba(192, 199, 212, 0.3);
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #191c1e;
  outline: none;
  box-sizing: border-box;
}
.search-input-sm::placeholder {
  color: #6b7280;
}

/* Template Grid */
.template-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 24px 32px;
}
.template-card {
  position: relative;
  padding: 25px;
  background: #ffffff;
  border: 1px solid rgba(192, 199, 212, 0.4);
  border-radius: 8px;
  cursor: pointer;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}
.template-card:hover {
  border-color: #409eff;
  box-shadow: 0 0 0 1px #409eff;
}
.template-card.selected {
  border-color: #0060a9;
  box-shadow: 0 0 0 2px #0060a9;
}
.template-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.template-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #191c1e;
  margin: 0 0 4px;
}
.template-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #404752;
  margin: 0;
}
.template-arrow {
  position: absolute;
  right: 25px;
  bottom: 25px;
  font-size: 16px;
  color: #cbd5e1;
}

/* Footer */
.card-footer-right {
  display: flex;
  justify-content: flex-end;
  padding: 16px 32px;
}
.card-footer-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  background: #f2f4f7;
}

/* Buttons */
.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 32px;
  background: linear-gradient(135deg, #0060a9 0%, #409eff 100%);
  border: none;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
}
.btn-primary.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-primary:hover:not(.disabled) {
  opacity: 0.9;
}
.btn-submit {
  padding: 10px 32px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(64, 158, 255, 0.3);
}
.btn-outline {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  background: transparent;
  border: 1px solid #c0c7d4;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #404752;
  cursor: pointer;
}

/* Form Fields */
.card-heading-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.template-icon-sm {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.field-full {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-row {
  display: flex;
  gap: 24px;
}
.field-half {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #404752;
}
.req {
  color: #ba1a1a;
}
.form-input {
  height: 40px;
  padding: 0 16px;
  background: #f2f4f7;
  border: 1px solid rgba(192, 199, 212, 0.3);
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #191c1e;
  outline: none;
  box-sizing: border-box;
  width: 100%;
}
.form-input::placeholder {
  color: #6b7280;
}
.form-input:focus {
  border-color: #0060a9;
}
.form-select {
  height: 40px;
  padding: 0 16px;
  background: #f2f4f7;
  border: 1px solid rgba(192, 199, 212, 0.3);
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #191c1e;
  outline: none;
  width: 100%;
  appearance: auto;
}
.amount-wrap {
  position: relative;
}
.amount-prefix {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #404752;
}
.amount-input {
  padding-left: 28px;
}
.form-textarea {
  padding: 16px;
  background: #f2f4f7;
  border: 1px solid rgba(192, 199, 212, 0.3);
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #191c1e;
  outline: none;
  resize: vertical;
  width: 100%;
  box-sizing: border-box;
}
.form-textarea::placeholder {
  color: #6b7280;
}
.radio-group {
  display: flex;
  gap: 16px;
}
.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.radio-input {
  accent-color: #0060a9;
  width: 16px;
  height: 16px;
}
.radio-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #404752;
}

/* Dropzone */
.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(211, 228, 255, 0.2);
  border: 2px dashed rgba(0, 96, 169, 0.3);
  border-radius: 8px;
  cursor: pointer;
}
.dropzone-text {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #0060a9;
  margin-top: 8px;
}
.dropzone-hint {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 11px;
  color: #404752;
  margin-top: 4px;
}
.file-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #eceef1;
  border: 1px solid rgba(192, 199, 212, 0.2);
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #404752;
  margin-top: 10px;
}
.chip-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: #191c1e;
  padding: 0;
  display: flex;
}

/* Review */
.review-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(192, 199, 212, 0.15);
}
.review-rows {
  display: flex;
  flex-direction: column;
}
.review-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f1f5f9;
}
.review-row-block {
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
}
.review-term {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #909399;
}
.review-detail {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #303133;
  text-align: right;
}
.review-body {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 23px;
  color: #303133;
  margin: 0;
}
.review-priority {
  display: inline-flex;
  padding: 3.5px 12px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: -0.6px;
  text-transform: uppercase;
}
.review-priority.low {
  background: #dcfce7;
  color: #15803d;
}
.review-priority.medium {
  background: #b7d4fe;
  color: #003460;
}
.review-priority.high {
  background: #fef2f2;
  color: #dc2626;
}
.review-priority.urgent {
  background: #fef2f2;
  color: #dc2626;
}
</style>
