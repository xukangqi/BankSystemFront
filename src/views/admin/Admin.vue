<template>
    <div class="admin">
        <a-layout class="layout">
            <a-layout-header class="header">
                <div class="logo"></div>
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
    import db from '../../db/meta'
    const {menu} = db
    export default {
        name: 'admin',
        data() {
            return {
                menu
            }
        },
        components: {}
    }
</script>

<style scoped lang="scss">
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
