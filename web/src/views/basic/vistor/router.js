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
    path: 'vistor',
    meta: {
        title: '访客通行',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'vistor',
        roles: [ROLES.FKTX]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '全部访客',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.FKTX]
            },
            component: () => import('./list')
        },
        {
            path: 'detail/:id',
            meta: {
                title: '访客详情',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.FKTX]
            },
            component: () => import('./detail')
        },
        {
            path: 'create',
            meta: {
                title: '访客登记',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.FKTX]
            },
            component: () => import('./create')
        },
        {
            path: 'scan',
            meta: {
                title: '访客认证',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.FKTX]
            },
            component: () => import('./scan')
        }
    ]
};
