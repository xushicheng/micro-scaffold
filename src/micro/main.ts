import { bindVueRuntime, preFetchLib } from 'hel-micro'
import * as Vue from 'vue'

bindVueRuntime({ Vue })

async function main() {
    await preFetchLib('hel-tpl-remote-vue3-comps-ts')

    // await import('./load-app')
}

main().catch(console.error)
