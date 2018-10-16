import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './routes/router'
import store from './store'
import axios from './axio_config.js'

import 'ant-design-vue/dist/antd.css'

Object.defineProperty(Vue.prototype, '$axios', { value: axios });

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
