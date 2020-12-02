import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 当isDev为true时，为开发环境
    // vuex建议state数据的修改都要放在mutations里面进行，不要在外面进行修改（当然修改也是可以的）
    // 全局模块
    state: defaultState,
    mutations,
    getters,
    actions,
    // plugins: [
    //   (store) => {
    //     store.subscribe()
    //   }
    // ], 自定义插件
    modules: {
      // 模块a
      a: {
        namespaced: true, // 允许模块之间
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            state.text = text
          }
        },
        getters: {
          textPlus (state, getters, rootState) {
            return state.text + rootState.b.text
          }
        },
        actions: {
          add ({ state, commit, rootState }) {
            commit('updataCount', { num: 4567 }, { root: true })
            // 默认模块内的actions只能调用模块内的mutations
            // 添加root: true可以调用全局/其它模块的mutations
          }
        }
      },
      // 模块b
      b: {
        namespaced: true,
        state: {
          text: 2
        },
        actions: {
          testAction ({ commit }) {
            commit('a/updateText', 'test text', { root: true })
            // 调用其它模块的mutations，要添加root: true
          }
        }
      }
    }
  })
  // 实现store的模块的热更替
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
  // 实现store的模块的热更替
}
