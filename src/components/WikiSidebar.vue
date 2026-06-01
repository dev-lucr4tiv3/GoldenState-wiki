<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useWikiNavigation } from '@/composables/useWikiNavigation'
import { useSearch } from '@/composables/useSearch'

const route = useRoute()
const router = useRouter()
const { navTree } = useWikiNavigation()
const { searchQuery, searchResults } = useSearch()

const searchMenu = ref(null)
const searchInput = ref(null)
const selectedIndex = ref(-1)

onClickOutside(searchMenu, () => { 
  searchQuery.value = '' 
  selectedIndex.value = -1
})

const isActive = (path) => route.path === path
const isSectionActive = (path) => route.path === path || route.path.startsWith(`${path}/`)

// Keyboard shortcut for search (Ctrl/Cmd + K)
const focusSearch = () => {
  if (searchInput.value) {
    searchInput.value.focus()
  }
}

// Navigate search results with arrow keys
onMounted(() => {
  onKeyStroke('k', (e) => {
    if ((e.ctrlKey || e.metaKey) && searchInput.value) {
      e.preventDefault()
      searchInput.value.focus()
    }
  })

  onKeyStroke('ArrowDown', (e) => {
    if (searchQuery.value && searchResults.value.length > 0) {
      e.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, searchResults.value.length - 1)
    }
  })

  onKeyStroke('ArrowUp', (e) => {
    if (searchQuery.value && searchResults.value.length > 0) {
      e.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
    }
  })

  onKeyStroke('Enter', (e) => {
    if (searchQuery.value && selectedIndex.value >= 0 && searchResults.value[selectedIndex.value]) {
      e.preventDefault()
      router.push(searchResults.value[selectedIndex.value].path)
      searchQuery.value = ''
      selectedIndex.value = -1
    }
  })
})

// Reset selected index when search query changes
watch(searchQuery, () => {
  selectedIndex.value = -1
})
</script>

<template>
  <aside class="w-64 flex-shrink-0 hidden lg:flex flex-col border-r border-white/10 glass rounded-2xl p-4 my-24 ml-8 h-[calc(100vh-140px)] sticky top-24 z-40">
    <div class="mb-6 px-2 relative" ref="searchMenu">
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <input 
          ref="searchInput"
          type="text" 
          v-model="searchQuery"
          placeholder="Wiki durchsuchen... (Ctrl+K)" 
          class="w-full bg-ink-soft border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-gold-300 transition-colors"
        />
      </div>
      <!-- Search Results Dropdown -->
      <div v-if="searchQuery && searchResults.length > 0" class="absolute w-full mt-2 bg-ink border border-white/10 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50">
        <ul class="p-2 space-y-1">
          <li v-for="(result, index) in searchResults" :key="result.path">
            <RouterLink 
              :to="result.path" 
              class="block px-3 py-2 text-sm rounded transition-colors"
              :class="index === selectedIndex ? 'bg-gold-300/20 text-gold-100' : 'hover:bg-white/5 text-zinc-300 hover:text-gold-200'"
              @click="searchQuery = ''"
            >
              <div class="font-medium truncate">{{ result.title }}</div>
              <div class="text-xs mt-1 line-clamp-2" :class="index === selectedIndex ? 'text-gold-200/80' : 'text-zinc-500'">{{ result.snippet }}</div>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div v-else v-show="searchQuery" class="absolute w-full mt-2 bg-ink border border-white/10 rounded-lg shadow-xl p-4 text-sm text-zinc-500 text-center z-50">
        Keine Ergebnisse
      </div>
    </div>
    
    <nav class="space-y-6 overflow-y-auto flex-1 pr-2">
      <div v-for="(item, index) in navTree" :key="index">
        <!-- Einfacher Link -->
        <RouterLink 
          v-if="!item.children" 
          :to="item.path"
          class="block px-2 py-1.5 text-sm rounded-md transition-colors"
          :class="isActive(item.path) ? 'text-gold-100 bg-white/5 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'"
        >
          {{ item.title }}
        </RouterLink>
        
        <!-- Kategorie mit Unterseiten -->
        <div v-else>
          <RouterLink
            :to="item.path"
            class="mb-2 block px-2 text-xs font-semibold uppercase tracking-wider transition-colors"
            :class="isSectionActive(item.path) ? 'text-gold-200' : 'text-gold-300/80 hover:text-gold-200'"
          >
            {{ item.title }}
          </RouterLink>
          <div class="space-y-1 pl-2 border-l border-white/5 ml-2">
            <RouterLink 
              v-for="child in item.children" 
              :key="child.path"
              :to="child.path"
              class="block px-2 py-1.5 text-sm rounded-md transition-colors"
              :class="isActive(child.path) ? 'text-gold-100 bg-white/5 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'"
            >
              {{ child.title }}
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>