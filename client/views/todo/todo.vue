<template>
  <div class="real-app">
    <router-view></router-view>
    <!-- 显示子路由path: 'test' component: Login -->
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来做什么"
      @keyup.enter="addTodo"
    >
    <Item
      v-for="nextTodo in filteredTodos"
      :key="nextTodo.id"
      :todo="nextTodo" :completed.sync = "nextTodo.completed"
      @del="deleteTodo2"
    />
    <Tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearall="clearAll2"
    />
  </div>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  // 组件内部的勾子
  // 进入该组件时，被触发
  // 在全局勾子beforeEach与配置勾子beforeEnter之后触发
  beforeRouteEnter (to, from, next) {
    // 由于beforeRouteEnter是在组件数据初始化之前所触发的，所以'this'返回undefined
    console.log('todo before enter', this)
    next(vm => {
      console.log('after enter vm.id is ', vm.id)
    })// 组件跳转成功后，会回调一个参数vm,可以用vm调用组件初始化后的数据
  },
  // 同一个组件、不同的路由互相切换时，被触发
  beforeRouteUpdate (to, from, next) {
    console.log('todo update enter')
    next()
  },
  // 离开该组件时，被触发
  beforeRouteLeave (to, from, next) {
    console.log('todo leave enter')
    if (global.confirm('确定离开？')) { // 离开本组件（页面）时，询问'确定离开？'
      next()
    }
  },
  props: ['id'], // 接受由routes.js转递过来的对象id: router.query.b
  components: {
    Item,
    Tabs
  },
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  mounted () {
    console.log(this.$route)
    console.log(this.$route.query.a)
    console.log(this.$route.params)
    console.log(this.id)
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo2 (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAll2 () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>
<style lang="stylus" scoped>
.real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
    position relative
    z-index 10
    max-height 450px
    overflow-y auto

.add-input
    background-color white
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border none
    outline none
    color inherit
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 36px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
</style>
