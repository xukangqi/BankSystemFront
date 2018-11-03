import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import iView from 'iview';
import router from './routes/router';
// import axios from './axio_config.js';
import axios from 'axios';
import './mock';
import store from './vuex';


import 'ant-design-vue/dist/antd.css';
import 'iview/dist/styles/iview.css';


Object.defineProperty(Vue.prototype, '$axios', { value: axios });


Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(iView);

router.beforeEach((to, from, next) => {

  // 如果进入登录页面，则清空 user 信息
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  
  // 从 session 中获取 user 的信息
  let user=sessionStorage.getItem('user');

  // 如果没有登录，则回到登录页面
  if (!user && to.path !=='/login'&&to.path !=='/register') {
    next({ path: '/login' });
  } else {
    next();
  }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
