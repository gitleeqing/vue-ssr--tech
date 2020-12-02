import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // fallback: true,
    // base: '/base/',
    linkActiveClass: 'active-link', // 自定义路由跳转时的css效果
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) { // 页面跳转时保持浏览器滑条的位置
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
    // parseQuery (query) {
    // },
    // stringifyQuery (obj) {
    // }
  })
}
