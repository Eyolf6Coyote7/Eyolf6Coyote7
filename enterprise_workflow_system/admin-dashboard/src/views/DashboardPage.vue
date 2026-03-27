<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
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

const { t } = useI18n()
const kpi = ref<KpiData | null>(null)
onMounted(async () => {
  kpi.value = await api.getKpi()
})

const kpiCards = computed(() => {
  if (!kpi.value) return []
  const total =
    kpi.value.approvalRate.approved +
    kpi.value.approvalRate.rejected +
    kpi.value.approvalRate.pending
  return [
    {
      label: t('dashboard.avgTurnaround'),
      value: '6.2 hours',
      trend: '↓ 12% vs last month',
      trendColor: '#67C23A',
      borderColor: '#409EFF',
    },
    {
      label: t('dashboard.pendingRequests'),
      value: String(kpi.value.approvalRate.pending),
      trend: '↑ 8%',
      trendColor: '#F56C6C',
      borderColor: '#E6A23C',
    },
    {
      label: t('dashboard.completedThisMonth'),
      value: String(total),
      trend: '↑ 15%',
      trendColor: '#67C23A',
      borderColor: '#67C23A',
    },
    {
      label: t('dashboard.escalated'),
      value: '7',
      trend: '↗ +3 from yesterday',
      trendColor: '#F56C6C',
      borderColor: '#F56C6C',
    },
  ]
})

const barOption = computed(() => {
  if (!kpi.value) return {}
  return {
    tooltip: { trigger: 'axis' },
    legend: {
      right: 0,
      top: 0,
      data: [t('dashboard.submitted'), t('dashboard.completed')],
      textStyle: { fontSize: 12, color: '#404752' },
    },
    grid: { left: 40, right: 16, bottom: 40, top: 24 },
    xAxis: {
      type: 'category',
      data: kpi.value.monthlyVolume.map((m) => m.month),
      axisLabel: { fontSize: 10, color: '#404752' },
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 10, color: '#404752' },
      splitLine: { lineStyle: { color: 'rgba(192,199,212,0.1)' } },
    },
    series: [
      {
        type: 'bar',
        name: t('dashboard.submitted'),
        data: kpi.value.monthlyVolume.map((m) => m.count),
        itemStyle: { color: '#409EFF' },
        barWidth: 32,
      },
      {
        type: 'bar',
        name: t('dashboard.completed'),
        data: kpi.value.monthlyVolume.map((m) => Math.round(m.count * 0.7)),
        itemStyle: { color: '#A0CFFF' },
        barWidth: 32,
      },
    ],
  }
})

const lineOption = computed(() => {
  if (!kpi.value) return {}
  return {
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 16, bottom: 40, top: 24 },
    xAxis: {
      type: 'category',
      data: kpi.value.avgProcessingTime.map((m) => m.month),
      axisLabel: { fontSize: 10, color: '#404752' },
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 10, color: '#404752' },
      splitLine: { lineStyle: { color: 'rgba(192,199,212,0.1)' } },
    },
    series: [
      {
        type: 'line',
        data: kpi.value.avgProcessingTime.map((m) => m.hours),
        smooth: true,
        itemStyle: { color: '#409EFF' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(64,158,255,0.3)' },
              { offset: 1, color: 'rgba(64,158,255,0)' },
            ],
          },
        },
        markLine: {
          data: [
            {
              yAxis: 8,
              lineStyle: { type: 'dashed', color: 'rgba(245,108,108,0.4)' },
              label: { show: false },
            },
          ],
        },
      },
    ],
  }
})

const pieOption = computed(() => {
  if (!kpi.value) return {}
  const { approved, rejected, pending } = kpi.value.approvalRate
  const total = approved + rejected + pending
  return {
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: { fontSize: 12, color: '#404752' } },
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '38%',
        style: {
          text: String(total),
          font: '700 36px Inter',
          fill: '#191C1E',
          textAlign: 'center',
        },
      },
      {
        type: 'text',
        left: 'center',
        top: '50%',
        style: {
          text: t('dashboard.total'),
          font: '400 14px Inter',
          fill: '#707784',
          textAlign: 'center',
        },
      },
    ],
    series: [
      {
        type: 'pie',
        radius: ['55%', '75%'],
        center: ['50%', '45%'],
        label: { show: false },
        data: [
          { value: approved, name: `Leave (35%)`, itemStyle: { color: '#409EFF' } },
          { value: rejected, name: `Purchase (25%)`, itemStyle: { color: '#E6A23C' } },
          { value: pending, name: `Travel (20%)`, itemStyle: { color: '#67C23A' } },
          {
            value: Math.round(total * 0.12),
            name: `Equipment (12%)`,
            itemStyle: { color: '#F56C6C' },
          },
          { value: Math.round(total * 0.08), name: `Other (8%)`, itemStyle: { color: '#909399' } },
        ],
      },
    ],
  }
})

const bottlenecks = [
  { name: 'HR Security Clearance', time: '42h avg.', pct: 95 },
  { name: 'Finance Audit Review', time: '36h avg.', pct: 80 },
  { name: 'Legal Contract Sign-off', time: '29h avg.', pct: 65 },
  { name: 'Department Manager Approval', time: '18h avg.', pct: 45 },
  { name: 'IT Provisioning', time: '12h avg.', pct: 30 },
]
</script>

<template>
  <div class="admin-dash">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ $t('dashboard.title') }}</h1>
        <p class="page-sub">{{ $t('dashboard.subtitle') }}</p>
      </div>
      <div class="date-picker">
        <span>{{ $t('dashboard.last30Days') }}</span>
        <span class="material-symbols-outlined" style="font-size: 18px; color: #707784"
          >calendar_today</span
        >
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-row" v-if="kpi">
      <div
        v-for="card in kpiCards"
        :key="card.label"
        class="kpi-card"
        :style="{ borderLeftColor: card.borderColor }"
      >
        <div class="kpi-top">
          <span class="kpi-label">{{ card.label }}</span>
          <h3 class="kpi-value">{{ card.value }}</h3>
        </div>
        <div class="kpi-bottom">
          <span class="kpi-trend" :style="{ color: card.trendColor }">{{ card.trend }}</span>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="charts-row" v-if="kpi">
      <div class="chart-card">
        <h3 class="chart-title">{{ $t('dashboard.requestVolume') }}</h3>
        <v-chart :option="barOption" style="height: 300px" autoresize />
      </div>
      <div class="chart-card">
        <h3 class="chart-title">{{ $t('dashboard.turnaroundTrend') }}</h3>
        <v-chart :option="lineOption" style="height: 300px" autoresize />
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="charts-row" v-if="kpi">
      <div class="chart-card">
        <h3 class="chart-title">{{ $t('dashboard.topBottlenecks') }}</h3>
        <div class="bottleneck-list">
          <div v-for="b in bottlenecks" :key="b.name" class="bn-row">
            <div class="bn-header">
              <span class="bn-name">{{ b.name }}</span>
              <span class="bn-time">{{ b.time }}</span>
            </div>
            <div class="bn-bar-bg">
              <div class="bn-bar-fill" :style="{ width: b.pct + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <h3 class="chart-title">{{ $t('dashboard.requestByType') }}</h3>
        <v-chart :option="pieOption" style="height: 300px" autoresize />
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dash {
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
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: #303133;
  margin: 0;
}
.page-sub {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #909399;
  margin: 4px 0 0;
}
.date-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  height: 40px;
  background: #ffffff;
  border: 1px solid rgba(192, 199, 212, 0.15);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #404752;
}

/* KPI Row */
.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.kpi-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background: #ffffff;
  border-left: 4px solid;
  box-shadow: 0px 12px 32px rgba(0, 96, 169, 0.06);
  border-radius: 8px;
  min-height: 120px;
}
.kpi-top {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.kpi-label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #404752;
}
.kpi-value {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #181c20;
  margin: 0;
}
.kpi-bottom {
  padding-top: 16px;
}
.kpi-trend {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
}

/* Charts */
.charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.chart-card {
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 24px;
}
.chart-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #181c20;
  margin: 0 0 16px;
}

/* Bottlenecks */
.bottleneck-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.bn-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.bn-header {
  display: flex;
  justify-content: space-between;
}
.bn-name {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #181c20;
}
.bn-time {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #404752;
}
.bn-bar-bg {
  height: 8px;
  background: #e6e8ef;
  border-radius: 9999px;
  overflow: hidden;
}
.bn-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #e6a23c 0%, #f56c6c 100%);
  border-radius: 9999px;
}
</style>
