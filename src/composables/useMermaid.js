import { nextTick, onMounted, watch } from 'vue'

let mermaidApiPromise

const getMermaid = async () => {
  if (!mermaidApiPromise) {
    mermaidApiPromise = import('mermaid').then((module) => {
      const api = module.default
      api.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
      })
      return api
    })
  }

  return mermaidApiPromise
}

export function useMermaid(routeRef) {
  const renderMermaidBlocks = async () => {
    await nextTick()

    const blocks = document.querySelectorAll('pre code.language-mermaid')
    if (!blocks.length) {
      return
    }

    const mermaid = await getMermaid()

    blocks.forEach(async (block, index) => {
      const pre = block.parentElement
      if (!pre || pre.dataset.mermaidProcessed === 'true') {
        return
      }

      const source = block.textContent || ''
      const container = document.createElement('div')
      container.className = 'mermaid-block glass rounded-xl p-4 my-6 overflow-x-auto'

      try {
        const id = `mermaid-${Date.now()}-${index}`
        const { svg } = await mermaid.render(id, source)
        container.innerHTML = svg
        pre.replaceWith(container)
      } catch {
        // Keep the source block readable when mermaid parsing fails.
        pre.dataset.mermaidProcessed = 'true'
      }
    })
  }

  onMounted(renderMermaidBlocks)

  watch(
    () => routeRef.path,
    () => {
      renderMermaidBlocks()
    },
  )
}
