import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Markdown from 'unplugin-vue-markdown/vite'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-table-of-contents'
import container from 'markdown-it-container'
import shiki from 'markdown-it-shiki'

export default defineConfig({
  base: '/',
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue', 'md'],
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default'
    }),
    Markdown({
      wrapperClasses: 'prose prose-invert prose-gold max-w-none',
      headEnabled: false,
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        md.use(shiki, {
          theme: 'dark-plus'
        })
        md.use(anchor, {
          permalink: anchor.permalink.headerLink()
        })
        md.use(toc, {
          includeLevel: [2, 3],
          containerHeaderHtml: '<div class="toc-container">',
          containerFooterHtml: '</div>'
        })
        
        const callouts = ['info', 'warning', 'success', 'error'];
        callouts.forEach(type => {
          md.use(container, type, {
            render: function (tokens, idx) {
              if (tokens[idx].nesting === 1) {
                const title = tokens[idx].info.trim().slice(type.length).trim() || type.charAt(0).toUpperCase() + type.slice(1);
                return '<div class="callout callout-' + type + '"><div class="callout-title">' + title + '</div><div class="callout-content">';
              } else {
                return '</div></div>\n';
              }
            }
          });
        });
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})