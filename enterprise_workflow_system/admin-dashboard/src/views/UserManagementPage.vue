<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { api } from '@/api'
import type { User } from '@/api'

const { t } = useI18n()
const users = ref<User[]>([])
const loading = ref(true)
const search = ref('')
const roleFilter = ref('all')
const showInviteModal = ref(false)
const inviteForm = ref({
  name: '',
  email: '',
  role: 'Employee',
  department: 'Engineering',
  sendEmail: true,
})

onMounted(async () => {
  users.value = await api.getUsers()
  loading.value = false
})

const filtered = ref<User[]>([])
watch(
  [users, search, roleFilter],
  () => {
    const q = search.value.toLowerCase()
    filtered.value = users.value.filter(
      (u) =>
        (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) &&
        (roleFilter.value === 'all' || u.role === roleFilter.value),
    )
  },
  { immediate: true },
)

const stats = [
  { labelKey: 'users.total', value: '156', color: '#0060A9' },
  { labelKey: 'users.active', value: '148', color: '#286C00' },
  { labelKey: 'users.deactivated', value: '8', color: '#BA1A1A' },
]

function statusColor(status: string) {
  return status === 'active' ? '#55AF28' : '#BA1A1A'
}
</script>

<template>
  <div class="user-mgmt" v-loading="loading">
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ $t('users.title') }}</h1>
        <p class="page-sub">{{ $t('users.subtitle') }}</p>
      </div>
      <button class="btn-primary" @click="showInviteModal = true">
        <span class="material-symbols-outlined" style="font-size: 11px">add</span>
        {{ $t('users.inviteUser') }}
      </button>
    </div>

    <div class="stats-row">
      <div
        v-for="s in stats"
        :key="s.labelKey"
        class="stat-chip"
        :style="{ borderLeftColor: s.color }"
      >
        <span class="stat-label">{{ $t(s.labelKey) }}</span>
        <span class="stat-value" :style="{ color: s.color }">{{ s.value }}</span>
      </div>
    </div>

    <div class="filter-bar">
      <select v-model="roleFilter" class="filter-select" style="width: 120px">
        <option value="all">{{ $t('users.role') }}</option>
        <option>{{ $t('users.admin') }}</option>
        <option>{{ $t('users.manager') }}</option>
        <option>{{ $t('users.employee') }}</option>
      </select>
      <select class="filter-select" style="width: 140px">
        <option>{{ $t('users.department') }}</option>
      </select>
      <select class="filter-select" style="width: 100px">
        <option>{{ $t('users.status') }}</option>
      </select>
      <div class="filter-search">
        <span class="material-symbols-outlined fs-icon">search</span>
        <input
          v-model="search"
          type="text"
          :placeholder="$t('users.searchPlaceholder')"
          class="fs-input"
        />
      </div>
    </div>

    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>{{ $t('users.user') }}</th>
            <th>{{ $t('users.email') }}</th>
            <th>{{ $t('users.role') }}</th>
            <th>{{ $t('users.department') }}</th>
            <th>{{ $t('users.status') }}</th>
            <th>{{ $t('users.lastActive') }}</th>
            <th style="text-align: right">{{ $t('users.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in filtered" :key="u.id">
            <td>
              <div class="user-cell">
                <div class="user-avatar-sm">
                  {{
                    u.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                  }}
                </div>
                <span class="user-name-text">{{ u.name }}</span>
              </div>
            </td>
            <td>{{ u.email }}</td>
            <td>
              <span class="role-tag">{{ u.role }}</span>
            </td>
            <td>
              {{
                u.role === 'admin' ? $t('departments.engineering') : $t('departments.operations')
              }}
            </td>
            <td>
              <span class="status-dot" :style="{ background: statusColor(u.status) }"></span
              ><span class="status-text" :style="{ color: statusColor(u.status) }">{{
                u.status
              }}</span>
            </td>
            <td class="cell-muted">2 min ago</td>
            <td style="text-align: right">
              <button class="btn-dots">
                <span class="material-symbols-outlined" style="font-size: 12px">more_vert</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="table-footer">
        <span class="foot-text">{{ $t('users.showing') }} {{ filtered.length }} users</span>
        <div class="pag">
          <button class="pg-btn" disabled>&lt;</button><button class="pg-btn active">1</button
          ><button class="pg-btn">2</button><button class="pg-btn">3</button
          ><button class="pg-btn">&gt;</button>
        </div>
      </div>
    </div>

    <div v-if="showInviteModal" class="modal-overlay" @click.self="showInviteModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">{{ $t('users.inviteTitle') }}</h3>
          <button class="modal-close" @click="showInviteModal = false">
            <span class="material-symbols-outlined" style="font-size: 14px">close</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="mf">
            <label class="mf-l">{{ $t('users.fullName') }}</label
            ><input
              v-model="inviteForm.name"
              :placeholder="$t('users.namePlaceholder')"
              class="mf-i"
            />
          </div>
          <div class="mf">
            <label class="mf-l">{{ $t('users.emailAddress') }}</label
            ><input
              v-model="inviteForm.email"
              :placeholder="$t('users.emailPlaceholder')"
              class="mf-i"
            />
          </div>
          <div class="mf-row">
            <div class="mf">
              <label class="mf-l">{{ $t('users.role') }}</label
              ><select v-model="inviteForm.role" class="mf-s">
                <option>{{ $t('users.employee') }}</option>
                <option>{{ $t('users.manager') }}</option>
                <option>{{ $t('users.admin') }}</option>
              </select>
            </div>
            <div class="mf">
              <label class="mf-l">{{ $t('users.department') }}</label
              ><select v-model="inviteForm.department" class="mf-s">
                <option>{{ $t('departments.engineering') }}</option>
                <option>{{ $t('departments.finance') }}</option>
                <option>{{ $t('departments.hr') }}</option>
              </select>
            </div>
          </div>
          <label class="cb-row"
            ><input type="checkbox" v-model="inviteForm.sendEmail" class="cb" /><span>{{
              $t('users.sendWelcome')
            }}</span></label
          >
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="showInviteModal = false">
            {{ $t('users.cancel') }}</button
          ><button class="btn-primary" @click="showInviteModal = false">
            {{ $t('users.sendInvitation') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-mgmt {
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
  color: #909399;
  margin: 4px 0 0;
}
.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #0060a9, #409eff);
  border: none;
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}
.stats-row {
  display: flex;
  gap: 16px;
}
.stat-chip {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: #fff;
  border-left: 4px solid;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.stat-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #404752;
}
.stat-value {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
}
.filter-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.filter-select {
  height: 34px;
  padding: 0 12px;
  background: #f8fafc;
  border: 1px solid rgba(226, 232, 240, 0.5);
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #191c1e;
}
.filter-search {
  position: relative;
  margin-left: auto;
  width: 240px;
}
.fs-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #94a3b8;
  pointer-events: none;
}
.fs-input {
  width: 100%;
  height: 34px;
  padding: 0 12px 0 40px;
  background: #f8fafc;
  border: 1px solid rgba(226, 232, 240, 0.5);
  border-radius: 2px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}
.fs-input::placeholder {
  color: #6b7280;
}
.table-card {
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
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
  padding: 16px;
  font-weight: 700;
  font-size: 14px;
  color: #909399;
  text-align: left;
}
.data-table tbody tr {
  border-top: 1px solid #f8fafc;
}
.data-table tbody tr:hover {
  background: #fafbfc;
}
.data-table td {
  padding: 14px 16px;
  font-size: 14px;
  color: #404752;
}
.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}
.user-avatar-sm {
  width: 32px;
  height: 32px;
  border-radius: 12px;
  background: #d3e4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  color: #001c38;
  flex-shrink: 0;
}
.user-name-text {
  font-weight: 600;
  font-size: 16px;
  color: #191c1e;
}
.role-tag {
  padding: 1.5px 8px;
  background: #f1f5f9;
  border-radius: 2px;
  font-weight: 500;
  font-size: 12px;
  color: #191c1e;
}
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 12px;
  margin-right: 4px;
  vertical-align: middle;
}
.status-text {
  font-weight: 700;
  font-size: 11px;
  vertical-align: middle;
}
.cell-muted {
  color: #707784;
}
.btn-dots {
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
}
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #f2f4f7;
}
.foot-text {
  font-size: 12px;
  color: #707784;
}
.pag {
  display: flex;
  gap: 4px;
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
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(24, 28, 33, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  width: 480px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 24px 48px -12px rgba(24, 28, 33, 0.15);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #ebeef5;
}
.modal-title {
  font-weight: 700;
  font-size: 18px;
  color: #191c1e;
  margin: 0;
}
.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #404752;
}
.modal-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.mf {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.mf-row {
  display: flex;
  gap: 16px;
}
.mf-row .mf {
  flex: 1;
}
.mf-l {
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.55px;
  text-transform: uppercase;
  color: #404752;
}
.mf-i {
  height: 40px;
  padding: 0 12px;
  background: #f2f4f7;
  border: 1px solid rgba(192, 199, 212, 0.2);
  border-radius: 4px;
  font-size: 14px;
  color: #191c1e;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}
.mf-i::placeholder {
  color: #6b7280;
}
.mf-s {
  height: 40px;
  padding: 0 12px;
  background: #f2f4f7;
  border: 1px solid rgba(192, 199, 212, 0.2);
  border-radius: 4px;
  font-size: 14px;
  color: #191c1e;
  width: 100%;
}
.cb-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #404752;
  cursor: pointer;
}
.cb {
  accent-color: #0060a9;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #ebeef5;
}
.btn-cancel {
  padding: 8px 20px;
  background: none;
  border: none;
  font-weight: 500;
  font-size: 14px;
  color: #404752;
  cursor: pointer;
}
</style>
