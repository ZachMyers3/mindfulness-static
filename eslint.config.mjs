import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Global ignores
  { ignores: ['dist/', '.astro/', 'node_modules/', 'tests/axe.spec.ts'] },

  // Base JS rules
  js.configs.recommended,

  // Node.js globals for config files
  {
    files: ['*.config.{js,mjs,ts}', 'vitest.config.ts'],
    languageOptions: {
      globals: {
        process: 'readonly',
        import: 'readonly',
      },
    },
  },

  // Node.js globals for build-time scripts
  {
    files: ['scripts/**/*.{js,mjs}'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        fetch: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
      sourceType: 'module',
    },
  },

  // TypeScript-ESLint recommended (no type-checked — fast, no tsconfig needed)
  ...tseslint.configs.recommended,

  // Astro plugin — applies to .astro files
  ...astro.configs['flat/recommended'],

  // Project-specific overrides
  {
    rules: {
      // Allow unused vars prefixed with _ (common in Astro props destructuring)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Astro components often use single-word element names
      'astro/no-set-html-directive': 'off',
    },
  },
);
