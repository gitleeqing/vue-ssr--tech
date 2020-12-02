import Vue from 'vue'

const component = {
  template: `
    <div :style="style">
      <slot :value='value' :aaa='111'></slot> // 在子组件的插槽中给父组件传入属性，属性会保存在props上，形成对象（作用域插槽）
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: '子组件'
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
      value: '父组件',
      style: {
        color: 'blue'
      }
    }
  },
  mounted () {
    console.log(this.$refs.comp.style.width, this.$refs.span)
    // this.$refs.comp输出子组件VueComponent
    // this.$refs.comp.style.width输出子组件component下的属性值
    // this.$refs.span输出dom节点<span>component value 111 123</span>
  },
  template: `
    <div>
      <comp-one ref="comp">
        // 在父组件中，DOM接收子组件传递过来的props对象，并将属性值显示出来
        <span ref="span" :style="style" slot-scope="props">{{props.aaa}} {{props.value}} {{value}}</span>
      </comp-one>
    </div>
  `

})
