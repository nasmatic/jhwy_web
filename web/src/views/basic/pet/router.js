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
    path: 'pet',
    meta: {
        title: '宠物档案',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'pet',
        roles: [ROLES.CWDA]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '全部档案',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.CWDA]
            },
            component: () => import('./list')
        },
        {
            path: 'detail/:id',
            meta: {
                title: '宠物详情',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.CWDA]
            },
            component: () => import('./detail')
        },
        {
            path: 'create',
            meta: {
                title: '创建档案',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.CWDA]
            },
            component: () => import('./create')
        }
    ]
};
