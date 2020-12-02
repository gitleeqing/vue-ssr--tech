export default {
  updateCountAsync (store, data) {
    // 调用vuex里的原生方法store,接受外部传过来的参数 data = { num: 5, time: 2000 }
    setTimeout(() => {
      store.commit('updataCount', {
        // 调用store.js里的updataCount方法传递参数{num:5}
        num: data.num
      })
    }, data.time)
  }
}
