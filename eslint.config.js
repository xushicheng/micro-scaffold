// eslint.config.js
import antfu from '@antfu/eslint-config'
import * as pluginCheckFile from 'eslint-plugin-check-file'
import pluginPerfectionist from 'eslint-plugin-perfectionist'

export default antfu(
    {
        formatters: {
            /**
             * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
             * By default uses Prettier
             */
            css: true,
            /**
             * Format HTML files
             * By default uses Prettier
             */
            html: true,
            /**
             * Format Markdown files
             * Supports Prettier and dprint
             * By default uses Prettier
             */
            markdown: 'prettier',
        },

        ignores: [
            '**/fixtures',
        // ...globs
        ],
        // Disable jsonc and yaml support
        jsonc: false,

        // Or customize the stylistic rules
        stylistic: {
            indent: 4, // 4, or 'tab'
            quotes: 'single', // or 'double'
        },
        // TypeScript and Vue are auto-detected, you can also explicitly enable them:
        typescript: true,

        unocss: true,

        vue: true,

        yaml: false,
    },
    {
        files: ['vite.config.ts'],
        rules: {
            'node/prefer-global/process': 'off',
        },
    },
    {
        files: ['src/**/*'],
        name: '文件名和目录名校验',
        plugins: {
            'check-file': pluginCheckFile,
        },
        rules: {
            'check-file/filename-blocklist': 'off',
            'check-file/filename-naming-convention': [
                'error',
                {
                    '**/*.{js,ts}': 'KEBAB_CASE',
                    '**/*.{jsx,tsx}': 'KEBAB_CASE',
                    '**/*.{vue}': 'KEBAB_CASE',
                },
            ],
            'check-file/folder-match-with-fex': 'off',
            'check-file/folder-naming-convention': [
                'error',
                {
                    'src/**/': 'KEBAB_CASE',
                },
            ],
            'check-file/no-index': 'off',
        },
    },
    {
        name: 'antfu:imports',
        rules: {
            // 避免循环依赖
            'import/no-cycle': ['error', { maxDepth: 5 }],
            'import/order': 'off',
        },
    },
    {
        name: 'antfu:javascript',
        rules: {
            'no-console': 'off',
        },
    },
    {
        name: 'antfu:typescript:rules',
        rules:
        {
            // 禁止 enum
            'no-restricted-syntax': [
                'error',
                {
                    message: 'My reason for not using any enums at all',
                    selector: 'TSEnumDeclaration',
                },
            ],
        },
    },
    {
        name: 'antfu:vue:setup',
        rules: {
            'vue/max-attributes-per-line': 'warn',
        },
    },
    {
        // 强迫症专用
        name: 'antfu:perfectionist',
        rules: {
            ...pluginPerfectionist.configs['recommended-natural'].rules,
            'perfectionist/sort-vue-attributes': 'off',
        },
    },
    {
        ignores: ['**/*.d.ts'],
        name: 'antfu:typescript:rules',
        rules: {
            // 优先使用 type
            'ts/consistent-type-definitions': ['error', 'type'],
        },
    },
)
