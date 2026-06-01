import { computed } from 'vue';
import fm from 'front-matter';

export function useWikiNavigation() {
  const rawModules = import.meta.glob('/src/pages/**/*.md', { query: '?raw', eager: true });

  const humanize = (value) => value
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  const getFrontmatter = (path) => {
    const raw = rawModules[path]?.default ?? '';
    try { return fm(raw).attributes ?? {}; }
    catch { return {}; }
  };

  const navTree = computed(() => {
    const tree = [];
    const categories = new Map();

    const flatPaths = Object.keys(rawModules).map(path => {
      const routePath = path.replace('/src/pages', '').replace(/\.md$/, '');
      const segments = routePath.split('/').filter(Boolean);
      const attrs = getFrontmatter(path);

      if (attrs.navHide) return null;

      const actualRoute = routePath.endsWith('/index')
        ? routePath.replace(/\/index$/, '') || '/'
        : routePath || '/';

      const lastSeg = segments[segments.length - 1] ?? '';
      const isIndex = lastSeg === 'index' || segments.length === 0;

      const rawTitle = attrs.title ?? '';
      const fallback = segments.length === 0
        ? 'Startseite'
        : humanize(isIndex && segments.length > 1 ? segments[segments.length - 2] : lastSeg);

      const title = (rawTitle && rawTitle.toLowerCase() !== 'index')
        ? rawTitle
        : fallback;

      return { path: actualRoute, title, segments, isIndex };
    }).filter(Boolean);

    flatPaths.sort((a, b) => a.path.localeCompare(b.path));

    flatPaths.forEach(item => {
      if (item.segments.length <= 1) {
        if (item.isIndex) tree.push({ title: item.title, path: item.path, isRoot: true });
        else tree.push({ title: item.title, path: item.path });
        return;
      }

      const slug = item.segments[0];
      if (!categories.has(slug)) {
        categories.set(slug, { slug, title: humanize(slug), path: `/${slug}`, children: [] });
      }

      const category = categories.get(slug);
      const isCategoryIndex = item.segments.length === 2 && item.segments[1] === 'index';

      if (isCategoryIndex) {
        category.path = item.path;
        category.title = item.title;
      } else {
        category.children.push({ title: item.title, path: item.path });
      }
    });

    const order = ['getting-started', 'howto', 'rules', 'factions', 'jobs', 'support'];

    const sorted = Array.from(categories.values()).sort((a, b) => {
      const ai = order.indexOf(a.slug);
      const bi = order.indexOf(b.slug);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.title.localeCompare(b.title);
    });

    sorted.forEach(category => {
      category.children.sort((a, b) => a.title.localeCompare(b.title));
      tree.push(category);
    });

    return tree;
  });

  return { navTree };
}
