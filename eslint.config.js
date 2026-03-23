import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['dist/**'],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],

    languageOptions: {
      parser: tseslint.parser, // ✅ هذا أهم سطر
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
    },
  },
]);
