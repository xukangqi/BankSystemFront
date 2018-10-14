<template>
    <div id="app">
        <a-layout class="layout">
            <a-layout-header class="header">
                <div class="logo"></div>
                <!--上侧的Nav-->
                <a-menu theme="dark" mode="horizontal" class="nav" :defaultSelectedKeys="[1]">
                    <a-menu-item v-for="navItem in nav" :key="navItem.id">
                        <router-link :to="navItem.link">{{navItem.name}}</router-link>
                    </a-menu-item>
                </a-menu>
            </a-layout-header>
            <a-layout>
                <a-layout-sider width="200" >
                    <!--左侧菜单栏-->
                    <a-menu mode="inline" class="menu" :defaultSelectedKeys="[11]" :defaultOpenKeys="[1]">
                        <a-sub-menu v-for="subMenu in menu" :key="subMenu.id">
                            <span slot="title">
                                <a-icon :type="subMenu.icon"/>{{subMenu.name}}
                            </span>
                            <a-menu-item v-for="menuItem in subMenu.menuItems" :key="menuItem.id">
                                <router-link :to="menuItem.link">{{menuItem.name}}</router-link>
                            </a-menu-item>
                        </a-sub-menu>
                    </a-menu>
                </a-layout-sider>
                <a-layout class="content-wrapper">
                    <!--展示内容的面板-->
                    <a-layout-content class="content">
                        <router-view></router-view>
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
        },
    }
</script>

<style lang="scss" scoped>
    .layout {
        height: 100vh;
        .nav {
            line-height: 64px;
        }
        .menu {
            height: 100%;
            border-right: 0;
        }
        .logo {
            width: 120px;
            height: 31px;
            background: rgba(255, 255, 255, .2);
            margin: 16px 28px 16px 0;
            float: left;
        }
        .content-wrapper {
            padding: 24px;
            .content {
                background: #fff;
                padding: 24px;
                margin: 0;
                minHeight: 280px
            }
        }
    }
</style>
