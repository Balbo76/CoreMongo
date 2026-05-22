import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
    // 1. GLOBAL IGNORES
    {
      ignores: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/public/**',
        'frontend/.react-router/**',
        'shared/src/**/*.js',
      ],
    },

    // 2. BASE TYPESCRIPT RULES (All files)
    eslint.configs.recommended,
    ...tseslint.configs.recommended,

    // 3. BACKEND SCOPE (Node.js)
    {
      files: ['backend/src/**/*.ts'],
      languageOptions: {
        globals: {
          ...globals.node,
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': ['warn', {
          'argsIgnorePattern': '^_|^req|^res|^next'
        }],
        'no-console': 'off', // backend needs logs
      },
    },

    // 4. FRONTEND SCOPE (React/Browser)
    {
      files: ['frontend/app/**/*.{ts,tsx}'],
      languageOptions: {
        globals: {
          ...globals.browser,
        },
      },
      rules: {
        'no-console': 'warn', // frontend should avoid logs in prod
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    }
);
