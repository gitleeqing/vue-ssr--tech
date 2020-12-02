export default {
  // state初始数据，num接受传递过来的参数
  // vuex规定在mutations里的方法只可以接受两个参数
  updataCount (state, { num, num2 }) {
    console.log(num2)
    state.count = num
  }
}
