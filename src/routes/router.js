import Vue from 'vue'
import Router from 'vue-router';
import Admin from '../views/admin/Admin.vue';
import Login from '../views/login/Login.vue';
import Register from '../views/register/Register.vue';

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
        },{
              path:'/register',
              name:'register',
              component:Register
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
            path: '/admin/money',
            component: Admin,
            meta: {requiresAuth: true},
            children: [
                {
                    path: '',
                    name: 'default',
                    component: () => import('../views/admin/deposit-withdrawal/DepositApply.vue')
                },
                {
                    path: 'deposit',
                    name: 'deposit',
                    component: () => import('../views/admin/deposit-withdrawal/DepositRecord.vue')
                },{
                    path: 'deposit/apply',
                    name: 'deposit-apply',
                    component: () => import('../views/admin/deposit-withdrawal/DepositApply.vue')
                },
                {
                    path: 'withdrawal',
                    name: 'withdrawal',
                    component: () => import('../views/admin/deposit-withdrawal/WithdrawalRecord.vue')
                }, {
                    path: 'withdrawal/apply',
                    name: 'withdrawal-apply',
                    component: () => import('../views/admin/deposit-withdrawal/WithdrawalApply.vue')
                }
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
        },{
            path: '/admin/clearing',
            component: Admin,
            meta: {requiresAuth: true},
            children: [
                {
                    path: 'draft',
                    name: 'draft',
                    component: () => import('../views/admin/clearing/draft.vue')
                },
                {
                    path: 'transfer',
                    name: 'transfer',
                    component: () => import('../views/admin/clearing/transfer.vue')
                }
            ]
        },{
            path: '/admin/investment',
            component: Admin,
            meta: {requiresAuth: true},
            children: [
                {
                    path: 'query-fund',
                    name: 'query-fund',
                    component: () => import('../views/admin/investment/QueryFund.vue')
                },
                {
                    path: 'subscribe-fund',
                    name: 'subscribe-fund',
                    component: () => import('../views/admin/investment/SubscribeFund.vue')
                },
                {
                    path: 'hold-fund',
                    name: 'hold-fund',
                    component: () => import('../views/admin/investment/HoldFund.vue')
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
