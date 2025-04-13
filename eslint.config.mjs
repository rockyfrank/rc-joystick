import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { base } from 'eslint-config-ali';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { ignores: ['node_modules', 'dist', 'es', 'lib', '.cache', '*.log'] },
  ...base,
  ...storybook.configs['flat/recommended'],
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  reactHooks.configs['recommended-latest'],
  {
    rules: {
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
]);
