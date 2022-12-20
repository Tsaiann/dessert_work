export const memberModules = {
  namespaced: true,
  state: {
    token: '',
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
    getToken(state) {
      if (!state.token) {
        state.token = localStorage.getItem('memberInfo').token
      }
      return state.token
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
