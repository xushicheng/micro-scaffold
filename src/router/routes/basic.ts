import {
    // EXCEPTION_COMPONENT,
    PAGE_NOT_FOUND_NAME,
} from '../constant'

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE = {
    // component: EXCEPTION_COMPONENT,
    meta: {
        title: 'ErrorPage',
    },
    name: PAGE_NOT_FOUND_NAME,
    path: '/:path(.*)*',
}
