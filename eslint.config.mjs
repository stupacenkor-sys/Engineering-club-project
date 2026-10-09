import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import checkFile from 'eslint-plugin-check-file';

export default [
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**', 'documentation/**'],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  playwright.configs['flat/recommended'],

  {
    files: ['tests/**/*.spec.ts', 'src/**/*.ts'],

    plugins: {
      'check-file': checkFile,
    },

    rules: {
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.ts': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true},
      ],

      'playwright/expect-expect': [
        'error',
        { assertFunctionPatterns: ['^expect.*', '^verify.*', '^check.*'] },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'class',
          format: ['PascalCase'],
          custom: { regex: '(Page|Api|Component)$', match: true },
        },
        {
          selector: 'class',
          format: ['PascalCase'],
          filter: {regex: '^Sidebar$', match: true },
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'classMethod',
          format: ['camelCase'],
        },
      ],
    },
  },
];
