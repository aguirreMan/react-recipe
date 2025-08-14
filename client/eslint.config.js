import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      semi: ['error', 'never'],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'no-unused-expressions': 'error',
      'react/react-in-jsx-scope': 'off',
    },
    languageOptions: { globals: globals.browser },
  },
])