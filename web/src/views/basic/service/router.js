const ROLES = require('@/constants/role');

module.exports = {
    path: 'service',
    meta: {
        title: '家政服务',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'vistor',
        roles: [ROLES.JZFW]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '申请记录',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.JZFW]
            },
            component: () => import('./list')
        },
        {
            path: 'import',
            meta: {
                title: '导入数据',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.JZFW]
            },
            component: () => import('./import')
        }
    ]
};
