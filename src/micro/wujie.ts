import type { App } from 'vue'

import { router } from '@/router'
import WujieVue from 'wujie-vue3'

import { credentialsFetch } from './credentials-fetch'
import { hostMap } from './host-map'
import { lifecycle } from './lifecycle'

const { bus, preloadApp, setupApp } = WujieVue

const subAppDict = {
    angular: hostMap('//localhost:8000/'),
    react: hostMap('//localhost:8000/'),
    vite: hostMap('//localhost:8000/'),
    vue2: hostMap('//localhost:8000/'),
    vue3: hostMap('//localhost:8000/'),
}

export function setupWujie(app: App<Element>) {
    // eslint-disable-next-line no-alert
    bus.$on('click', (msg: string) => window.alert(msg))

    // 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
    bus.$on('sub-route-change', (name: string, path: string) => {
        const mainName = `${name}-sub`
        const mainPath = `/${name}-sub${path}`
        const currentName = router.currentRoute.value.name
        const currentPath = router.currentRoute.value.path
        if (mainName === currentName && mainPath !== currentPath)
            router.push({ path: mainPath })
    })

    // 降级
    const degrade = window.localStorage.getItem('degrade') === 'true' || !window.Proxy || !window.CustomElementRegistry
    const props = {
        jump: (name: string) => {
            router.push({ name })
        },
    }

    /**
     * 大部分业务无需设置 attrs
     * 此处修正 iframe 的 src，是防止github pages csp报错
     * 因为默认是只有 host+port，没有携带路径
     */
    // const attrs = import.meta.env.PROD ? { src: hostMap('//localhost:8000/') } : {}

    /**
     * 配置应用，主要是设置默认配置
     * preloadApp、startApp的配置会基于这个配置做覆盖
     */
    setupApp({
        alive: true, // 保活模式, 类似 keep-alive
        // attrs,
        degrade,
        exec: true, // 预执行, 提高子应用打开速度
        fetch: credentialsFetch,
        name: 'react', // 子应用唯一
        props,
        url: subAppDict.react,
        ...lifecycle,
    })

    setupApp({
        alive: true, // 保活模式, 类似 keep-alive
        // attrs,
        degrade,
        exec: true, // 预执行, 提高子应用打开速度
        fetch: credentialsFetch,
        name: 'vite', // 子应用唯一
        props,
        url: subAppDict.vite,
        ...lifecycle,
    })

    setupApp({
        alive: true, // 保活模式, 类似 keep-alive
        // attrs,
        degrade,
        exec: true, // 预执行, 提高子应用打开速度
        fetch: credentialsFetch,
        name: 'react', // 子应用唯一
        props,
        url: subAppDict.react,
        ...lifecycle,
    })

    if (window.localStorage.getItem('preload') !== 'false') {
        // angular react vue2 的应用挂载在这里
        preloadApp({
            name: 'react',
            url: subAppDict.react,
        })

        if (window.Proxy) {
            // vue3 和 vite 的子应用挂载到这里
            preloadApp({
                name: 'vite',
                url: subAppDict.vite,
            })
        }
    }

    app.use(WujieVue)
}
