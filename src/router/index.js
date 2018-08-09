import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Welcome from '@/pages/Index'
import LoginIndex from '@/pages/LoginIndex'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

Vue.use(Router)
const router = new Router({
  routes: [
    // 登录注册模块
    {
      path: '/',
      component: LoginIndex,
      children: [
        {
          path: '/',
          title: '登录',
          name: 'login',
          component: Login,
        },
        {
          path: '/register',
          title: '注册',
          name: 'register',
          component: Register,
        },
      ]
    }, {
      path: '/index',
      title: '主页',
      component: Welcome,
      children: [
        {
          path: '/',
          name: 'welcome',
          title: '欢迎',
          meta: {
            requiresAuth: true
          },
          component: resolve => require(['@/pages/Welcome.vue'], resolve)
        },
      ]
    }]
})

// 注册全局钩子拦截导航 路由守卫
router.beforeEach((to, form, next) => {
  // 获取token
  let token = store.state.token;
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})
export default router;
