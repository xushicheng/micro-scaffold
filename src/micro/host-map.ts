const map: Record<string, string> = {
    '//localhost:8000/': 'http://192.168.20.238:8080/',
}

export function hostMap(host: string) {
    if (import.meta.env.PROD)
        return map[host]
    return host
}
