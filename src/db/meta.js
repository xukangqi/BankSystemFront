export default {
    menu: [
        {
            id: 1,
            icon: 'user',
            name: '用户信息管理',
            menuItems: [
                {
                    id: 11,
                    name: '用户信息查询',
                    link: '/admin/user/info'
                },
                {
                    id: 12,
                    name: '用户信息维护',
                    link: '/admin/user/edit-form'
                },
            ]
        },
        {
            id: 2,
            icon: 'smile-o',
            name: '客户信息管理',
            menuItems: [
                {
                    id: 21,
                    name: '客户信息查询',
                    link: '/admin/customer/info'
                },
                {
                    id: 22,
                    name: '客户信息维护',
                    link: '/admin/customer/edit-form'
                },
            ]
        },
        {
            id: 3,
            icon: 'table',
            name: '存取款信息',
            menuItems: [
                {
                    id: 31,
                    name: '存款业务',
                    link: '/admin/deposit-withdrawal/deposit'
                },
                {
                    id: 32,
                    name: '取款业务',
                    link: '/admin/deposit-withdrawal/withdrawal'
                },
            ]
        },
        {
            id: 4,
            icon: 'solution',
            name: '贷款业务',
            menuItems: [
                {
                    id: 41,
                    name: '贷款申请',
                    link: '/admin/loan/apply'
                },
                {
                    id: 42,
                    name: '贷款管理',
                    link: '/admin/loan/manage'
                }           
            ]
        },
    ],
}