import { setupGlobDirectives } from '@/directives'
import { setupVueQuery } from '@/helpers'
import zhCNJson from '@/i18n/zh-CN.json'
import { router, setupRouter } from '@/router'
import { setupStore } from '@/store'
import '@unocss/reset/tailwind.css'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'uno.css'
import { createApp } from 'vue'
import { createRouterScroller } from 'vue-router-better-scroller'

import App from './app.vue'
import './styles/main.scss'

// import { setupWujie } from './micro/wujie'

function bootstrap() {
    const app = createApp(App)

    // 配置无界
    // setupWujie(app)

    // 配置 store
    setupStore(app)

    // 配置路由
    setupRouter(app)
    app.use(router)
    app.use(createRouterScroller({
        selectors: {
            '.scrollable': true,
            'body': true,
            'window': true,
        },
    }))

    // 注册全局指令
    setupGlobDirectives(app)

    // 配置 vue-query
    setupVueQuery(app)

    // 配置 ui
    app.use(PrimeVue, {
        locale: zhCNJson['zh-CN'],
    })

    app.mount('#app')
}

bootstrap()
