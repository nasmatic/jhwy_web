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
    path: 'init',
    meta: {
        title: '系统初始化',
        authRequired: false,
        layout: null,
        nav: false,
        roles: [ROLES.ANYONE]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '管理员扫码',
                authRequired: false,
                layout: null,
                nav: false,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./scan')
        },
        {
            path: '/fill',
            meta: {
                title: '初始化信息',
                authRequired: false,
                layout: null,
                nav: false,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./fill')
        }
    ]
};
