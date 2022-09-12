import { createStore } from 'vuex'
import { memberModules } from './modules/memberStatus'
import { goodsModules } from './modules/goodsStatus'
import { cartModules } from './modules/cartStatus'

export default createStore({
  modules: {
    memberModules,
    goodsModules,
    cartModules
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
})
