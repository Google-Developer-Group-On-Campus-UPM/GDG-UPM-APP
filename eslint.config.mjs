// eslint.config.mjs

import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: ['node_modules'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true, // You can list specific global variables like "window", "document"
        es2021: true, // Use the appropriate ECMAScript version globals
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypescript,
    },
    rules: {
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
