<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useWikiNavigation } from '@/composables/useWikiNavigation'

const route = useRoute()
const { navTree } = useWikiNavigation()

// Build a flat path → title map from the live nav tree (frontmatter titles)
const titleMap = computed(() => {
  const map = new Map()
  navTree.value.forEach(item => {
    map.set(item.path, item.title)
    item.children?.forEach(child => map.set(child.path, child.title))
  })
  return map
})

const humanize = seg =>
  seg.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')

const breadcrumbs = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  const crumbs = [{ name: 'Start', path: '/' }]

  let current = ''
  parts.forEach(seg => {
    current += '/' + seg
    // 1. Live frontmatter title from nav tree
    // 2. Humanized slug fallback
    const name = titleMap.value.get(current) ?? humanize(seg)
    crumbs.push({ name, path: current })
  })

  return crumbs
})
</script>

<template>
  <nav class="flex mb-8" aria-label="Breadcrumb">
    <ol class="inline-flex items-center flex-wrap gap-px">
      <li v-for="(crumb, i) in breadcrumbs" :key="crumb.path" class="inline-flex items-center">
        <svg v-if="i > 0" class="w-3 h-3 text-zinc-800 mx-1" viewBox="0 0 6 10" fill="none">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9 4-4-4-4"/>
        </svg>
        <RouterLink
          :to="crumb.path"
          class="px-1 text-xs transition-colors"
          :class="i === breadcrumbs.length - 1
            ? 'text-zinc-400 font-medium pointer-events-none'
            : 'text-zinc-600 hover:text-zinc-400'"
        >
          {{ crumb.name }}
        </RouterLink>
      </li>
    </ol>
  </nav>
</template>
