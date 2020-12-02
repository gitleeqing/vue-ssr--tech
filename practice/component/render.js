import Vue from 'vue'
// template渲染成真正的html原理
// render方法中的createElement会创建一个v-loader类，v-loader类是模仿dom结构的一个虚拟dom,储存在内存中，他会比较真正的dom与虚拟dom的不同部分，更新真正的dom结构
const component = {
  props: ['props1'],
  name: 'comp',
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  render (createElement) {
    return createElement(
      'div',
      {
        style: this.style,
        on: {
          click: () => { // 可以理解为v-on:click
            this.$emit('click')// 从$emit中获得父组件传递的click事件
          }
        }
      },
      [
        // this.$slots.default,
        this.$slots.header, // 可以理解为<slot name="header"></slot>
        this.props1
      ]
    )
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  data () {
    return {
      value: '123'
    }
  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  },
  // template: `
  //   <comp-one ref="comp">
  //     <span ref="span">{{value}}</span>
  //   </comp-one>
  // `,
  render () {
    return this.$createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          props1: this.value
        },
        on: {
          click: this.handleClick
          // on里面的事件，会发送到$emit
        }
        // nativeOn: {
        //   click: this.handleClick
        // }
        // nativeOn里面的事件，不会发送到$emit，会自动绑定到此组件的根节点（也就是子组件component的div中）
      },
      [
        this.$createElement(
          'span',
          {
            ref: 'span',
            slot: 'header', // 可以理解为<span slot="header"></span>
            // domProps: {
            //   innerHTML: '<span>456</span>'// 会覆盖this.value
            // },
            attrs: {
              id: 'test-id'
            }
          },
          this.value
        )
      ]
    )
  }
})
