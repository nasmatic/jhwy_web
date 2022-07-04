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
    path: 'fitment',
    meta: {
        title: '装修登记',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'fitment',
        roles: [ROLES.ZXDJ]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '全部装修',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.ZXDJ]
            },
            component: () => import('./list')
        },
        {
            path: 'detail/:id',
            meta: {
                title: '装修详情',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.ZXDJ]
            },
            component: () => import('./detail')
        },
        {
            path: 'create',
            meta: {
                title: '新建登记',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.ZXDJ]
            },
            component: () => import('./create')
        }
    ]
};
