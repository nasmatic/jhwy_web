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
    path: '/user',
    meta: {
        authRequired: false,
        title: '用户',
        layout: null,
        nav: false,
        roles: [ROLES.ANYONE]
    },
    component: () => import('./'),
    children: [require('./init/router'), require('./login/router'), require('./zone/router')]
};
