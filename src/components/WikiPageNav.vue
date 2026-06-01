<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

// Ordered sequences per section. Edit to add, remove or reorder pages.
const sequences = {
  'getting-started': [
    { path: '/getting-started',                    title: 'Willkommen' },
    { path: '/getting-started/preparation',        title: 'Vorbereitung' },
    { path: '/getting-started/how-to-join',        title: 'Beitreten' },
    { path: '/getting-started/first-steps',        title: 'Erste Schritte' },
    { path: '/getting-started/roleplay-guide',     title: 'Roleplay-Guide' },
    { path: '/getting-started/keybinds',           title: 'Tastenbelegung' },
    { path: '/getting-started/inventory',          title: 'Inventar' },
    { path: '/getting-started/clothing',           title: 'Kleidung & Aussehen' },
    { path: '/getting-started/voice-chat',         title: 'Voice Chat' },
  ],
}

const route = useRoute()

const nav = computed(() => {
  for (const seq of Object.values(sequences)) {
    const idx = seq.findIndex(p => p.path === route.path)
    if (idx === -1) continue
    return {
      prev: idx > 0 ? seq[idx - 1] : null,
      next: idx < seq.length - 1 ? seq[idx + 1] : null,
      current: idx + 1,
      total: seq.length,
    }
  }
  return null
})
</script>

<template>
  <nav v-if="nav" class="page-nav">
    <RouterLink v-if="nav.prev" :to="nav.prev.path" class="page-nav-btn page-nav-prev">
      <ChevronLeft class="page-nav-icon" :stroke-width="2" />
      <span class="page-nav-text">
        <span class="page-nav-hint">Zurück</span>
        <span class="page-nav-title">{{ nav.prev.title }}</span>
      </span>
    </RouterLink>
    <div v-else class="page-nav-spacer" />

    <span class="page-nav-counter">{{ nav.current }} / {{ nav.total }}</span>

    <RouterLink v-if="nav.next" :to="nav.next.path" class="page-nav-btn page-nav-next">
      <span class="page-nav-text" style="text-align:right">
        <span class="page-nav-hint">Weiter</span>
        <span class="page-nav-title">{{ nav.next.title }}</span>
      </span>
      <ChevronRight class="page-nav-icon" :stroke-width="2" />
    </RouterLink>
    <div v-else class="page-nav-spacer" />
  </nav>
</template>

<style scoped>
.page-nav {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 3rem; padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.07);
  gap: 12px;
}
.page-nav-spacer { flex: 1; }
.page-nav-counter { font-size: 11px; color: #52525b; white-space: nowrap; flex-shrink: 0; }

.page-nav-btn {
  display: flex; align-items: center; gap: 10px;
  flex: 1; padding: 12px 14px;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  background: rgba(255,255,255,0.02);
  text-decoration: none; color: inherit;
  transition: background 0.15s, border-color 0.15s;
  min-width: 0;
}
.page-nav-btn:hover {
  background: rgba(255,255,255,0.05);
  border-color: rgba(207,159,62,0.25);
}
.page-nav-prev { justify-content: flex-start; }
.page-nav-next { justify-content: flex-end; }

.page-nav-icon { width: 18px; height: 18px; color: #52525b; flex-shrink: 0; }
.page-nav-btn:hover .page-nav-icon { color: #CF9F3E; }

.page-nav-text { display: flex; flex-direction: column; min-width: 0; }
.page-nav-hint  { font-size: 10px; color: #52525b; text-transform: uppercase; letter-spacing: 0.06em; }
.page-nav-title { font-size: 13px; font-weight: 500; color: #a1a1aa; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.page-nav-btn:hover .page-nav-title { color: #e4e4e7; }
</style>
