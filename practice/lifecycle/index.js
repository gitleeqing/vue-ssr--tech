import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate () { // vue实例没有被挂载到dom节点的时候，初始化的时候就已经执行（与服务端渲染有关）
    console.log(this, 'beforeCreate')
  },
  created () { // vue实例没有被挂载到dom节点的时候，初始化的时候就已经执行 一般用于操作数据（与服务端渲染有关）
    console.log(this, 'created')
  },
  beforeMount () { // 与挂载到页面上显示的内容有关系（与服务端渲染无关）
    console.log(this, 'beforeMount')
  },
  mounted () { // 与挂载到页面上显示的内容有关系 一般用于操作DOM或者数据（与服务端渲染无关）
    console.log(this, 'mount')
  },
  beforeUpdate () { // 有数据更新时，执行
    console.log(this, 'beforeUpdate')
  },
  updated () { // 有数据更新时，执行
    console.log(this, 'updated')
  },
  activated () { // 在组件章节讲解
    console.log(this, 'activated')
  },
  deactivated () { // 在组件章节讲解
    console.log(this, 'deactivated')
  },
  beforeDestroy () { // 与$destroy有关
    console.log(this, 'beforeDestroy')
  },
  destroyed () { // 与$destroy有关
    console.log(this, 'destroyed')
  },
  // 模拟vue将template组件转化为render function的过程
  render (h) {
    // throw new TypeError('render error')
    console.log('render function invoked')// 'render function invoked'会在beforeMount与mount之间出现
    return h('div', {}, this.text)
  },
  renderError (h, err) {
    // 接收render function的错误信息
    // 不会向上冒泡，只关心本组件，只可以开发环境使用
    return h('div', {}, err.stack)
  },
  errorCaptured () {
    // 接收render function的错误信息
    // 会向上冒泡，并且生产环境可以使用
  }
})
app.$mount('#root')
setInterval(() => {
  app.text = app.text += 4
}, 1000)
// 销毁vue实例（解除所有的watch、事件监听）
setTimeout(() => {
  app.$destroy()
}, 1000)
