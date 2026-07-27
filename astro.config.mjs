// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Public site URL. Override at deploy time via the SITE env var; the
// sitemap integration reads this same value.
const SITE = process.env.SITE ?? 'https://mindfulnessandmovement.example.com';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  compressHTML: true,
  integrations: [mdx(), sitemap()],
});
