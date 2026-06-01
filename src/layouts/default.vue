<script setup>
import { useRoute } from 'vue-router'
import VideoBackground from '@/components/VideoBackground.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import WikiSidebar from '@/components/WikiSidebar.vue'
import WikiBreadcrumbs from '@/components/WikiBreadcrumbs.vue'
import WikiPageNav from '@/components/WikiPageNav.vue'
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

    <main class="flex-1 min-w-0 px-5 pt-24 pb-24 sm:px-8 lg:px-12 xl:px-16">
      <WikiBreadcrumbs />

      <article class="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 backdrop-blur-xl shadow-2xl shadow-black/30 md:p-10">
        <RouterView v-slot="{ Component }">
          <transition
            mode="out-in"
            enter-active-class="transition-opacity duration-400 ease-out"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-150 ease-in"
            leave-to-class="opacity-0"
          >
            <component :is="Component" />
          </transition>
        </RouterView>
        <WikiPageNav />
      </article>
    </main>
  </div>

  <SiteFooter />
  <BackToTop />
</template>
