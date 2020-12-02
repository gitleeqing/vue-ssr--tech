import Vue from 'vue'
/* eslint-disable */
new Vue({
  el: '#root',
  // <div v-bind:id="aaa" v-on:click="handleClick">
  // 绑定id                 绑定点击事件
  // v-html解析html语句  不使用v-html会自动识别为字符串
  // template: `
  //   <div :id="aaa" @click="handleClick">
  //     <p v-html="html"></p>
  //   </div>
  // `,
  // 这三种写法是一个意思
  // :class="[{ isActive ? active : '' }]"
  // :class="[{ active: isActive }]"
  // :class="{ active: isActive }"
  // vue会自动添加浏览器前缀 -webkit- -moz-
  // 后添加的样式会覆盖前面的样式
  // :style="[styles, styles2]"
  // 组件中可以写入简单的单句js表达式例如触发事件、传递参数
  // <p>{{getJoinedArr(arr)}}</p>
  template: `
    <div
      :class="[{ active: isActive }]"
      :style="[styles, styles2]"
    >
      <p>{{getJoinedArr(arr)}}</p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main',
    styles: {
      color: 'red',
      appearance: 'none'
    },
    styles2: {
      color: 'black'
    }
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  }
})
