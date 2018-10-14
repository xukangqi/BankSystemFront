export default {
    nav: [
        {
            id: 1,
            link: '/',
            name: 'Home'
        },
        {
            id: 2,
            link: '/products',
            name: 'Products'
        },
        {
            id: 3,
            link: '/about',
            name: 'About'
        }
    ],
    menu: [
        {
            id: 1,
            icon: 'user',
            name: 'SubMenu 1',
            menuItems: [
                {
                    id: 11,
                    name: 'Home 1',
                    link: '/'
                },
                {
                    id: 12,
                    name: 'Home 2',
                    link: '/'
                },
            ]
        },
        {
            id: 2,
            icon: 'user',
            name: 'SubMenu 2',
            menuItems: [
                {
                    id: 21,
                    name: 'Products 1',
                    link: '/products'
                },
                {
                    id: 22,
                    name: 'Products 2',
                    link: '/products'
                },
            ]
        },
        {
            id: 3,
            icon: 'user',
            name: 'SubMenu 3',
            menuItems: [
                {
                    id: 31,
                    name: 'About 1',
                    link: '/about'
                },
                {
                    id: 32,
                    name: 'About 2',
                    link: '/about'
                },
            ]
        }
    ],
}