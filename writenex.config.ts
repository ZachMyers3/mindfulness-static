import { defineConfig } from '@writenex/astro';

/**
 * Visual editor for Markdown content collections.
 * Open http://localhost:4321/_writenex while `npm run dev` is running.
 *
 * site.json is still edited by hand (or in your IDE) — Writenex covers
 * the pages + journal Markdown collections only.
 */
export default defineConfig({
  collections: [
    {
      name: 'pages',
      path: 'src/content/pages',
      filePattern: '{slug}.md',
      // Most pages map 1:1 to /{slug}/. The home entry (`home.md`) is
      // rendered at `/` by src/pages/index.astro — open that URL manually.
      previewUrl: '/{slug}/',
      schema: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        heroImage: { type: 'image' },
        heroAlt: { type: 'string' },
        lastUpdated: { type: 'date' },
        noindex: { type: 'boolean', default: false },
        draft: { type: 'boolean', default: false },
      },
    },
    {
      name: 'journal',
      path: 'src/content/journal',
      filePattern: '{slug}.md',
      previewUrl: '/journal/{slug}/',
      schema: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        pubDate: { type: 'date', required: true },
        heroImage: { type: 'image' },
        heroAlt: { type: 'string' },
        tags: { type: 'array', items: 'string' },
        draft: { type: 'boolean', default: false },
      },
    },
  ],

  images: {
    strategy: 'public',
    publicPath: '/assets',
    storagePath: 'public/assets',
  },

  editor: {
    autosave: true,
    autosaveInterval: 3000,
  },

  versionHistory: {
    enabled: true,
    maxVersions: 20,
    storagePath: '.writenex/versions',
  },
});
