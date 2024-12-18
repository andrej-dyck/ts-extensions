// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/.idea/**', '**/node_modules/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // plugins: { reactHooks, reactRefresh, tailwindcss },
    rules: {
      /* formatting */
      indent: ['warn', 2, { 'SwitchCase': 1 }],
      quotes: ['warn', 'single'],
      semi: ['warn', 'never'],
      'comma-dangle': ['warn', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'only-multiline',
        'exports': 'only-multiline',
        'functions': 'never',
      }],
      'space-before-blocks': ['warn'],
      'space-unary-ops': ['warn'],
      'consistent-return': ['warn'],
      'eol-last': ['warn'],
      'no-else-return': ['warn'],
      'no-empty-function': ['warn'],
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-trailing-spaces': ['warn'],
      'object-curly-spacing': ['warn', 'always'],

      /* typescript */
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
      '@typescript-eslint/no-unused-vars': 'off', // enforced by tsconfig
      '@typescript-eslint/prefer-readonly': ['warn'],
      '@typescript-eslint/switch-exhaustiveness-check': ['warn'],
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  }
)
