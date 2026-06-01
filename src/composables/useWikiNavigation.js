import { computed } from 'vue';

export function useWikiNavigation() {
  const modules = import.meta.glob('/src/pages/**/*.md', { eager: true });

  const humanize = (value) => value
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
  
  const normalizeTitle = (title, fallback) => {
    const trimmed = typeof title === 'string' ? title.trim() : '';
    if (!trimmed || trimmed.toLowerCase() === 'index') {
      return fallback;
    }
    return trimmed;
  };

  const navTree = computed(() => {
    const tree = [];
    const categories = new Map();
    
    const flatPaths = Object.keys(modules).map(path => {
      const routePath = path.replace('/src/pages', '').replace(/\.md$/, '');
      const segments = routePath.split('/').filter(Boolean);
      
      let title = routePath;
      if (modules[path].frontmatter && modules[path].frontmatter.title) {
        title = modules[path].frontmatter.title;
      } else {
        title = segments[segments.length - 1] || 'Home';
      }

      // Handle index.md
      const actualRoute = routePath.endsWith('/index') 
        ? routePath.replace(/\/index$/, '') || '/'
        : routePath || '/';

      const fallbackTitle = segments.length === 0
        ? 'Startseite'
        : humanize(segments[segments.length - 1]);

      return {
        path: actualRoute,
        title: normalizeTitle(title, fallbackTitle),
        segments,
        isIndex: segments[segments.length - 1] === 'index' || segments.length === 0,
      };
    });

    flatPaths.sort((a, b) => a.path.localeCompare(b.path));

    flatPaths.forEach(item => {
      if (item.segments.length <= 1) {
        if (item.isIndex) {
          tree.push({ title: item.title, path: item.path, isRoot: true });
        } else {
          tree.push({ title: item.title, path: item.path });
        }
        return;
      }

      const slug = item.segments[0];
      if (!categories.has(slug)) {
        categories.set(slug, {
          slug,
          title: humanize(slug),
          path: `/${slug}`,
          children: [],
        });
      }

      const category = categories.get(slug);
      const isCategoryIndex = item.segments.length === 2 && item.segments[1] === 'index';

      if (isCategoryIndex) {
        category.path = item.path;
        category.title = normalizeTitle(item.title, category.title);
      } else {
        category.children.push({ title: item.title, path: item.path });
      }
    });

    Array.from(categories.values())
      .sort((a, b) => a.title.localeCompare(b.title))
      .forEach((category) => {
        category.children.sort((a, b) => a.title.localeCompare(b.title));
        tree.push(category);
      });

    return tree;
  });

  return { navTree };
}