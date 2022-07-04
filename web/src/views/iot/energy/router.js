/**
 * +----------------------------------------------------------------------
 * | 「海门嘉海」 —— 助力物业服务升级，用心服务万千业主
 * +----------------------------------------------------------------------
 * | Copyright (c) 2020~2021 https://www.chowa.com All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed 未经许可不能去掉「海门嘉海」和「HMJH」相关版权
 * +----------------------------------------------------------------------
 * | Author: jixuecong@chowa.cn
 * +----------------------------------------------------------------------
 */

const ROLES = require('@/constants/role');

module.exports = {
    path: 'energy',
    meta: {
        title: '能耗管理',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'energy',
        roles: [ROLES.ANYONE]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '人工抄表',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./main')
        },
        {
            path: 'meter',
            meta: {
                title: '仪表管理',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.NHGL]
            },
            component: () => import('./meter')
        },
        {
            path: 'repeater',
            meta: {
                title: '中继管理',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.NHGL]
            },
            component: () => import('./repeater')
        }
    ]
};
