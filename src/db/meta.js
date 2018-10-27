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
                },{
                    id: 43,
                    name: '贷款详情',
                    link: '/admin/loan/detail'
                },{
                    id: 44,
                    name: '贷款详情',
                    link: '/admin/loan/temp'
                }              
            ]
        },
        {
            id: 5,
            icon: 'hourglass',
            name: '清算业务',
            menuItems: [
                {
                    id: 51,
                    name: '汇票业务',
                    link: '/admin/clearing/draft'
                },
                {
                    id: 52,
                    name: '转账业务',
                    link: '/admin/clearing/transfer'
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
        },
    ],
}