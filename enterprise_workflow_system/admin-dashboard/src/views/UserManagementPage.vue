<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { api } from '@/api'
import type { User } from '@/api'

const users = ref<User[]>([])
const dialogVisible = ref(false)
const editingUser = ref<Partial<User>>({})
const isEditing = ref(false)

onMounted(async () => {
  users.value = await api.getUsers()
})

function openCreate() {
  editingUser.value = {
    name: '',
    email: '',
    role: 'Employee',
    status: 'Active',
    createdAt: new Date().toISOString().slice(0, 10),
  }
  isEditing.value = false
  dialogVisible.value = true
}

function openEdit(user: User) {
  editingUser.value = { ...user }
  isEditing.value = true
  dialogVisible.value = true
}

async function saveUser() {
  if (isEditing.value && editingUser.value.id) {
    await api.updateUser(editingUser.value.id, editingUser.value)
    const idx = users.value.findIndex((u) => u.id === editingUser.value.id)
    if (idx >= 0) Object.assign(users.value[idx], editingUser.value)
    ElMessage.success('User updated')
  } else {
    const created = await api.createUser(editingUser.value as Omit<User, 'id'>)
    users.value.push(created)
    ElMessage.success('User created')
  }
  dialogVisible.value = false
}

async function handleDelete(user: User) {
  await ElMessageBox.confirm(`Delete ${user.name}?`, 'Confirm')
  await api.deleteUser(user.id)
  users.value = users.value.filter((u) => u.id !== user.id)
  ElMessage.success('Deleted')
}
</script>

<template>
  <div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      "
    >
      <h2 style="margin: 0">User Management</h2>
      <el-button type="primary" @click="openCreate">Add User</el-button>
    </div>

    <el-table :data="users" stripe border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="role" label="Role" width="120">
        <template #default="{ row }">
          <el-tag
            :type="row.role === 'Admin' ? 'danger' : row.role === 'Manager' ? 'warning' : 'info'"
          >
            {{ row.role }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 'Active' ? 'success' : 'info'">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="Created" width="120" />
      <el-table-column label="Actions" width="160">
        <template #default="{ row }">
          <el-button size="small" @click="openEdit(row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      :title="isEditing ? 'Edit User' : 'Create User'"
      width="480px"
    >
      <el-form label-width="80px">
        <el-form-item label="Name">
          <el-input v-model="editingUser.name" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="editingUser.email" />
        </el-form-item>
        <el-form-item label="Role">
          <el-select v-model="editingUser.role">
            <el-option label="Admin" value="Admin" />
            <el-option label="Manager" value="Manager" />
            <el-option label="Employee" value="Employee" />
          </el-select>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="editingUser.status">
            <el-option label="Active" value="Active" />
            <el-option label="Inactive" value="Inactive" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveUser">Save</el-button>
      </template>
    </el-dialog>
  </div>
</template>
