<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ message?: string }>()
const isMock = import.meta.env.VITE_MOCK === 'true'
const show = ref(false)
const pos = ref({ top: 0, left: 0 })
const wrapper = ref<HTMLElement | null>(null)

function enter() {
  if (wrapper.value) {
    const r = wrapper.value.getBoundingClientRect()
    pos.value = { top: r.top - 8, left: r.left + r.width / 2 }
  }
  show.value = true
}
</script>

<template>
  <span v-if="!isMock"><slot /></span>
  <span
    v-else
    ref="wrapper"
    style="position: relative; display: inline-flex"
    @mouseenter="enter"
    @mouseleave="show = false"
  >
    <span style="width: 100%"><slot /></span>
    <Teleport to="body">
      <span
        v-if="show"
        :style="{
          position: 'fixed',
          top: pos.top + 'px',
          left: pos.left + 'px',
          transform: 'translate(-50%, -100%)',
          background: '#1f2937',
          color: 'white',
          fontSize: '12px',
          padding: '6px 12px',
          borderRadius: '6px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 9999,
        }"
      >
        🔒 {{ props.message || 'Available in full version' }}
      </span>
    </Teleport>
  </span>
</template>
