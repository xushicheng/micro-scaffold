import { PageConstant } from '@/constant/page-constant'

import layout from './layout'
import { demo } from './modules'

// 根路由
export const RootRoute = {
    meta: {
        title: 'Root',
    },
    name: 'Root',
    path: '/',
    redirect: PageConstant.BASE_HOME,
}

// Basic routing without permission
// 无需认证的基本路由
export const basicRoutes = [
    RootRoute,
    layout,
    demo,
]
