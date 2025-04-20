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
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
    },
  },
  reactHooks.configs['recommended-latest'],
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-await-in-loop': 'off',
    },
  },
]);
