import { hel } from './hel'
import { wujie } from './wujie'

export const demo: any = {
    children: [
        ...hel,
        ...wujie,
    ],
    name: 'demo',
    path: '/demo',
}
