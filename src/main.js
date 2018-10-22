
import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import iView from 'iview';
import router from './routes/router';
import store from './store';
// import axios from './axio_config.js';
import axios from 'axios';

import './mock';

import 'ant-design-vue/dist/antd.css';
import 'iview/dist/styles/iview.css';


Object.defineProperty(Vue.prototype, '$axios', { value: axios });

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(iView);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
