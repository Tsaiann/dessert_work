<template>
  <div class="login">
    <Toast position="center" />
    <div class="login-button">
      <span>會員登入</span>
      <p @click="$router.push({ name: 'Register' })">註冊會員</p>
    </div>
    <div class="login-data">
      <p>帳號</p>
      <InputText type="text" v-model="state.memberForm.account" placeholder="請輸入您的帳號" />
      <p>密碼</p>
      <InputText type="password" v-model="state.memberForm.password" placeholder="請輸入您的密碼" />
      <div class="otp">
        <InputText type="text" v-model="state.memberForm.otp" />
        <span>{{ otp.OTP }}</span>
      </div>
      <div class="submit">
        <button class="button_confirm" @click="hanleLogin">登入</button>
      </div>
    </div>
  </div>
</template>
<script>
import Toast from 'primevue/toast'
import { reactive, onMounted, inject } from 'vue'
import { getOtp, login, getGoodsList } from 'services/api'
import { callApi } from 'utils/callApi'
import { useRouter } from 'vue-router'
import { resetForm } from 'utils/resetForm'
import { useToast } from 'primevue/usetoast'
import { useStore } from 'vuex'

export default {
  name: 'Login',
  components: {
    Toast
  },
  setup() {
    const reload = inject('reload')
    const toast = useToast()
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      memberForm: {
        account: '',
        password: '',
        otp: ''
      },
      checked: false
    })
    let otp = reactive({ OTP: '' })
    //取得otp
    const callOtp = onMounted(async () => {
      const data = ''
      await callApi(getOtp, data, (res) => {
        otp.OTP = res.data.Data.OTP
      })
    })
    //登入會員
    const hanleLogin = async () => {
      if (state.memberForm.account && state.memberForm.password && state.memberForm.otp) {
        await callApi(login, state.memberForm, async (res) => {
          store.commit('memberModules/SET_USERSTATUS', res.data.Data)
          const data = { GoodsName: '' }
          await callApi(getGoodsList, data, (res) => {
            store.commit('goodsModules/SET_GOODSTATUS', res.data.Data)
          })
          await router.push({ name: 'Member' })
          await reload()
        }).catch(() => {
          toast.add({ severity: 'error', summary: '輸入錯入，請重新輸入！', group: 'errorBox' })
          removeLogin()
          callOtp()
        })
      } else {
        toast.add({ severity: 'error', summary: '欄位不可為空！', group: 'errorBox' })
        removeLogin()
        callOtp()
      }
    }
    // 清除欄位
    const removeLogin = () => {
      resetForm(state.memberForm)
    }
    return {
      state,
      otp,
      callOtp,
      hanleLogin,
      removeLogin
    }
  }
}
</script>
