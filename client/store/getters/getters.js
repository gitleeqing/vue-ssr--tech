export default {
  // 调用state.js里的初始化数据作为参数，return字符串
  fullName (state) {
    return `${state.firstName} ${state.lastName}`
  }
}
