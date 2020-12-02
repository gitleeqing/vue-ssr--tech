import Vue from 'vue'

const component = {
  template: `
    <div :style="style">
      <slot></slot> // 给子组件component插入插槽slot
      <div class="header">
        <slot name="header"></slot> // 给子组件component插入具名插槽name="header"
      </div>
      <div class="footer">
        <slot name="footer"></slot> // 给子组件component插入具名插槽name="footer"
      </div>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      }
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
  template: `
    <div>
      <comp-one>
        // 向子组件插入DOM
        <span>this is content</span>
        <span slot="header">this is header</span>
        <span slot="footer">this is footer</span>
      </comp-one>
    </div>
  `

})
