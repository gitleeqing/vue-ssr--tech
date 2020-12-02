import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
import './assets/styles/global.styl'
import './assets/styles/global.css'
import createRouter from './config/router'
import createStore from './store/store'

// const root = document.createElement('div')
// document.body.appendChild(root)
Vue.use(VueRouter)
Vue.use(Vuex)
const router = createRouter()
const store = createStore()
// 在store里动态注册新的模块c
// unregisterModule 解除注册的模块
store.registerModule('c', {
  state: {
    text: 'abc'
  }
})

// 监听应用中，当回调方法“(state) => state.count + 1”发生改变时，生成newCount
// store.watch((state) => state.count + 1, (newCount) => {
//   console.log('new count watched:', newCount)
// })

// 监听应用中，当有mutation被调用时，触发事件
// store.subscribe((mutation, state) => {
//   console.log(mutation.type) 方法名称
//   console.log(mutation.payload) 传入的参数
// })

// 监听应用中，当有action被调用时，触发事件
// store.subscribeAction((action, state) => {
//   console.log(action.type) // 方法名称
//   console.log(action.payload) // 传入的参数
// })

// router的全局勾子
// 导航跳转之前触发 next()代表跳转的意思
router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
  // if (to.fullPath === '/app') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
})
//
router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})
// 导航跳转之后触发
router.afterEach((to, from) => {
  console.log('after each invoked')
})

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#root')
