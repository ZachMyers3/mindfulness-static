// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(200),
    heroImage: z.string().optional(),          // path under /src/assets or /public
    heroAlt:   z.preprocess((value) => (value == null ? '' : value), z.string()).optional(),
    lastUpdated: z.coerce.date().optional(),
    noindex:    z.boolean().default(false),
  }),
});

export const collections = { pages };