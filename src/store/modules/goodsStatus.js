export const goodsModules = {
  namespaced: true,
  state: {
    goodsStatus: [],
    currentGoodsID: null
  },

  getters: {
    getGoodID(state) {
      if (state.currentGoodsID == null) {
        state.currentGoodsID = localStorage.getItem('goodsDetailID')
      }
      return state.currentGoodsID
    }
  },

  mutations: {
    SET_GOODSTATUS(state, payload) {
      console.log('goodsStatus store', payload)
      state.goodsStatus = [...payload]
      localStorage.setItem('goodsInfo', JSON.stringify([...payload]))
    },
    SET_GOODSDETAIL(state, payload) {
      state.currentGoodsID = payload
      localStorage.setItem('goodsDetailID', JSON.stringify(payload))
      console.log('goodsStatus store', payload)
    }
  },

  actions: {}
}
