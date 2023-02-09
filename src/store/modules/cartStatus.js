export const cartModules = {
  namespaced: true,
  state: {
    cartStatus: {
      payment: '',
      delivery: '',
      recipient: '',
      phone: '',
      addr: '',
      total: '',
      mark: '',
      discount: []
    }
  },

  getters: {
    getCartInfo(state) {
      if (localStorage.getItem('cartInfo') !== null) {
        state.cartStatus.payment = JSON.parse(localStorage.getItem('cartInfo')).payment
        state.cartStatus.delivery = JSON.parse(localStorage.getItem('cartInfo')).delivery
        state.cartStatus.recipient = JSON.parse(localStorage.getItem('cartInfo')).recipient
        state.cartStatus.phone = JSON.parse(localStorage.getItem('cartInfo')).phone
        state.cartStatus.addr = JSON.parse(localStorage.getItem('cartInfo')).addr
      }
      return state.cartStatus
    },
    getTotal(state) {
      if (localStorage.getItem('cartTotal').total !== '') {
        state.cartStatus.total = JSON.parse(localStorage.getItem('cartTotal')).total
      }
      return state.cartStatus.total
    }
  },

  mutations: {
    SET_CARTPAYMENT(state, payload) {
      console.log('cartPayment store', payload)
      state.cartStatus.payment = payload.paymentValue
      state.cartStatus.delivery = payload.deliveryValue
      state.cartStatus.discount.push(payload.discountID[0])
      localStorage.setItem('cartInfo', JSON.stringify({ payment: payload.paymentValue, delivery: payload.deliveryValue, discount: payload.discountID[0] }))
    },
    SET_CARTTOTAL(state, payload) {
      state.cartStatus.total = payload
      localStorage.setItem('cartTotal', JSON.stringify({ total: payload }))
    },
    SET_CARTINFO(state, payload) {
      state.cartStatus.payment = payload.PaymentMethod
      state.cartStatus.delivery = payload.DeliveryMethod
      state.cartStatus.recipient = payload.Recipient
      state.cartStatus.phone = payload.Phone
      state.cartStatus.addr = payload.Addr
      state.cartStatus.mark = payload.OrderMark
      localStorage.setItem(
        'cartInfo',
        JSON.stringify({
          payment: payload.PaymentMethod,
          delivery: payload.DeliveryMethod,
          recipient: payload.Recipient,
          phone: payload.Phone,
          addr: payload.Addr,
          mark: payload.OrderMark
        })
      )
    }
  },

  actions: {}
}
