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
  <div class="fixed top-0 left-0 right-0 h-1 bg-white/5 z-[100]">
    <div 
      class="h-full bg-gradient-to-r from-gold-300 to-gold-100 transition-all duration-150 ease-out"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
