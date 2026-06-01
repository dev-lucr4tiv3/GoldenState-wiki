<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  const crumbs = [{ name: 'Home', path: '/' }]
  
  let currentPath = ''
  paths.forEach((path, index) => {
    currentPath += '/' + path
    // Try to get title from frontmatter, otherwise use path-based name
    const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')
    crumbs.push({
      name,
      path: currentPath
    })
  })
  
  // Override the last crumb with the actual page title from frontmatter if available
  if (route.meta?.frontmatter?.title) {
    crumbs[crumbs.length - 1].name = route.meta.frontmatter.title
  }
  
  return crumbs
})
</script>

<template>
  <nav class="flex text-sm text-zinc-400 mb-8" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.path" class="inline-flex items-center">
        <template v-if="index > 0">
          <svg class="w-3 h-3 text-zinc-500 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
        </template>
        <RouterLink 
          :to="crumb.path" 
          class="inline-flex items-center px-1 hover:text-gold-200 transition-colors"
          :class="index === breadcrumbs.length - 1 ? 'text-gold-100 font-medium' : ''"
        >
          {{ crumb.name }}
        </RouterLink>
      </li>
    </ol>
  </nav>
</template>