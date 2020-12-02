import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{name}}</p>//这里显示的是computed中的name
      <p>Name: {{getName()}}</p>//这里调用的是methods中的getName()方法
      <p>Number: {{number}}</p>
      <p>FullName: {{fullName}}</p>
      <p><input type="text" v-model="number"></p>
      <p>FirstName: <input type="text" v-model="firstName"></p>
      <p>LastName: <input type="text" v-model="lastName"></p>
      <p>Name: <input type="text" v-model="name"></p> //这里双向绑定的是computed中的name
      <p>Obj.a: <input type="text" v-model="obj.a"></p>
    </div>
  `,
  data: {
    firstName: 'Jokcy',
    lastName: 'Lou',
    number: 0,
    fullName: '',
    obj: {
      a: 0
    }
  },
  computed: {
    // computed会反复使用缓存的数据，只有firstName、lastName发生改变时，才会重新调用
    // 在computed中可以拼接成新的数据、利用数据执行事件
    // 但不要在computed中试图改变data中的原有数据
    name: {
      get () { // 获得数据
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set (name) { // 使用数据
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]// 改变data中的数据，不建议这样做
      }
    }
  },
  watch: {
    'obj.a': { // 只监听boj下的a属性，只有a属性的值发生变化时，才会触发handler方法
      handler (newName, oldName) {
        console.log(`obj.a changed ${newName} ${oldName}`)
        this.fullName = newName
        // this.obj.a += 1//不要在watch中试图改变本身监听的属性
      },
      immediate: true // 初始化时，会执行一次handler方法
      // deep: true // 会监听obj中的所有属性，在obj中遍历一次
    }
  },
  methods: {
    // methods中的方法每次data中的数据发生改变就会重新调用一次
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
