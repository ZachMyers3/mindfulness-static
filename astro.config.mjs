// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import writenex from '@writenex/astro';
import { unified } from '@astrojs/markdown-remark';
import { rehypeBaseLinks } from './src/lib/rehype-base-links.ts';

// Public site URL + optional base path. Override at deploy time via env:
//   SITE       — canonical origin (sitemap + SEO). Defaults to the placeholder.
//   BASE_PATH  — path prefix for project hosts (e.g. GitHub Pages /repo-name).
//                Defaults to "/" (custom domains, Netlify, Vercel, local).
const SITE = process.env.SITE ?? 'https://mindfulnessandmovement.example.com';
const BASE_PATH = process.env.BASE_PATH ?? '/';

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
    // MDX inherits this processor (and its rehype plugins).
    processor: unified({
      rehypePlugins: [[rehypeBaseLinks, BASE_PATH]],
    }),
  },
  // Writenex is a dev-only visual editor for Markdown collections
  // (http://localhost:4321/_writenex). Disabled in production builds.
  integrations: [mdx(), sitemap(), writenex()],
});
