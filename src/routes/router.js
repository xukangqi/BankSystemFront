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
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/admin',
            redirect: '/admin/user'
        },
        {
            path: '/admin/user',
            component: Admin,
            meta: {requiresAuth: true},
            children: [
                {
                    path: '',
                    name: 'default-user',
                    component: () => import('../views/admin/user/Info.vue')
                },
                {
                    path: 'info',
                    name: 'user-info',
                    component: () => import('../views/admin/user/Info.vue')
                },
                {
                    path: 'edit-form',
                    name: 'user-edit-form',
                    component: () => import('../views/admin/user/EditForm.vue')
                }
            ]
        },
        {
            path: '/admin/customer',
            component: Admin,
            meta: {requiresAuth: true},
            children: [
                {
                    path: '',
                    name: 'default-customer',
                    component: () => import('../views/admin/customer/CustomerInfo.vue')
                },
                {
                    path: 'info',
                    name: 'customer-info',
                    component: () => import('../views/admin/customer/CustomerInfo.vue')
                },
                {
                    path: 'edit',
                    name: 'customer-edit',
                    component: () => import('../views/admin/customer/EditCustomerInfo.vue')
                },{
                    path: 'new',
                    name: 'new-consumer',
                    component: () => import('../views/admin/customer/NewConsumer.vue')
                },{
                    
                    path: 'newaccount',
                    name: 'new-account',
                    component: () => import('../views/admin/customer/NewAccount.vue')
                }
            ]
        },
        {
            path: '/admin/deposit-withdrawal',
            component: Admin,
            meta: {requiresAuth: true},
            children: [
                {
                    path: '',
                    name: 'default-deposit-withdrawal',
                    component: () => import('../views/admin/deposit-withdrawal/Deposit.vue')
                },
                {
                    path: 'deposit',
                    name: 'deposit',
                    component: () => import('../views/admin/deposit-withdrawal/Deposit.vue')
                },
                {
                    path: 'withdrawal',
                    name: 'withdrawal',
                    component: () => import('../views/admin/deposit-withdrawal/Withdrawal.vue')
                },
            ]
        },{
            path: '/admin/loan',
            component: Admin,
            meta: {requiresAuth: true},
            children: [
                {
                    path: '',
                    name: 'default-loan',
                    component: () => import('../views/admin/loan/loanManage.vue')
                },
                {
                    path: 'manage',
                    name: 'loan-manage',
                    component: () => import('../views/admin/loan/loanManage.vue')
                },
                {
                    path: 'apply',
                    name: 'loan-apply',
                    component: () => import('../views/admin/loan/loanApply.vue')
                }
            ]
        }
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
