<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  progress.value = scrollPercent
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div class="fixed top-0 left-0 right-0 h-px bg-white/[0.04] z-[100]">
    <div
      class="h-full transition-all duration-150 ease-out"
      style="background: linear-gradient(90deg, #a06f22, #cf9f3e, #dcb45a)"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
