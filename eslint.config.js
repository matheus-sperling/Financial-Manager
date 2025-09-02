// @ts-check

import eslint from '@eslint/js';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      ecmaVersion: 12,
      sourceType: 'module'
    },
    rules: {
      'indent': ['error', 4],
      'linebreak-style': 'off', // Disable linebreak style checking
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  },
  {
    ignores: ['node_modules/', 'dist/']
  }
];