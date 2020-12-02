<template>
  <div id="app">
    <div id="cover">
      <Header />
      <p class="p">显示computed里的counta属性： {{counta}}</p>
      <p class="p">显示computed里的textA属性： {{textA}}</p>
      <p class="p">显示computed里的textA属性： {{textC}}</p>
      <p class="p">显示computed里的fullName属性： {{fullName}}</p>
      <p class="p">显示computed里的textPlus属性： {{textPlus}}</p>
      <router-link class="p" to="/app/123">app1</router-link>
      <router-link class="p" to="/app/456">app2</router-link>
      <router-link class="p" to="/login">login</router-link>
      <transition name="fade">
        <!-- 链接跳转时渐变效果 global.styl有css样式-->
        <router-view /> <!-- 主路由显示位置 -->
      </transition>
        <router-view name="a" /> <!-- 副路由显示位置 -->
      <Footer />
    </div>
  </div>
</template>
<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'
// <router-link to="/login/exact">login</router-link>
// <router-link :to="{name:'app'}">app</router-link>
export default {
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    // 调用actions.js里的updateCountAsync方法，并传入参数{ num: 5, time: 2000 }
    this.updateCountAsync({ num: 5, time: 2000 })
    this['a/updateText']('123')
    this['a/add']()
    // this['b/testAction']()

    // let i = 1
    // setInterval(() => {
    //   // 修改store.js里的updataCount方法传递参数i++
    //   this.updataCount({ num: i++, num2: 2 })
    // }, 1000)
  },
  methods: {
    ...mapActions(['updateCountAsync', 'a/add', 'b/testAction']),
    ...mapMutations(['updataCount', 'a/updateText'])
  },
  computed: {
    ...mapState({
      counta: (state) => state.count,
      textA: (state) => state.a.text,
      textC: (state) => state.c.text
      // 也可以写成 (['count'])
      // 还可以写成 ({counta: 'count'})
    }),
    ...mapGetters({
      fullName: 'fullName',
      textPlus: 'a/textPlus'
    })
    // count () {
    //   return this.$store.state.count // 调用store.js里的state属性
    // },
    // fullName () {
    //   return this.$store.getters.fullName // 调用store.js里的getters属性，间接的调用getters.js里的fullName方法
    // }
  }
}
</script>
<style lang="stylus" scoped>
#app
  position fixed
  width 100%

#cover
  margin-top 20px
  width 100%

.p
  font-size 18px
  text-decoration none
  color rgba(175, 47, 47, 1)
  font-weight 800
</style>
