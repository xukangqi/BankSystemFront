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
            icon: 'idcard',
            name: '客户信息管理',
            menuItems: [
                {
                    id: 21,
                    name: '客户信息查询',
                    link: '/admin/customer/info'
                },
                {
                    id: 22,
                    name: '申请开户',
                    link: '/admin/customer/new'
                }, {
                    id: 23,
                    name: '新增账户',
                    link: '/admin/customer/newaccount'
                }
            ]
        },
        {
            id: 3,
            icon: 'pay-circle-o',
            name: '存取款信息',
            menuItems: [
                {
                    id: 31,
                    name: '存款记录查询',
                    link: '/admin/money/deposit'
                },{
                    id: 32,
                    name: '办理存款',
                    link: '/admin/money/deposit/apply'
                },
                {
                    id: 33,
                    name: '取款记录查询',
                    link: '/admin/money/withdrawal'
                },{
                    id: 34,
                    name: '办理取款',
                    link: '/admin/money/withdrawal/apply'
                }
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
        },{
            id: 5,
            icon: 'hourglass',
            name: '清算业务',
            menuItems: [
                {
                    id: 51,
                    name: '汇款申请',
                    link: '/admin/clearing/remit-application'
                },
                {
                    id: 52,
                    name: '汇款清算',
                    link: '/admin/clearing/remit-clearing'
                },
                {
                    id: 53,
                    name: '汇款提取',
                    link: '/admin/clearing/remit-drawing'
                },
                {
                    id: 54,
                    name: '转账申请',
                    link: '/admin/clearing/transfer-application'
                },
                {
                    id: 55,
                    name: '转账清算',
                    link: '/admin/clearing/transfer-clearing'
                }
            ]
        },
        {
            id: 6,
            icon: 'pay-circle-o',
            name: '投资业务',
            menuItems: [
                {
                    id: 61,
                    name: '基金查询与认购',
                    link: '/admin/investment/query-fund'
                },
                {
                    id: 62,
                    name: '基金交易记录',
                    link: '/admin/investment/subscribe-fund'
                },
                {
                    id: 63,
                    name: '基金持有',
                    link: '/admin/investment/hold-fund'
                },           
            ]
        }
    ],
}