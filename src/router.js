import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/products',
            name: 'products',
            component: () => import('./views/Products.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        },
    ]
})
