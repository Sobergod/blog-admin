import axios from 'axios';
import store from '../store/index';
import router from '../router/index';
// 接口地址 测试和开发环境 切换dev的状态控制开发和上线环境(true/false)
const dev = false;
const baseUrl =
    dev === true
        ? 'https://www.easy-mock.com/mock/5b319ab2a776703db5dff938/test'
        : 'http://localhost:3000/api/a';
// 配置ajax
let AX = axios.create({
    baseURL: baseUrl,
    timeout: 3000,
    responseType: 'json',
})
// 请求拦截器请求之前加上token
AX.interceptors.request.use(
    config => {
        // 找到token,找到了给每个http header加上token
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
        }
        console.log(config)
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)
// 请求token,正常请求数据,后台会判断是否需要传token并给出响应
AX.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        if (err.response) {
            console.log(err.response);
            switch (err.response.status) {
                // 后台给出401错误信息后的处理
                case 401:
                    store.dispatch('UserLogout');//清除当前错误token
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
            }
        }
        return Promise.reject(err.response);//返回错误信息
    }
)
export default AX 