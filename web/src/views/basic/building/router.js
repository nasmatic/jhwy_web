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
    path: 'building',
    meta: {
        title: '房产档案',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'community',
        roles: [ROLES.FCDA]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '全部房产',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.FCDA]
            },
            component: () => import('./list')
        },
        {
            path: 'detail/:id',
            meta: {
                title: '房产详情',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.FCDA]
            },
            component: () => import('./detail')
        },
        {
            path: 'import',
            meta: {
                title: '房产导入',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: []
            },
            component: () => import('./import')
        }
    ]
};
