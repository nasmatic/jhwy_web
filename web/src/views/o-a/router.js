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
    path: '/o-a',
    meta: {
        title: '协同办公',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'oa',
        roles: [ROLES.ANYONE]
    },
    component: () => import('./index'),
    children: [
        require('./dashboard/router'),
        require('./party/router'),
        require('./inform/router'),
        require('./mission/router'),
        require('./order/router'),
        require('./meeting/router'),
        require('./finance/router'),
        // require('./leave/router'),
        // require('./refound/router'),
        require('./material/router'),
        require('./contract/router'),
        require('./hr/router')
    ]
};
