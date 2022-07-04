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
    path: 'park',
    meta: {
        title: '智慧停车',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'park',
        roles: [ROLES.ANYONE]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '通行记录',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./log')
        },
        {
            path: 'blacklist',
            meta: {
                title: '黑名单管理',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.ZHTC]
            },
            component: () => import('./blacklist')
        },
        {
            path: 'manage',
            meta: {
                title: '停车场管理',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.ZHTC]
            },
            component: () => import('./manage')
        }
    ]
};
