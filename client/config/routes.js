// import Todo from '../views/todo/todo.vue' // 同步加载组件（页面）在项目初始化的时候，就加载全部的js(组件)
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app/xxx' // 根目录默认显示的组件
  },
  {
    path: '/app/:id',
    props: true,
    // props: {
    //   id: '456'
    // },
    // props: (router) => ({ id: router.query.b }),// 利用router.query给子组件转递对象储存在props上
    component: () => import('../views/todo/todo.vue'), // 异步加载组件（页面）在路由跳转的时候，才去加载js(组件)
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'asdasd'
    },
    children: [ // 配置子路由
      {
        path: 'test',
        component: () => import('../views/login/login.vue')
      }
    ],
    // 路由配置勾子
    // 在导航跳转到/app组件之前被触发
    // 发生在全局勾子router.beforeEach与router.beforeResolve之间
    beforeEnter (to, from, next) {
      console.log('app route before enter')
      next()
    }
  },
  {
    path: '/login',
    components: {
      default: () => import('../views/login/login.vue'), // 主路由连接的子组件
      a: () => import('../views/todo/todo.vue') // 副路由连接的子组件
    }
  }
  // {
  //   path: '/login/exact',
  //   component: Login
  // }
]
