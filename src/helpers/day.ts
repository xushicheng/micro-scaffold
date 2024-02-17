/**
 * dayjs: https://dayjs.gitee.io/zh-CN/
 *
 * 中文本地化格式参考
 * https://github.com/iamkun/dayjs/blob/dev/src/locale/zh-cn.js
 */

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import advancedFormat from 'dayjs/plugin/advancedFormat'

/**
 * 导入本地化语言和插件
 * 使用本地化的格式
 * 覆写本地化的格式, !!! 注意是覆盖, 不是拓展 !!!
 * 支持更多模版
 * 导入判断闰年
 * 导入判断今天
 * 导入判断昨天
 * 导入时区
 */

import isLeapYear from 'dayjs/plugin/isLeapYear'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

dayjs.extend(isLeapYear) // 使用插件
dayjs.locale('zh-cn') // 设置本地化语言
dayjs.extend(localizedFormat) // 使用本地化的格式
dayjs.extend(updateLocale) // 覆写本地化的格式
dayjs.extend(advancedFormat) // 支持更多模版

dayjs.extend(isToday) // 是否为今天的 API
dayjs.extend(isYesterday) // 是否为昨天的 API

/**
 * 覆盖本地化里面的格式,
 * !!! 注意是覆盖, 不是拓展 !!!
 * 使用方法: dayjs().format('F T') => '2021-05-08 19:40:02'
 */
dayjs.updateLocale('zh-cn', {
    formats: {
        L: 'YYYY-MM-DD',
        LL: 'YYYY年M月D日',
        LLL: 'YYYY年M月D日Ah点mm分',
        LLLL: 'YYYY年M月D日ddddAh点mm分',
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        l: 'YYYY/M/D',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日dddd HH:mm',
    },
})

export const day = dayjs
