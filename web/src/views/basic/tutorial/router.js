const ROLES = require('@/constants/role');

module.exports = {
    path: 'tutorial',
    meta: {
        title: '内容培训',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'vistor',
        roles: [ROLES.NRPX]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '全部内容',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.NRPX]
            },
            component: () => import('./list')
        },
        {
            path: 'detail',
            meta: {
                title: '工单详情',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.NRPX]
            },
            component: () => import('./detail')
        }
    ]
};
