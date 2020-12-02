import Vue from 'vue'

const component = {
  model: {
    prop: 'value1', // 代替value数据
    event: 'change'// 代替input事件
  },
  props: ['value1'], // 代替value数据
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1">
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)// 代替input事件
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
      <comp-one v-model="value"></comp-one>
    </div>
  `
})
