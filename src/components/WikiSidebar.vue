<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { ref, watch, reactive } from 'vue'
import { useWikiNavigation } from '@/composables/useWikiNavigation'
import { useSearch } from '@/composables/useSearch'
import {
  // UI
  Search, ChevronRight,
  // Section icons
  Rocket, Scale, Users, Briefcase, LifeBuoy, Lightbulb,
  // Page icons – getting-started
  Plane, ClipboardList, MapPin, BookOpen, Keyboard, Package, Shirt, Headphones,
  // Page icons – rules
  AlertCircle, MessageCircle,
  // Page icons – factions
  Shield, Activity,
  // Page icons – jobs
  Car, Truck,
  // Page icons – howto
  Smartphone, FileCheck, DollarSign, Home,
  // Page icons – support
  MessageSquare,
  // Fallback
  FileText,
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { navTree } = useWikiNavigation()
const { searchQuery, searchResults } = useSearch()

const searchMenu = ref(null)
const searchInput = ref(null)
const selectedIndex = ref(-1)

// ─── Icon maps ────────────────────────────────────────────────────────────
const sectionIconMap = {
  'getting-started': Rocket,
  'rules':           Scale,
  'factions':        Users,
  'jobs':            Briefcase,
  'support':         LifeBuoy,
  'howto':           Lightbulb,
}

const pageIconMap = {
  '/getting-started/how-to-join':    Plane,
  '/getting-started/preparation':    ClipboardList,
  '/getting-started/first-steps':    MapPin,
  '/getting-started/roleplay-guide': BookOpen,
  '/getting-started/keybinds':       Keyboard,
  '/getting-started/inventory':      Package,
  '/getting-started/clothing':       Shirt,
  '/getting-started/voice-chat':     Headphones,
  '/rules/general':                  AlertCircle,
  '/rules/roleplay':                 MessageCircle,
  '/factions/lspd':                  Shield,
  '/factions/ems':                   Activity,
  '/jobs/taxi':                      Car,
  '/jobs/trucker':                   Truck,
  '/howto/phone':                    Smartphone,
  '/howto/license':                  FileCheck,
  '/howto/vehicle':                  Car,
  '/howto/money':                    DollarSign,
  '/howto/housing':                  Home,
  '/support/tickets':                MessageSquare,
}

function getSectionIcon(item) {
  const slug = item.path?.split('/').filter(Boolean)[0] ?? ''
  return sectionIconMap[slug] ?? BookOpen
}

function getPageIcon(path) {
  return pageIconMap[path] ?? FileText
}

// ─── Collapsible state ────────────────────────────────────────────────────
// Tracks which sections are open. Default = nothing open = all collapsed.
const expanded = reactive(new Set())

function toggle(slug) {
  if (expanded.has(slug)) expanded.delete(slug)
  else expanded.add(slug)
}

function isCollapsed(slug) {
  return !expanded.has(slug)
}

// Auto-expand the section of the active route
watch(() => route.path, (path) => {
  const slug = path.split('/').filter(Boolean)[0]
  if (slug) expanded.add(slug)
}, { immediate: true })

// ─── Search ───────────────────────────────────────────────────────────────
onClickOutside(searchMenu, () => {
  searchQuery.value = ''
  selectedIndex.value = -1
})

const isActive = (path) => route.path === path
const isSectionActive = (path) => route.path === path || route.path.startsWith(`${path}/`)

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
watch(searchQuery, () => { selectedIndex.value = -1 })
</script>

<template>
  <aside class="hidden lg:flex w-56 flex-shrink-0 flex-col sticky top-20 h-[calc(100vh-5rem)] my-6 ml-6 z-40">

    <!-- Search -->
    <div class="mb-4 relative" ref="searchMenu">
      <div class="relative">
        <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-600 pointer-events-none" :stroke-width="2" />
        <input
          ref="searchInput"
          type="text"
          v-model="searchQuery"
          placeholder="Suchen… ⌘K"
          class="w-full rounded-lg border border-white/[0.07] bg-white/[0.03] py-2 pl-8 pr-3 text-xs text-zinc-300 placeholder-zinc-700 transition-colors focus:border-white/15 focus:outline-none focus:bg-white/[0.05]"
        />
      </div>

      <div
        v-if="searchQuery && searchResults.length > 0"
        class="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-white/[0.08] bg-zinc-950/95 shadow-2xl shadow-black/60 backdrop-blur-xl max-h-72 overflow-y-auto"
      >
        <ul class="p-1 space-y-px">
          <li v-for="(result, index) in searchResults" :key="result.path">
            <RouterLink
              :to="result.path"
              class="block rounded-lg px-3 py-2 transition-colors"
              :class="index === selectedIndex ? 'bg-white/8 text-zinc-100' : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200'"
              @click="searchQuery = ''"
            >
              <div class="truncate font-medium text-xs">{{ result.title }}</div>
              <div class="mt-0.5 line-clamp-1 text-[10px] text-zinc-600">{{ result.snippet }}</div>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div
        v-else v-show="searchQuery"
        class="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-white/[0.08] bg-zinc-950/95 p-3 text-center text-xs text-zinc-600 shadow-xl backdrop-blur-xl"
      >
        Keine Ergebnisse
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto pr-1 scrollbar-hide space-y-px">
      <div v-for="(item, index) in navTree" :key="index">

        <!-- Top-level page (no children) -->
        <RouterLink
          v-if="!item.children"
          :to="item.path"
          class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-all duration-100"
          :class="isActive(item.path)
            ? 'bg-white/[0.07] text-zinc-100 font-medium'
            : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'"
        >
          <component :is="getSectionIcon(item)" class="h-3.5 w-3.5 flex-shrink-0" :stroke-width="1.75" />
          {{ item.title }}
        </RouterLink>

        <!-- Section with children -->
        <div v-else class="mb-0.5">
          <!-- Section header: link + collapse toggle -->
          <div
            class="flex items-center rounded-lg transition-all duration-100 mb-px"
            :class="isSectionActive(item.path) ? 'text-zinc-200' : 'text-zinc-600'"
          >
            <RouterLink
              :to="item.path"
              class="flex items-center gap-2 flex-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors"
              :class="isSectionActive(item.path) ? 'hover:text-zinc-100' : 'hover:text-zinc-400'"
            >
              <component
                :is="getSectionIcon(item)"
                class="h-3.5 w-3.5 flex-shrink-0"
                :stroke-width="1.75"
              />
              {{ item.title }}
            </RouterLink>
            <button
              class="p-1.5 rounded-md hover:bg-white/[0.05] transition-colors flex-shrink-0 mr-1"
              :class="isSectionActive(item.path) ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-700 hover:text-zinc-500'"
              @click.stop="toggle(item.slug)"
              :title="isCollapsed(item.slug) ? 'Aufklappen' : 'Zuklappen'"
            >
              <ChevronRight
                class="h-3 w-3 transition-transform duration-200"
                :class="isCollapsed(item.slug) ? '' : 'rotate-90'"
                :stroke-width="2.5"
              />
            </button>
          </div>

          <!-- Children (collapsible) -->
          <Transition name="section-slide">
            <div
              v-show="!isCollapsed(item.slug)"
              class="ml-[1.25rem] pl-3 border-l border-white/[0.06] space-y-px pb-1"
            >
              <RouterLink
                v-for="child in item.children"
                :key="child.path"
                :to="child.path"
                class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-all duration-100"
                :class="isActive(child.path)
                  ? 'bg-white/[0.07] text-zinc-100 font-medium'
                  : 'text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.04]'"
              >
                <component
                  :is="getPageIcon(child.path)"
                  class="h-3 w-3 flex-shrink-0"
                  :class="isActive(child.path) ? 'opacity-100' : 'opacity-50'"
                  :stroke-width="1.75"
                />
                <span class="truncate">{{ child.title }}</span>
              </RouterLink>
            </div>
          </Transition>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.section-slide-enter-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.section-slide-leave-active {
  transition: opacity 0.14s ease, transform 0.14s ease;
}
.section-slide-enter-from,
.section-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
