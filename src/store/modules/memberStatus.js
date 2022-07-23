export const memberModules = {
  namespaced: true,
  state: {
    memberStatus: {
      id: null,
      account: '',
      username: '',
      email: '',
      phone: '',
      birthday: null,
      token: ''
    }
  },

  getters: {
    getToken(state) {
      if (!state.token) {
        state.memberStatus.token = localStorage.getItem('userInfo').token
      }
      return state.memberStatus.token
    }
  },

  mutations: {
    SET_USERSTATUS(state, payload) {
      console.log('memberStatus store', payload)
      state.memberStatus.id = payload.Info.ID
      state.memberStatus.account = payload.Info.Account
      state.memberStatus.username = payload.Info.Name
      state.memberStatus.email = payload.Info.Email
      state.memberStatus.phone = payload.Info.Phone
      state.memberStatus.birthday = payload.Info.Birthday
      state.memberStatus.token = payload.Token
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ id: payload.Info.ID, account: payload.Info.Account, username: payload.Info.Name, token: payload.Token })
      )
    },
    LOGOUT(state) {
      state.memberStatus = {
        id: null,
        account: '',
        username: '',
        email: '',
        phone: '',
        birthday: null,
        token: ''
      }
      localStorage.removeItem('userInfo')
    }
  },

  actions: {}
}
