<template>
  <div class="homepage container">
    <div class="row horizontal v_center" data-space-bottom="2rem">
      <i class="pi pi-user" style="font-size: 1.5rem"></i>
      <p data-space-left="1rem">ann110149</p>
      <div class="member-level">銅級會員</div>
    </div>
    <div class="row horizontal v_center" data-space-bottom="1rem">
      <i class="pi pi-pencil" style="font-size: 1rem"></i>
      <p data-space-left="1rem">編輯會員資料</p>
    </div>
    <div class="member-edit">
      <div class="member-detail">
        <p>姓名</p>
        <InputText type="text" v-model="state.memberForm.Name" />
      </div>
      <div class="member-detail">
        <p>電子郵件</p>
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
        <InputText type="password" />
      </div>
      <div class="member-detail" data-space-bottom="2rem">
        <p>再次確認新密碼</p>
        <InputText type="password" />
      </div>
      <hr />
      <div class="member-detail">
        <p>電子報</p>
        <div class="field-radiobutton">
          <RadioButton id="news1" name="news" value="true" v-model="state.memberForm.checked" />
          <label for="news1" data-space-left="0.5rem">訂閱</label>
        </div>
        <div data-space-left="2rem">
          <RadioButton id="news2" name="news" value="false" v-model="state.memberForm.checked" />
          <label for="news2" data-space-left="0.5rem">不訂閱</label>
        </div>
      </div>
      <span>訂閱商品/活動訊息，我們將不定期透過email通知最新商品活動及優惠訊息。</span>
      <div class="row horizontal" data-space-top="3rem">
        <button class="button_submit cancel" @click="handleReset">重新填寫</button>
        <button class="button_submit confirm">儲存變更</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { memberData } from '@/service/api'
import { callApi } from '@/utils/callApi'
import { resetForm } from '@/utils/resetForm'

export default {
  name: 'Homepage',
  setup() {
    const state = reactive({
      memberForm: {
        Account: '',
        Name: '',
        Email: '',
        Phone: '',
        Birthday: '',
        Address: '',
        checked: ''
      }
    })
    const getMemberData = onMounted(async () => {
      const data = ''
      await callApi(memberData, data, (res) => {
        state.memberForm.Account = res.data.Data.Account
        state.memberForm.Name = res.data.Data.Name
        state.memberForm.Email = res.data.Data.Email
        state.memberForm.Phone = res.data.Data.Phone
      })
    })
    const handleReset = () => {
      resetForm(state.memberForm)
    }
    return {
      state,
      getMemberData,
      handleReset
    }
  }
}
</script>
