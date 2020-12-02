import Vue from 'vue'
// 创建子组件
const compoent = {
  props: {
    active: {
      // type: Boolean,// 数据类型
      // required: true,// 父组件必须抛出一个数据，否则报错
      // default: true,// 父组件可以不抛出数据
      validator (value) {
        return typeof value === 'boolean'
      }// 自定义规范，value代表父组件所抛出的数据的值
    },
    propOne: String// 父组件传递给子组件的数据的规范配置（简写）
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      // 调用父组件传递过来的  handleChange方法
      // 调用父组件传递过来的对象  prop1: 'text1'
      // 调用父组件传递过来字的符串  text2
      <span v-show="active">see me if active</span>
      // 调用父组件传递过来的布尔值  true
    </div>
  `,
  data () {
    return {
      text: 0
    }
  }, // 在子组件中配置数据时，不可以像父组件中那样写，必须使用return的方式
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}// 这是一个子组件

// Vue.component('CompOne', compoent)// 在全局声明一个子组件

new Vue({
  components: {
    CompOne: compoent// 在vue实例中声明一个子组件  注意子组件书写规范CompOne =》 <comp-one></comp-one>
  },
  data: {
    prop1: 'text1'
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  mounted () {
    console.log(this.$refs.comp1)// 在console上输出comp1这个dom节点的所有数据
  },
  el: '#root',
  template: `
    <div>
      // 使用子组件
      <comp-one ref="comp1" :active="true" :prop-one="prop1" @change="handleChange"></comp-one>
      // 父组件向子组件传递布尔值、对象、方法（渲染结果在此处显示）
      <comp-one :active="true" propOne="text2"></comp-one>
      // 父组件向子组件传递布尔值、字符串（渲染结果在此处显示）
    </div>
  `
})// 这是一个父组件
