import type { Metric } from 'web-vitals'
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

function sendMetric(metric: Metric) {
  if (import.meta.env.DEV) {
    console.log('[Web Vitals]', metric.name, metric.value, metric)
  }
}

export function initWebVitals() {
  onCLS(sendMetric)
  onFCP(sendMetric)
  onINP(sendMetric)
  onLCP(sendMetric)
  onTTFB(sendMetric)
}
