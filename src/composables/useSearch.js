import { ref, computed } from 'vue'
import Fuse from 'fuse.js'

const searchData = []

const humanize = (value) => value
  .split('-')
  .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
  .join(' ')

// Dynamischer Import aller Markdown-Dateien für den Suchindex
const modules = import.meta.glob('/src/pages/**/*.md', { query: '?raw', eager: true })

Object.entries(modules).forEach(([path, module]) => {
  const routePath = path.replace('/src/pages', '').replace(/\.md$/, '')
  const actualRoute = routePath.endsWith('/index') 
    ? routePath.replace(/\/index$/, '') || '/'
    : routePath || '/'
  
  // Extrahiere reinen Text und Titel (falls im Frontmatter)
  const rawText = module.default || ''
  
  // Simplifizierte Frontmatter-Extraktion
  const segment = routePath.split('/').filter(Boolean).pop() || 'startseite'
  let title = humanize(segment === 'index' ? 'startseite' : segment)
  const titleMatch = rawText.match(/title:\s*['"]?(.+?)['"]?\n/)
  if (titleMatch && titleMatch[1]?.trim()) {
    title = titleMatch[1].trim()
  }

  // Entferne Frontmatter für reinen Suchtext
  const content = rawText.replace(/---[\s\S]*?---/, '')

  searchData.push({
    title,
    path: actualRoute,
    content
  })
})

const fuse = new Fuse(searchData, {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'content', weight: 1 }
  ],
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeMatches: true,
  includeScore: true
})

export function useSearch() {
  const searchQuery = ref('')
  
  const searchResults = computed(() => {
    const query = searchQuery.value.trim()
    if (query.length < 2) return []
    
    return fuse.search(query).slice(0, 8).map(result => {
      const item = result.item
      const matches = result.matches || []
      
      // Extract a snippet from the content where the match occurred
      let snippet = ''
      if (matches.length > 0) {
        const contentMatch = matches.find(m => m.key === 'content')
        if (contentMatch && contentMatch.indices && contentMatch.indices.length > 0) {
          const [start, end] = contentMatch.indices[0]
          const contextStart = Math.max(0, start - 30)
          const contextEnd = Math.min(item.content.length, end + 30)
          snippet = (contextStart > 0 ? '...' : '') + 
                    item.content.slice(contextStart, contextEnd).trim() + 
                    (contextEnd < item.content.length ? '...' : '')
        }
      }
      
      // Fallback: first 100 chars if no match found
      if (!snippet) {
        snippet = item.content.slice(0, 100) + (item.content.length > 100 ? '...' : '')
      }
      
      // Strip markdown syntax from snippet
      snippet = snippet
        .replace(/#{1,6}\s/g, '') // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/`(.*?)`/g, '$1') // Remove inline code
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .replace(/^[-*+]\s/gm, '') // Remove list markers
        .replace(/^\d+\.\s/gm, '') // Remove numbered list markers
        .replace(/^>\s/gm, '') // Remove blockquotes
        .replace(/---/g, '') // Remove horizontal rules
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim()
      
      return {
        ...item,
        snippet
      }
    })
  })

  return {
    searchQuery,
    searchResults
  }
}