import Vue from 'vue'
// v-text（一般不会使用，直接使用{{text}}） v-html
// v-pre(不会解析表达式)
// v-once(只执行一次数据显示)

// v-if v-else-if v-else 一起组合使用

// v-model双向绑定
// 修饰符.number自动转化为数字 .trim删除首尾空格 .lazy(input失去焦点后，才会改变data中的数据)

// v-for(在数组中遍历，返回值、索引) :key="item"与之前的item进行比较，如相同则不会重新添加dom节点，所以这里一般绑定数据的id
// v-for(在对象中遍历，返回键、值、索引)
new Vue({
  el: '#root',
  template: `
    <div>
      <div>Text: {{text}}</div>
      <div v-html="html"></div>
      <div v-if="text === 0">text: 0</div>
      <div v-else-if="text === 1">text: 1</div>
      <div v-else>else text</div>
      <input text="text" v-model.lazy="text">
      <input type="checkbox" v-model="active">
      <div>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
      </div>
      <div>
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked">
      </div>
      <ul>
        <li v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</li>
      </ul>
      <ul>
        <li v-for="(val, key, index) in obj">{{val}}:{{key}}:{{index}}</li>
      </ul>
    </div>
  `,
  data: {
    arr: [2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: '',
    text: 0,
    active: false,
    html: '<span>this is html</span>'
  }
})
