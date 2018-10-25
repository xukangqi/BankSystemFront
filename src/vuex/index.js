import Vue from 'vue';
import Vuex from 'vuex';
//用户
import user from './user.js';


Vue.use(Vuex);
const state={
    items:[]
};
const store=new Vuex.Store({
    state,
    modules:{
        user
    }
});
export default store;