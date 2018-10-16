export default {
    nav: [
        {
            id: 1,
            link: '/admin/user/accounts',
            name: '账户'
        },
        {
            id: 2,
            link: '/admin/record/deposits',
            name: '记录'
        },
        {
            id: 3,
            link: '/admin/fund/products',
            name: '基金'
        }
    ],
    menu: [
        {
            id: 1,
            icon: 'user',
            name: '账户',
            menuItems: [
                {
                    id: 11,
                    name: '账户',
                    link: '/admin/user/accounts'
                },
                {
                    id: 12,
                    name: '用户',
                    link: '/admin/user/users'
                },
                {
                    id: 13,
                    name: '客户',
                    link: '/admin/user/clients'
                }
            ]
        },
        {
            id: 2,
            icon: 'solution',
            name: '记录',
            menuItems: [
                {
                    id: 21,
                    name: '存款记录',
                    link: '/admin/record/deposits'
                },
                {
                    id: 22,
                    name: '取款记录',
                    link: '/admin/record/withdrawals'
                },
                {
                    id: 23,
                    name: '转账记录',
                    link: '/admin/record/transfers'
                },
                {
                    id: 24,
                    name: '汇票记录',
                    link: '/admin/record/drafts'
                }
            ]
        },
        {
            id: 3,
            icon: 'swap',
            name: '利率',
            menuItems: [
                {
                    id: 31,
                    name: '存款利率',
                    link: '/admin/interest/deposits'
                },
                {
                    id: 32,
                    name: '取款利率',
                    link: '/admin/interest/withdrawals'
                },
            ]
        }
    ],
}