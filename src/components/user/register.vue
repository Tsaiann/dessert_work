<template>
  <div class="register">
    <Toast position="center" />
    <div class="register-button">
      <span @click="$router.push({ name: 'Login' })">會員登入</span>
      <p>註冊會員</p>
    </div>
    <div class="register-data">
      <div>
        <p>姓名*</p>
        <InputText type="text" v-model="state.registerForm.name" placeholder="請輸入您的姓名" />
        <span v-if="v$.name.$error"> {{ '請輸入名字' }} </span>
      </div>
      <div>
        <p>電子郵件*</p>
        <InputText type="text" v-model="state.registerForm.email" placeholder="請輸入您的Email帳號" />
        <span v-if="v$.email.$error"> {{ '請輸入電子郵件' }} </span>
      </div>
      <div>
        <p>帳號*</p>
        <InputText type="text" v-model="state.registerForm.account" placeholder="請輸入最少6位以上" />
        <span v-if="v$.account.$error"> {{ '帳號請輸入最少6位以上' }} </span>
      </div>
      <div>
        <p>密碼*</p>
        <InputText type="password" v-model="state.registerForm.password" placeholder="請輸入最少8位以上" />
        <span v-if="v$.password.$error"> {{ '密碼請輸入最少8位以上' }} </span>
      </div>
      <div>
        <p>密碼確認*</p>
        <InputText type="password" v-model="state.registerForm.confirmPassword" placeholder="請再次輸入您的密碼" />
        <span v-if="v$.confirmPassword.$error"> {{ '請再次輸入密碼' }} </span>
      </div>
      <div>
        <p>聯絡電話*</p>
        <InputText type="number" v-model="state.registerForm.phone" placeholder="請輸入您的聯絡電話" />
        <span v-if="v$.phone.$error"> {{ '請輸入聯絡電話' }} </span>
      </div>
      <div class="row vertical center">
        <button @click="handleSubmit" class="button_confirm">加入會員</button>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed } from 'vue'
import { email, required, minLength, sameAs } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useToast } from 'primevue/usetoast'
import { createMember } from '@/service/api'
import { callApi } from '@/utils/callApi'
import { useRouter } from 'vue-router'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const toast = useToast()
    const rules = computed(() => {
      return {
        name: { required },
        account: { required, minLength: minLength(6) },
        email: { required, email },
        password: { required, minLength: minLength(8) },
        confirmPassword: { required, sameAs: sameAs(state.registerForm.password) },
        phone: { required, minLength: minLength(10) }
      }
    })
    const state = reactive({
      registerForm: {
        account: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      }
    })
    const v$ = useVuelidate(rules, state.registerForm)
    const handleSubmit = async () => {
      v$.value.$validate()
      const data = {
        Account: state.registerForm.account,
        Password: state.registerForm.password,
        Name: state.registerForm.name,
        Email: state.registerForm.email,
        Phone: state.registerForm.phone
      }
      if (!v$.value.$error) {
        await callApi(createMember, data, async () => {
          toast.add({ severity: 'success', summary: '註冊成功！', group: 'successBox' })
          await router.push({ name: 'Login' })
        }).catch(() => {
          toast.add({ severity: 'error', summary: '註冊失敗，請重新輸入', group: 'errorBox' })
        })
      } else {
        toast.add({ severity: 'error', summary: '註冊失敗，請重新輸入', group: 'errorBox' })
      }
    }
    return {
      state,
      v$,
      rules,
      handleSubmit
    }
  }
}
</script>
