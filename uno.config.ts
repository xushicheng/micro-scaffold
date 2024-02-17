import type { UserConfig } from 'unocss'

import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { resolve } from 'node:path'
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTagify,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerAttributifyJsx,
    transformerCompileClass,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

import { colors } from './src/helpers/colors'

export default defineConfig({
    content: {
        filesystem: [
            './src/**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}',
        ],
    },
    presets: [
        presetAttributify(),
        presetIcons({
            // unocss 自定义本地图标, 和 unplugin-icons 冗余
            collections: {
                custom: FileSystemIconLoader(resolve(__dirname, 'src/assets/icons')),

                // 请求线上地址
                online: async (iconName) => {
                    // your custom loader here. Do whatever you want.
                    // for example, fetch from a remote server:
                    return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text())
                },
            },
            extraProperties: {
                'display': 'inline-block',
                'vertical-align': 'sub',
            },
        }),
        presetTypography(),
        presetWebFonts(),
        presetUno(),
        presetTagify(),
        presetRemToPx({
            baseFontSize: 4,
        }),
    ],
    theme: {
        colors,
    },
    transformers: [
        transformerAttributifyJsx(),
        transformerCompileClass(),
        transformerDirectives(),
        transformerVariantGroup(),
    ],
}) as UserConfig<any>
