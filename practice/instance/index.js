import Vue from 'vue'
/* eslint-disable no-new */
const app = new Vue({
  // el: '#root',
  template: '<div ref="b">{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
})

app.$mount('#root')
let i = 0
setInterval(() => {
  i++
  // app.obj.a = i
  // app.$forceUpdate()
  app.$set(app.obj, 'a', i)
  // app.$delete(app.obj, 'a')
  // app.text += 1
  // app.$options.data.text += 1
  // app.$data.text += 1
}, 1000)
// vue实例属性
console.log(app.$data)
console.log(app.$props)
console.log(app.$el)
console.log(app.$options)
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
console.log(app.$root === app)
// <item><div></div></item>vue组件
console.log(app.$children)
console.log(app.$slots)
console.log(app.$scopedSlots)
console.log(app.$refs)
console.log(app.$isServer)
// vue实例方法
const unwatch = app.$watch('text', (newText, oldText) => {
  console.log(`${newText} : ${oldText}`)
})
setTimeout(() => {
  unwatch()
}, 2000)
// app.$on('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })
// app.$emit('test', 3, 2)
app.$once('test', (a, b) => {
  console.log(`test emited ${a} ${b}`)
})
setInterval(() => {
  app.$emit('test', 3, 2)
}, 1000)
// app.$nextTick([callback])
