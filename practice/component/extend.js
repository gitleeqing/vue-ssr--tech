import Vue from 'vue'
// 这是一个子组件
const compoent = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('comp mounted')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

const componet2 = {
  extends: compoent, // 声明一个变量去继承compoent子组件已经配置好的属性
  data () { // 会覆盖子组件中相同的属性
    return {
      text: 1
    }
  },
  mounted () {
    console.log(this.$parent.$options.name) // 在console输出父组件的name（不可修改，输出Root）
  }
}

// const CompVue = Vue.extend(compoent) // 声明一个变量去继承compoent子组件已经配置好的属性

// new CompVue({ // 用预先设置好的属性创建一个vue实例
//   el: '#root',
//   propsData: { // 给子组件传递一个数据
//     propOne: 'xxx'
//   },
//   data: { // 会覆盖子组件中相同的属性
//     text: '123'
//   },
//   mounted () {
//     console.log('instance mounted')
//   }
// })

const parent = new Vue({
  name: 'parent'
})

new Vue({
  parent: parent, // 改变此vue实例的parent属性parent：{name: 'parent'}
  name: 'Root',
  el: '#root',
  mounted () {
    console.log(this.$parent.$options.name) // 在console将输出parent
  },
  components: {
    Comp: componet2 // 注册一个子组件
  },
  data: {
    text: 23333
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp></comp> // 使用子组件
    </div>
  `
})
