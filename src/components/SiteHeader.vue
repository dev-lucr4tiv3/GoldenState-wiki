<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/logo-no-text.png'
import { useWikiNavigation } from '@/composables/useWikiNavigation'
import { useSearch } from '@/composables/useSearch'
import { Search, Menu, X, FileText } from 'lucide-vue-next'

const route = useRoute()
const { navTree } = useWikiNavigation()
const { searchQuery, searchResults } = useSearch()

const scrolled = ref(false)
const menuOpen = ref(false)
const isSectionActive = (path) => route.path === path || route.path.startsWith(`${path}/`)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'border-b border-white/8 bg-ink/85 backdrop-blur-xl shadow-lg shadow-black/20'
      : 'border-b border-transparent'"
  >
    <!-- Gold accent line when scrolled -->
    <div
      class="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
      :class="scrolled ? 'opacity-100' : 'opacity-0'"
      style="background: linear-gradient(90deg, transparent 0%, rgba(207,159,62,0.4) 30%, rgba(207,159,62,0.4) 70%, transparent 100%)"
    />

    <div class="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-5 sm:px-8">
      <!-- Logo -->
      <RouterLink to="/" class="group flex items-center gap-3">
        <img
          :src="logo"
          alt="GoldenState"
          class="h-9 w-9 object-contain transition-all duration-500 group-hover:scale-105 drop-shadow-[0_0_8px_rgba(207,159,62,0.3)]"
        />
        <div class="flex flex-col leading-none">
          <span class="font-display text-sm tracking-wide text-gold-200">GoldenState</span>
          <span class="text-[10px] uppercase tracking-widest text-zinc-600">Wiki</span>
        </div>
      </RouterLink>

      <!-- Right actions -->
      <div class="flex items-center gap-3">
        <a
          href="https://golden-state.tech"
          class="btn-ghost hidden px-4 py-2 text-xs sm:inline-flex"
        >
          Zur Website
        </a>

        <!-- Mobile menu toggle -->
        <button
          class="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.08] text-zinc-500 transition-colors hover:border-white/15 hover:text-zinc-300 lg:hidden"
          @click="menuOpen = !menuOpen"
          aria-label="Menü"
        >
          <Menu v-if="!menuOpen" class="h-4 w-4" :stroke-width="1.75" />
          <X v-else class="h-4 w-4" :stroke-width="1.75" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="menuOpen"
        class="border-t border-white/8 bg-ink/95 backdrop-blur-xl lg:hidden max-h-[80vh] overflow-y-auto"
      >
        <nav class="mx-auto flex flex-col px-5 py-5 space-y-5">
          <!-- Mobile Search -->
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600 pointer-events-none" :stroke-width="2" />
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Wiki durchsuchen…"
              class="w-full rounded-lg border border-white/[0.07] bg-white/[0.03] py-2.5 pl-9 pr-4 text-sm text-zinc-300 placeholder-zinc-600 focus:border-white/15 focus:outline-none"
            />
            <div
              v-if="searchQuery && searchResults.length > 0"
              class="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border border-white/10 bg-ink-card shadow-xl max-h-56 overflow-y-auto"
            >
              <ul class="p-1.5 space-y-0.5">
                <li v-for="result in searchResults" :key="result.path">
                  <RouterLink
                    :to="result.path"
                    class="block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
                    @click="searchQuery = ''; menuOpen = false"
                  >
                    <div class="font-medium truncate text-xs text-zinc-200">{{ result.title }}</div>
                    <div class="text-xs text-zinc-600 mt-0.5 line-clamp-2">{{ result.snippet }}</div>
                  </RouterLink>
                </li>
              </ul>
            </div>
            <div v-else v-show="searchQuery" class="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border border-white/10 bg-ink-card p-3 text-center text-xs text-zinc-600 shadow-xl">
              Keine Ergebnisse
            </div>
          </div>

          <!-- Nav items -->
          <div v-for="(item, index) in navTree" :key="index">
            <RouterLink
              v-if="!item.children"
              :to="item.path"
              class="block rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              active-class="text-gold-200 bg-gold-400/10 font-medium"
              @click="menuOpen = false"
            >
              {{ item.title }}
            </RouterLink>
            <div v-else>
              <RouterLink
                :to="item.path"
                class="mb-2 block px-3 text-[10px] font-semibold uppercase tracking-widest transition-colors"
                :class="isSectionActive(item.path) ? 'text-gold-300' : 'text-zinc-600'"
                @click="menuOpen = false"
              >
                {{ item.title }}
              </RouterLink>
              <div class="space-y-0.5 pl-3 border-l border-white/8 ml-3">
                <RouterLink
                  v-for="child in item.children"
                  :key="child.path"
                  :to="child.path"
                  class="block rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                  active-class="text-gold-200 bg-gold-400/10 font-medium"
                  @click="menuOpen = false"
                >
                  {{ child.title }}
                </RouterLink>
              </div>
            </div>
          </div>

          <a
            href="https://golden-state.tech"
            class="btn-ghost justify-center text-sm"
            @click="menuOpen = false"
          >
            Zur Website
          </a>
        </nav>
      </div>
    </transition>
  </header>
</template>
