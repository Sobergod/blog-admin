import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    token: window.sessionStorage.getItem('token'),
    username: '',
    bind: window.localStorage.getItem('bind', data) ? false : window.localStorage.setItem('bind', data),
};
const mutations = {
    BIND: (state, data) => {
        state.bind = data;
        window.localStorage.setItem('bind', data);
    },
    LOGIN: (state, data) => {
        //更改token的值
        state.token = data;
        window.sessionStorage.setItem('token', data);
    },
    LOGOUT: (state) => {
        //登出的时候要清除token
        state.token = null;
        window.sessionStorage.removeItem('token');
    },
    USERNAME: (state, data) => {
        //把用户名存起来
        state.username = data;
        window.sessionStorage.setItem('username', data);
    }
};
const actions = {
    UserLogin({ commit }, data) {
        commit('LOGIN', data);
    },
    UserLogout({ commit }) {
        commit('LOGOUT');
    },
    UserName({ commit }, data) {
        commit('USERNAME', data);
    },
    UserBind({ commit }, data) {
        commit('BIND', data);
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions
})