import Vue from 'vue'

const component = {
  props: ['value'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1">
      // 子组件触发handleInput事件，子组件接受父组件的数据
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
      // 触发父组件的input事件，并且传递一个参数e.target.value
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  template: `
    <div>
      <comp-one v-model="value"></comp-one>geizizhujian
      // v-model组件双向绑定的原理（:value=value @input="value = arguments[0]"）
      // 给子组件传递一个数据，input事件被子组件触发，并且接受子组件传递过了的参数arguments[0] = e.target.value
    </div>
  `
})
