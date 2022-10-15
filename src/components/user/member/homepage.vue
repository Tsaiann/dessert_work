<template>
  <div class="homepage container">
    <div class="row horizontal v_center" data-space-bottom="2rem">
      <i class="pi pi-user" style="font-size: 1.5rem"></i>
      <p data-space-left="1rem">{{ state.memberForm.account }}</p>
      <div class="member-level">{{ state.benefitsList.level }}</div>
    </div>
    <div class="row horizontal v_center" data-space-bottom="1rem">
      <i class="pi pi-pencil" style="font-size: 1rem"></i>
      <p data-space-left="1rem">編輯會員資料</p>
    </div>
    <div class="member-edit">
      <div class="member-detail">
        <p>姓名*</p>
        <InputText type="text" v-model="state.memberForm.Name" />
      </div>
      <div class="member-detail">
        <p>電子郵件*</p>
        <InputText type="text" v-model="state.memberForm.Email" />
      </div>
      <div class="member-detail">
        <p>聯絡電話</p>
        <InputText type="text" v-model="state.memberForm.Phone" />
      </div>
      <div class="member-detail">
        <p>出生日期</p>
        <InputText type="text" v-model="state.memberForm.Birthday" />
      </div>
      <div class="member-detail" data-space-bottom="2rem">
        <p>寄件地址</p>
        <InputText type="text" v-model="state.memberForm.Address" />
      </div>
      <hr />
      <p>如若不需更改密碼，請直接留空</p>
      <div class="member-detail">
        <p>原始密碼</p>
        <InputText type="password" />
      </div>
      <div class="member-detail">
        <p>設定新密碼</p>
        <InputText type="password" v-model="state.memberForm.Password" />
      </div>
      <div class="member-detail" data-space-bottom="2rem">
        <p>確認新密碼</p>
        <InputText type="password" v-model="state.pwdConfirm" />
      </div>
      <hr />
      <div class="member-detail_exception">
        <p>電子報</p>
        <div class="field-radiobutton">
          <RadioButton id="news1" name="news" :value="true" v-model="state.checked" />
          <label for="news1" data-space-left="0.5rem">訂閱</label>
        </div>
        <div data-space-left="2rem">
          <RadioButton id="news2" name="news" :value="false" v-model="state.checked" />
          <label for="news2" data-space-left="0.5rem">不訂閱</label>
        </div>
      </div>
      <span>訂閱商品/活動訊息，我們將不定期透過email通知最新商品活動及優惠訊息。</span>
      <div class="row horizontal" data-space-top="3rem">
        <button class="button_submit cancel" @click="handleReset" data-space-right="1rem">重新填寫</button>
        <button class="button_submit confirm" @click="handleMemberUpdate">儲存變更</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed, inject } from 'vue'
import { memberData, updateMemberData, benefitsList } from '@/service/api'
import { callApi } from '@/utils/callApi'
import { resetForm } from '@/utils/resetForm'
import { useToast } from 'primevue/usetoast'
import { email, required, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useStore } from 'vuex'

export default {
  name: 'Homepage',
  setup() {
    const reload = inject('reload')
    const toast = useToast()
    const store = useStore()
    const state = reactive({
      memberForm: {
        account: '',
        Name: '',
        Email: '',
        Phone: '',
        Birthday: '',
        Address: '',
        Password: ''
      },
      checked: true,
      pwdConfirm: '',
      benefits: {},
      benefitsList: {
        level: '',
        nextLevel: '',
        nextLevelCash: ''
      }
    })
    const rules = computed(() => {
      return {
        Name: { required },
        Email: { required, email },
        Password: { minLength: minLength(8) }
      }
    })
    const v$ = useVuelidate(rules, state.memberForm)
    //取得該會員資料
    const getMemberData = onMounted(async () => {
      const data = ''
      await callApi(memberData, data, (res) => {
        state.memberForm.Name = res.data.Data.Name
        state.memberForm.Email = res.data.Data.Email
        state.memberForm.Phone = res.data.Data.Phone
        state.memberForm.Address = res.data.Data.Address
        state.memberForm.account = res.data.Data.Account
      })
    })
    //重新填寫會員資料
    const handleReset = () => {
      resetForm(state.memberForm)
      getMemberData()
    }
    //會員資料更新
    const handleMemberUpdate = async () => {
      v$.value.$validate()
      const data = state.memberForm
      if (!v$.value.$error && state.memberForm.Name !== '' && state.memberForm.Email !== '') {
        if (state.memberForm.Password !== state.pwdConfirm) {
          toast.add({ severity: 'error', summary: '輸入錯入，請重新輸入！', group: 'errorBox' })
        } else {
          callApi(updateMemberData, data, () => {
            getMemberData()
            toast.add({ severity: 'success', summary: '更新成功！', group: 'goods_addcart' })
          })
        }
      } else {
        toast.add({ severity: 'error', summary: '必填欄位填寫錯誤', group: 'errorBox' })
        resetForm(state.registerForm)
      }
    }
    const onConfirm = () => {
      reload()
    }
    //得到優惠券資料
    const getBenefitsData = onMounted(() => {
      const data = ''
      callApi(benefitsList, data, (res) => {
        state.benefits = { ...res.data.Data }
        levelChange()
      })
    })
    //根據消費金額確認會員等級
    const levelChange = () => {
      const total = state.benefits.Consumption
      if (total < 5000) {
        state.benefitsList.level = ' 銅級會員'
        state.benefitsList.nextLevel = '銀級會員'
        state.benefitsList.nextLevelCash = 5000 - total
        store.commit('memberModules/SET_USERBENEFITS', state.benefitsList)
      } else if (total < 10000 && total >= 5000) {
        state.benefitsList.level = ' 銀級會員'
        state.benefitsList.nextLevel = '金級會員'
        state.benefitsList.nextLevelCash = 10000 - total
        store.commit('memberModules/SET_USERBENEFITS', state.benefitsList)
      } else if (total < 20000 && total >= 10000) {
        state.benefitsList.state.level = ' 金級會員'
        state.benefitsList.nextLevel = '白金會員'
        state.benefitsList.nextLevelCash = 20000 - total
        store.commit('memberModules/SET_USERBENEFITS', state.benefitsList)
      } else {
        state.benefitsList.state.level = ' 白金會員'
        store.commit('memberModules/SET_USERBENEFITS', state.benefitsList)
      }
    }
    return {
      state,
      getMemberData,
      handleReset,
      handleMemberUpdate,
      v$,
      rules,
      onConfirm,
      getBenefitsData
    }
  }
}
</script>
