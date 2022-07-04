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
    path: 'plant',
    meta: {
        authRequired: true,
        title: '绿植租赁',
        layout: 'sider',
        icon: 'topic',
        nav: true,
        roles: [ROLES.LZZL]
    },
    component: () => import('./'),
    children: [
        {
            path: '',
            meta: {
                authRequired: true,
                title: '全部租赁',
                layout: 'sider',
                nav: true,
                roles: [ROLES.LZZL]
            },
            component: () => import('./list')
        },
        {
            path: 'create',
            meta: {
                authRequired: true,
                title: '创建租赁',
                layout: 'sider',
                nav: true,
                roles: [ROLES.LZZL]
            },
            component: () => import('./create')
        },
        {
            path: 'import',
            meta: {
                authRequired: true,
                title: '租赁导入',
                layout: 'sider',
                nav: true,
                roles: [ROLES.LZZL]
            },
            component: () => import('./import')
        }
    ]
};
