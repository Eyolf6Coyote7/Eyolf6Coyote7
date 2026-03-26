<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart, BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { api } from '@/api'
import type { KpiData } from '@/api'

use([
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer,
])

const kpi = ref<KpiData | null>(null)

onMounted(async () => {
  kpi.value = await api.getKpi()
})

const pieOption = computed(() => {
  if (!kpi.value) return {}
  const { approved, rejected, pending } = kpi.value.approvalRate
  return {
    title: { text: 'Approval Rate', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { bottom: 0 },
    series: [
      {
        type: 'pie',
        radius: '60%',
        data: [
          { value: approved, name: 'Approved', itemStyle: { color: '#67c23a' } },
          { value: rejected, name: 'Rejected', itemStyle: { color: '#f56c6c' } },
          { value: pending, name: 'Pending', itemStyle: { color: '#e6a23c' } },
        ],
      },
    ],
  }
})

const barOption = computed(() => {
  if (!kpi.value) return {}
  return {
    title: { text: 'Monthly Request Volume' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: kpi.value.monthlyVolume.map((m) => m.month) },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'bar',
        data: kpi.value.monthlyVolume.map((m) => m.count),
        itemStyle: { color: '#409eff' },
      },
    ],
  }
})

const lineOption = computed(() => {
  if (!kpi.value) return {}
  return {
    title: { text: 'Avg Processing Time (hrs)' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: kpi.value.avgProcessingTime.map((m) => m.month) },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'line',
        data: kpi.value.avgProcessingTime.map((m) => m.hours),
        smooth: true,
        itemStyle: { color: '#e6a23c' },
      },
    ],
  }
})
</script>

<template>
  <div>
    <h2>KPI Dashboard</h2>
    <el-row :gutter="20" v-if="kpi">
      <el-col :span="8">
        <el-card>
          <v-chart :option="pieOption" style="height: 320px" autoresize />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <v-chart :option="barOption" style="height: 320px" autoresize />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <v-chart :option="lineOption" style="height: 320px" autoresize />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px" v-if="kpi">
      <el-col :span="8">
        <el-statistic
          title="Total Requests"
          :value="kpi.approvalRate.approved + kpi.approvalRate.rejected + kpi.approvalRate.pending"
        />
      </el-col>
      <el-col :span="8">
        <el-statistic
          title="Approval %"
          :value="
            Math.round(
              (kpi.approvalRate.approved /
                (kpi.approvalRate.approved +
                  kpi.approvalRate.rejected +
                  kpi.approvalRate.pending)) *
                100,
            )
          "
          suffix="%"
        />
      </el-col>
      <el-col :span="8">
        <el-statistic
          title="Avg Time (hrs)"
          :value="kpi.avgProcessingTime[kpi.avgProcessingTime.length - 1].hours"
        />
      </el-col>
    </el-row>
  </div>
</template>
