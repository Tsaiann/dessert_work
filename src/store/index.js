import { createStore } from 'vuex'
import { memberModules } from './modules/memberStatus'
import { goodsModules } from './modules/goodsStatus'

export default createStore({
  modules: {
    memberModules,
    goodsModules
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
})
