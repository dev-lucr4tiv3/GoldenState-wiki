import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)

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
  const frontmatterTitle = to.meta?.frontmatter?.title
  const routeTitle = typeof to.name === 'string' ? to.name : ''
  const resolvedTitle = frontmatterTitle || routeTitle || 'Wiki'
  document.title = `${resolvedTitle} | GoldenState Wiki`
})

export default router
