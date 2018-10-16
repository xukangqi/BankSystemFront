import Vue from 'vue'
import Router from 'vue-router'
import Admin from '../views/admin/Admin.vue'
import Login from '../views/login/Login.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/admin/user',
            component: Admin,
            meta: {requiresAuth: true},
            children: [
                {
                    path: '',
                    name: 'defaultUser',
                    component: () => import('../views/admin/user/Users.vue')
                },
                {
                    path: 'users',
                    name: 'users',
                    component: () => import('../views/admin/user/Users.vue')
                },
                {
                    path: 'accounts',
                    name: 'accounts',
                    component: () => import('../views/admin/user/Accounts.vue')
                },
                {
                    path: 'clients',
                    name: 'clients',
                    component: () => import('../views/admin/user/Clients.vue')
                }
            ]
        },
        {
            path: '/admin/record',
            component: Admin,
            children: [
                {
                    path: '',
                    name: 'defaultRecord',
                    component: () => import('../views/admin/record/Deposits.vue')
                },
                {
                    path: 'deposits',
                    name: 'depositsRecord',
                    component: () => import('../views/admin/record/Deposits.vue')
                },
                {
                    path: 'drafts',
                    name: 'draftsRecord',
                    component: () => import('../views/admin/record/Drafts.vue')
                },
                {
                    path: 'transfers',
                    name: 'transfersRecord',
                    component: () => import('../views/admin/record/Transfers.vue')
                },
                {
                    path: 'withdrawals',
                    name: 'withdrawalsRecord',
                    component: () => import('../views/admin/record/Withdrawals.vue')
                }
            ]
        },
        {
            path: '/admin/interest',
            component: Admin,
            children: [
                {
                    path: '',
                    name: 'defaultInterest',
                    component: () => import('../views/admin/interest/Deposits.vue')
                },
                {
                    path: 'deposits',
                    name: 'depositsInterest',
                    component: () => import('../views/admin/interest/Deposits.vue')
                },
                {
                    path: 'withdrawals',
                    name: 'withdrawalsInterest',
                    component: () => import('../views/admin/interest/Withdrawals.vue')
                },
            ]
        },
    ]
})

const auth = {
    loggedIn() {
        return true
    }
}

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth.loggedIn()) {
            next({
                path: '/',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})

export default router
