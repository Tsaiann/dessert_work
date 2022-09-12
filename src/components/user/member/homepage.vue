<template>
  <div class="homepage container">
    <Toast position="center" group="bc">
      <template #message="slotProps">
        <div class="row horizontal flex flex-column">
          <div data-width="100%">
            <div class="row vertical center" data-space-bottom="1rem">
              <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
              <h4>{{ slotProps.message.summary }}</h4>
              <p>{{ slotProps.message.detail }}</p>
            </div>
            <div class="row horizontal center">
              <Button class="p-button-success" label="確定" @click="onConfirm" data-space-right="1rem"></Button>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <div class="row horizontal v_center" data-space-bottom="2rem">
      <i class="pi pi-user" style="font-size: 1.5rem"></i>
      <p data-space-left="1rem">{{ state.memberForm.account }}</p>
      <div class="member-level">銅級會員</div>
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
        <p>再次確認新密碼</p>
        <InputText type="password" v-model="state.pwdConfirm" />
      </div>
      <hr />
      <div class="member-detail">
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
import { memberData, updateMemberData } from '@/service/api'
import { callApi } from '@/utils/callApi'
import { resetForm } from '@/utils/resetForm'
import { useToast } from 'primevue/usetoast'
import { email, required, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

export default {
  name: 'Homepage',
  setup() {
    const reload = inject('reload')
    const toast = useToast()
    const state = reactive({
      memberForm: {
        account: '',
        Name: '',
        Email: '',
        Phone: '',
        Birthday: null,
        Address: '',
        Password: ''
      },
      checked: true,
      pwdConfirm: ''
    })
    const rules = computed(() => {
      return {
        Name: { required },
        Email: { required, email },
        Password: { minLength: minLength(8) }
      }
    })
    const v$ = useVuelidate(rules, state.memberForm)
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
    const handleReset = () => {
      resetForm(state.memberForm)
      getMemberData()
    }
    const handleMemberUpdate = async () => {
      v$.value.$validate()
      const data = state.memberForm
      if (!v$.value.$error && state.memberForm.Name !== '' && state.memberForm.Email !== '') {
        if (state.memberForm.Password !== state.pwdConfirm) {
          toast.add({ severity: 'error', summary: '所輸入的確認密碼有誤，請重新輸入', detail: 'Message Content' })
        } else {
          callApi(updateMemberData, data, () => {
            getMemberData()
            toast.add({ severity: 'success', summary: '更新成功！', detail: 'Message Content', group: 'bc' })
          })
        }
      } else {
        toast.add({ severity: 'error', summary: '必填欄位不可為空或填寫錯誤', detail: 'Message Content' })
        resetForm(state.registerForm)
      }
    }
    const onConfirm = () => {
      reload()
    }
    return {
      state,
      getMemberData,
      handleReset,
      handleMemberUpdate,
      v$,
      rules,
      onConfirm
    }
  }
}
</script>
