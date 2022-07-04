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
    path: '/basic',
    meta: {
        title: '物业服务',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'service',
        roles: [ROLES.ANYONE]
    },
    component: () => import('./index'),
    children: [
        require('./dashboard/router'),
        // require('./epidemic/router'),
        require('./notice/router'),
        // require('./pet/router'),
        // require('./fitment/router'),
        require('./repair/router'),
        require('./complain/router'),
        // require('./car/router'),
        // require('./movecar/router'),
        // require('./vistor/router'),
        require('./questionnaire/router'),
        require('./topic/router'),
        require('./building/router'),
        require('./ower/router'),
        require('./tutorial/router'),
        require('./CCTV/router'),
        require('./service/router'),
        require('./plant/router')
    ]
};
