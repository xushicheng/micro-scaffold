import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import type { App } from 'vue'

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

// vue-query 单例
const client = new QueryClient({})

const vueQueryOptions: VueQueryPluginOptions = {
    queryClient: client,
}

export function setupVueQuery(app: App) {
    app.use(VueQueryPlugin, vueQueryOptions)
}
