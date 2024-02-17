// 携带登录态credentials必须为include
export function credentialsFetch(url: RequestInfo, options?: RequestInit) {
    return window.fetch(url, { ...options, credentials: 'omit' })
}
