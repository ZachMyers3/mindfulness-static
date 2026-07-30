import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      // astro/zod is just zod re-exported; alias for test context
      'astro/zod': fileURLToPath(new URL('./node_modules/zod/index.js', import.meta.url)),
    },
  },
});
