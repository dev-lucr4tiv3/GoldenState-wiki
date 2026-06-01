<script setup>
import { useRoute } from 'vue-router'
import VideoBackground from '@/components/VideoBackground.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import WikiSidebar from '@/components/WikiSidebar.vue'
import WikiBreadcrumbs from '@/components/WikiBreadcrumbs.vue'
import BackToTop from '@/components/BackToTop.vue'
import ReadingProgress from '@/components/ReadingProgress.vue'
import { useMermaid } from '@/composables/useMermaid'

const route = useRoute()
useMermaid(route)
</script>

<template>
  <ReadingProgress />
  <VideoBackground />
  <SiteHeader />

  <div class="relative min-h-screen flex max-w-screen-2xl mx-auto">
    <WikiSidebar />

    <main class="flex-1 min-w-0 px-4 pt-28 pb-20 sm:px-8 lg:px-16 xl:px-24">
      <WikiBreadcrumbs />
      
      <div class="glass p-8 md:p-12 rounded-2xl relative">
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
      </div>
    </main>
  </div>

  <SiteFooter />
  <BackToTop />
</template>