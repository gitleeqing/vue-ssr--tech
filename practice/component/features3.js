import Vue from 'vue'

const ChildComponent = {
  template: '<div>child component: {{data.value}}</div>', // 孙子组件接受爷爷组件传递过来的数据
  inject: ['yeye', 'data']// ChildComponent组件接收到来自父辈组件(yeye)传过来的变量data
}

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  template: `
    <div>
      <child-component />
    </div>
  `
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })// value属性一旦改变将触发get方法，return新的value属性
    return {
      yeye: this, // 将此vue实例定义为'yeye'
      data
      // 将包含value属性的变量data，传递给孙子组件
    }
  },
  data () {
    return {
      value: '123'
    }
  },
  template: `
    <div>
      <comp-one>
      </comp-one>
      <input type="text" v-model="value" /> // 双向绑定属性value,为了去改变value属性的值
    </div>
  `
})
