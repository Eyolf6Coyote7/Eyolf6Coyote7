<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/api'
import type { Template } from '@/api'

const router = useRouter()
const templates = ref<Template[]>([])

onMounted(async () => {
  templates.value = await api.getTemplates()
})

function editTemplate(t: Template) {
  router.push(`/templates/${t.id}/edit`)
}
</script>

<template>
  <div>
    <h2>Workflow Templates</h2>
    <el-table :data="templates" stripe border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="description" label="Description" />
      <el-table-column prop="stepsCount" label="Steps" width="80" />
      <el-table-column prop="status" label="Status" width="110">
        <template #default="{ row }">
          <el-tag :type="row.status === 'Published' ? 'success' : 'warning'">{{
            row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="Updated" width="120" />
      <el-table-column label="Actions" width="100">
        <template #default="{ row }">
          <el-button size="small" @click="editTemplate(row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
