import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import fm from 'front-matter'

const routes = setupLayouts(generatedRoutes)

// Build a path → title map from frontmatter at startup
const rawMods = import.meta.glob('/src/pages/**/*.md', { query: '?raw', eager: true })
const titleMap = new Map()
for (const [path, mod] of Object.entries(rawMods)) {
  try {
    const routePath = path
      .replace('/src/pages', '')
      .replace(/\.md$/, '')
      .replace(/\/index$/, '') || '/'
    const attrs = fm(mod.default ?? '').attributes
    if (attrs?.title) titleMap.set(routePath, attrs.title)
  } catch {}
}

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = titleMap.get(to.path) ?? 'GoldenState Wiki'
})

export default router
