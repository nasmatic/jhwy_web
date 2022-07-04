const ROLES = require('@/constants/role');

module.exports = {
    path: 'CCTV',
    meta: {
        title: '视频监控',
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
                title: '全部监控',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.NRPX]
            },
            component: () => import('./list')
        },
        {
            path: 'cam',
            meta: {
                title: '监控详情',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.NRPX]
            },
            component: () => import('./cam')
        }
    ]
};
