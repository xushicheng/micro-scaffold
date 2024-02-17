export {}

declare global {
    interface Window {
        // 在 window 上挂属性
        [key: string]: any

    }
}

