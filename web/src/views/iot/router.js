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
    path: '/iot',
    meta: {
        title: '智慧物联',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'iot',
        roles: [ROLES.ANYONE]
    },
    component: () => import('./index'),
    children: [
        require('./dashboard/router'),
        require('./entrance/router'),
        require('./elevator/router'),
        require('./lamp/router'),
        require('./energy/router'),
        require('./park/router'),
        require('./warning/router')
        // require('./monitor/router'),
        // require('./charging/router')
    ]
};
