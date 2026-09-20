// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import writenex from '@writenex/astro';
import { unified } from '@astrojs/markdown-remark';
import { rehypeBaseLinks } from './src/lib/rehype-base-links.ts';
import { rehypeMediaRows } from './src/lib/rehype-media-rows.ts';

// Public site URL + optional base path. Override at deploy time via env:
//   SITE       — canonical origin (sitemap + SEO). Defaults to the placeholder.
//   BASE_PATH  — path prefix for project hosts (e.g. GitHub Pages /repo-name).
//                Defaults to "/" (custom domains, Netlify, Vercel, local).
const SITE = process.env.SITE ?? 'https://mindfulnessandmovement.example.com';
const BASE_PATH = process.env.BASE_PATH ?? '/';

/** Dev-only crop UI at /tools/hero-crop/. Never injected during `astro build`. */
function heroCropTool() {
  return {
    name: 'hero-crop-tool',
    hooks: {
      'astro:config:setup': ({ command, injectRoute }) => {
        if (command !== 'dev') return;
        injectRoute({
          pattern: '/tools/hero-crop',
          entrypoint: './src/tools/hero-crop.astro',
          prerender: true,
        });
        injectRoute({
          pattern: '/tools/api/hero-targets',
          entrypoint: './src/tools/api-hero-targets.ts',
          prerender: false,
        });
        injectRoute({
          pattern: '/tools/api/hero-apply',
          entrypoint: './src/tools/api-hero-apply.ts',
          prerender: false,
        });
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE_PATH,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  compressHTML: true,
  markdown: {
    // remark/rehype pipeline so we can rewrite absolute links for `base`.
    processor: unified({
      rehypePlugins: [[rehypeBaseLinks, BASE_PATH], rehypeMediaRows],
    }),
  },
  // Writenex is a dev-only visual editor for Markdown collections
  // (http://localhost:4321/_writenex). Disabled in production builds.
  // heroCropTool is likewise dev-only (http://localhost:4321/tools/hero-crop/).
  integrations: [mdx(), sitemap(), writenex(), heroCropTool()],
});
