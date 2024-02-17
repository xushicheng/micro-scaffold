import type { App, CSSProperties, DirectiveBinding, ObjectDirective } from 'vue'

type IValue = {
    line?: number
    width?: number
}

type IOptions = {
    [key: string]: CSSProperties
}

const cssProperties: IOptions = {
    multiple: {
        display: '-webkit-box',
        overflow: 'hidden',
        wordBreak: 'break-all',
    },
    single: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
}

const Ellipsis: ObjectDirective = {
    mounted(el: HTMLElement, binding: DirectiveBinding<Array<IValue>>) {
        const { arg = 'single', value = [100, 1] } = binding
        const [width, line] = value
        Object.entries(cssProperties[arg]).forEach(([key, value]) => {
            // @ts-expect-error key:string
            el.style[key] = value
        })
        el.style.width = `${width}px`
        if (arg === 'multiple') {
            el.style.webkitLineClamp = `${line}`
            el.style.webkitBoxOrient = 'vertical'
        }
    },
}
export function setupEllipsisDirective(app: App) {
    app.directive('ellipsis', Ellipsis)
}

// export default Ellipsis
