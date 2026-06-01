<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logo from '@/assets/logo-no-text.png'
import { useWikiNavigation } from '@/composables/useWikiNavigation'
import { useSearch } from '@/composables/useSearch'

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
    :class="scrolled ? 'border-b border-white/10 bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'"
  >
    <div class="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-5 sm:px-8">
      <RouterLink to="/" class="flex items-center gap-3 group">
        <img :src="logo" alt="GoldenState" class="h-12 w-12 object-contain transition-transform duration-500 group-hover:scale-105" />
        <span class="font-display text-lg tracking-wide text-gold-100 sm:block">GoldenState Wiki</span>
      </RouterLink>

      <div class="flex items-center gap-3">
        <a href="https://golden-state.tech" class="btn-ghost hidden px-5 py-2.5 sm:inline-flex">
          Zurück zur Website
        </a>

        <!-- Mobile Menu Toggle -->
        <button
          class="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-zinc-200 lg:hidden"
          @click="menuOpen = !menuOpen"
          aria-label="Menue"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path v-if="!menuOpen" d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
            <path v-else d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
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
      <div v-if="menuOpen" class="border-t border-white/10 bg-ink/95 backdrop-blur-xl lg:hidden max-h-[80vh] overflow-y-auto">
        <nav class="mx-auto flex flex-col px-5 py-6 space-y-6">
          <!-- Mobile Search -->
          <div class="relative">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Wiki durchsuchen..." 
                class="w-full bg-ink-soft border border-white/10 rounded-lg pl-10 pr-4 py-3 text-base text-zinc-200 focus:outline-none focus:border-gold-300 transition-colors"
              />
            </div>
            <!-- Mobile Search Results -->
            <div v-if="searchQuery && searchResults.length > 0" class="absolute w-full mt-2 bg-ink border border-white/10 rounded-lg shadow-xl max-h-64 overflow-y-auto z-50">
              <ul class="p-2 space-y-1">
                <li v-for="result in searchResults" :key="result.path">
                  <RouterLink 
                    :to="result.path" 
                    class="block px-3 py-2 text-sm rounded hover:bg-white/5 text-zinc-300 hover:text-gold-200"
                    @click="searchQuery = ''; menuOpen = false"
                  >
                    <div class="font-medium truncate text-zinc-200">{{ result.title }}</div>
                    <div class="text-xs text-zinc-500 mt-1 line-clamp-2">{{ result.snippet }}</div>
                  </RouterLink>
                </li>
              </ul>
            </div>
            <div v-else v-show="searchQuery" class="absolute w-full mt-2 bg-ink border border-white/10 rounded-lg shadow-xl p-4 text-sm text-zinc-500 text-center z-50">
              Keine Ergebnisse
            </div>
          </div>

          <div v-for="(item, index) in navTree" :key="index">
            <RouterLink 
              v-if="!item.children" 
              :to="item.path"
              class="block px-3 py-2 text-lg rounded hover:bg-white/5"
              active-class="text-gold-100 font-medium bg-white/5"
              @click="menuOpen = false"
            >
              {{ item.title }}
            </RouterLink>
            
            <div v-else>
              <RouterLink
                :to="item.path"
                class="mb-2 block px-3 text-sm font-semibold uppercase"
                :class="isSectionActive(item.path) ? 'text-gold-100' : 'text-gold-300/80 hover:text-gold-200'"
                @click="menuOpen = false"
              >
                {{ item.title }}
              </RouterLink>
              <div class="space-y-1 pl-4 border-l border-white/10 ml-3">
                <RouterLink 
                  v-for="child in item.children" 
                  :key="child.path"
                  :to="child.path"
                  class="block px-3 py-2 text-base rounded hover:bg-white/5 text-zinc-300"
                  active-class="text-gold-100 font-medium bg-white/5"
                  @click="menuOpen = false"
                >
                  {{ child.title }}
                </RouterLink>
              </div>
            </div>
          </div>
          
          <a href="https://golden-state.tech" class="mt-4 btn-ghost justify-center" @click="menuOpen = false">
            Zur Website
          </a>
        </nav>
      </div>
    </transition>
  </header>
</template>