import type { ConfigEnv } from 'vite'

import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { URL, fileURLToPath } from 'node:url'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import {
    PrimeVueResolver,
    VueUseComponentsResolver,
    VueUseDirectiveResolver,
} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import Inspect from 'vite-plugin-inspect'
import VueDevTools from 'vite-plugin-vue-devtools'

export default ({ mode }: ConfigEnv) => {
    const { VITE_BASE_URL, VITE_PORT } = loadEnv(mode, process.cwd())

    return defineConfig({
        base: VITE_BASE_URL,
        build: {
            //  chunk 大小警告的限制（以 kbs 为单位）
            chunkSizeWarningLimit: 2000,
            // 启用/禁用 gzip 压缩大小报告
            reportCompressedSize: false,
            // 自定义底层的 Rollup 打包配置
            rollupOptions: {
                output: {
                    // 自定义构建结果中的静态资源名称
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    // 对代码分割中产生的 chunk 自定义命名
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    // 压缩 Rollup 产生的额外代码
                    compact: true,
                    // 指定 chunks 的入口文件模式
                    entryFileNames: 'static/js/[name]-[hash].js',
                    // 创建自定义的公共 chunk
                    manualChunks: {
                        vue: ['vue', 'vue-router', 'pinia'],
                    },
                },
            },
            // 构建后是否生成 source map 文件
            sourcemap: true,
            // 设置最终构建的浏览器兼容目标
            target: 'es2015',
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "~/styles/variables.scss";`,
                    javascriptEnabled: true,
                },
            },
        },
        optimizeDeps: {
            include: [
                'axios',
                'dayjs',
                'pinia',
                'vue',
                'vue-router',
                '@vueuse/core',
            ],
        },
        plugins: [
            AutoImport({
                dts: 'types/auto-imports.d.ts',
                eslintrc: {
                    enabled: true,
                },
                imports: [
                    'vue',
                    'pinia',
                    // unplugin-vue-router
                    VueRouterAutoImports,
                    {
                        'vue-router/auto': ['useLink'],
                    },
                    {
                        '@tanstack/vue-query': [
                            'useQuery',
                            'useQueries',
                            'useInfiniteQuery',
                            'useMutation',
                            'useQueryClient',
                        ],
                        'dayjs': [
                            // default imports
                            ['default', 'dayjs'], // import { default as dayjs } from 'dayjs',
                        ],
                        'vant': ['Toast', 'Dialog'],
                        'vant/lib': ['Notify', 'ImagePreview'],
                    },
                ],
                resolvers: [
                    IconsResolver({
                        prefix: 'i',
                    }),
                ],
            }),
            Components({
                dts: 'types/components.d.ts',
                resolvers: [
                    IconsResolver({
                        // 数组里的内容与 Icons.customCollections 键值相同
                        enabledCollections: ['custom', 'online'],
                    }),
                    PrimeVueResolver(),
                    VueUseComponentsResolver(),
                    VueUseDirectiveResolver(),
                ],
            }),
            Icons({
                // unplugin-icons 自定义本地图标, 和 unocss 冗余
                autoInstall: true, // 自动安装需要的 iconify 图标子包, 这个项目是全量导入的
                compiler: 'vue3',
                customCollections: {
                    // 键值的内容要写到 Components.resolvers.IconsResolver.enabledCollections 数组里
                    custom: FileSystemIconLoader('src/assets/icons'),

                    // 请求线上地址
                    online: async (iconName) => {
                        // your custom loader here. Do whatever you want.
                        // for example, fetch from a remote server:
                        return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text())
                    },
                },
                defaultClass: 'inline',
                defaultStyle: 'vertical-align: sub;',
            }),
            Inspect(),
            TurboConsole(),
            UnoCSS(),
            VueDevTools(),
            VueRouter(),
            // ⚠️ Vue must be placed after VueRouter()
            Vue({
                script: {
                    defineModel: true,
                    propsDestructure: true,
                },
            }),
            VueJsx(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '~': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            // 允许跨域
            cors: true,
            // 监听所有地址
            host: '0.0.0.0',
            // 服务启动时是否自动打开浏览器
            open: true,
            // 端口号
            port: Number(VITE_PORT),
            // 自定义代理规则
            proxy: {},
            // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
            warmup: {
                clientFiles: ['./index.html', './src/{views,components}/*'],
            },
        },
    })
}
