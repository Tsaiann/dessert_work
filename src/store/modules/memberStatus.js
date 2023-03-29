export const memberModules = {
  namespaced: true,
  state: {
    token: '',
    isLogin: false,
    memberStatus: {
      id: null,
      account: '',
      username: '',
      email: '',
      phone: ''
    },
    benefits: {
      level: '',
      nextLevel: '',
      nextLevelCash: ''
    }
  },

  getters: {
    getLogin(state) {
      if (localStorage.getItem('memberInfo') !== null) {
        state.isLogin = true
      }
      return state.isLogin
    },
    getID(state) {
      if (localStorage.getItem('memberInfo').id !== '') {
        state.id = JSON.parse(localStorage.getItem('memberInfo')).id
      }
      return state.id
    }
  },

  mutations: {
    SET_USERSTATUS(state, payload) {
      state.memberStatus.id = payload.Info.ID
      state.memberStatus.account = payload.Info.Account
      state.memberStatus.username = payload.Info.Name
      state.memberStatus.email = payload.Info.Email
      state.memberStatus.phone = payload.Info.Phone
      state.token = payload.Token
      state.isLogin = true
      localStorage.setItem(
        'memberInfo',
        JSON.stringify({ id: payload.Info.ID, account: payload.Info.Account, username: payload.Info.Name, token: payload.Token })
      )
    },
    SET_USERBENEFITS(state, payload) {
      state.benefits.level = payload.level
      state.benefits.nextLevel = payload.nextLevel
      state.benefits.nextLevelCash = payload.nextLevelCash
      localStorage.setItem('memberBenefits', JSON.stringify({ level: payload.level, nextLevel: payload.nextLevel, nextLevelCash: payload.nextLevelCash }))
    },
    LOGOUT(state) {
      state.token = ''
      state.isLogin = false
      state.memberStatus.id = null
      state.memberStatus.account = ''
      state.memberStatus.username = ''
      state.memberStatus.email = ''
      state.memberStatus.phone = ''
      localStorage.clear()
    }
  },

  actions: {}
}
