/**
 * Configure and register global directives
 */
import type { App } from 'vue'

import { setupEllipsisDirective } from './ellipsis'

export function setupGlobDirectives(app: App) {
    setupEllipsisDirective(app)
}
