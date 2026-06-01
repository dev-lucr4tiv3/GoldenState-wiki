<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const sectionLabels = {
  'getting-started': 'Erste Schritte',
  'howto':           'Anleitungen',
  'rules':           'Regelwerk',
  'factions':        'Fraktionen',
  'jobs':            'Jobs',
  'support':         'Support',
}

const pageLabels = {
  'how-to-join':    'Verbindung zum Server',
  'first-steps':    'Erste Schritte in Los Santos',
  'preparation':    'Vorbereitung',
  'roleplay-guide': 'Roleplay-Guide',
  'keybinds':       'Tastenbelegung',
  'inventory':      'Inventar',
  'clothing':       'Kleidung & Aussehen',
  'voice-chat':     'Voice Chat',
  'general':        'Allgemeine Regeln',
  'roleplay':       'Roleplay-Regeln',
  'lspd':           'LSPD',
  'ems':            'EMS',
  'taxi':           'Taxifahrer',
  'trucker':        'Trucker',
  'tickets':        'Tickets',
  'phone':          'Handy bekommen',
  'license':        'Führerschein machen',
  'vehicle':        'Fahrzeug kaufen',
  'money':          'Geld verdienen',
  'housing':        'Wohnung mieten',
}

const route = useRoute()

const breadcrumbs = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  const crumbs = [{ name: 'Start', path: '/' }]

  let current = ''
  parts.forEach(seg => {
    current += '/' + seg
    const name = sectionLabels[seg] ?? pageLabels[seg]
      ?? (seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '))
    crumbs.push({ name, path: current })
  })

  if (route.meta?.frontmatter?.title) {
    crumbs[crumbs.length - 1].name = route.meta.frontmatter.title
  }

  return crumbs
})
</script>

<template>
  <nav class="flex text-sm text-zinc-500 mb-8" aria-label="Breadcrumb">
    <ol class="inline-flex items-center flex-wrap gap-1">
      <li v-for="(crumb, i) in breadcrumbs" :key="crumb.path" class="inline-flex items-center">
        <svg v-if="i > 0" class="w-3 h-3 text-zinc-700 mx-0.5" viewBox="0 0 6 10" fill="none">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1 9 4-4-4-4"/>
        </svg>
        <RouterLink
          :to="crumb.path"
          class="px-1 hover:text-zinc-300 transition-colors"
          :class="i === breadcrumbs.length - 1 ? 'text-zinc-300 font-medium' : 'text-zinc-600'"
        >
          {{ crumb.name }}
        </RouterLink>
      </li>
    </ol>
  </nav>
</template>
