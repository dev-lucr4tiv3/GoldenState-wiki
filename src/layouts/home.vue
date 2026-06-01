<script setup>
import VideoBackground from '@/components/VideoBackground.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import BackToTop from '@/components/BackToTop.vue'
import ReadingProgress from '@/components/ReadingProgress.vue'
</script>

<template>
  <ReadingProgress />
  <VideoBackground />
  <SiteHeader />
  <RouterView v-slot="{ Component }">
    <transition
      mode="out-in"
      enter-active-class="transition-opacity duration-500 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <component :is="Component" />
    </transition>
  </RouterView>
  <SiteFooter />
  <BackToTop />
</template>
