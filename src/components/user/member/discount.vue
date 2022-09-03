<template>
  <div class="discount container">
    <div class="discount-data">
      <h2>會員累積消費 - {{ state.userForm.level }}</h2>
      <p>NT ${{ state.benefits.Consumption }}</p>
      <div>
        <span></span>
      </div>
      <span>再消費NT ${{ state.userForm.nextLevelCash }}即可升等為{{ state.userForm.nextLevel }}</span>
    </div>
    <div class="row horizontal space_between wrap">
      <div class="discount-coupon">
        <div class="discount-coupon_header">
          <span></span>
        </div>
        <div class="discount-coupon_content">
          <h2>NT $100</h2>
          <p>單筆消費滿500元即可使用一張</p>
          <p>單筆消費限用一張折價券</p>
          <p>使用期限：2022/12/31</p>
        </div>
      </div>
      <div class="discount-coupon">
        <div class="discount-coupon_header">
          <span></span>
        </div>
        <div class="discount-coupon_content">
          <h2>NT $100</h2>
          <p>單筆消費滿500元即可使用一張</p>
          <p>單筆消費限用一張折價券</p>
          <p>使用期限：2022/12/31</p>
        </div>
      </div>
      <div class="discount-coupon">
        <div class="discount-coupon_header">
          <span></span>
        </div>
        <div class="discount-coupon_content">
          <h2>NT $100</h2>
          <p>單筆消費滿500元即可使用一張</p>
          <p>單筆消費限用一張折價券</p>
          <p>使用期限：2022/12/31</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { benefitsList } from '@/service/api'
import { callApi } from '@/utils/callApi'

export default {
  name: 'Discount',
  setup() {
    const state = reactive({
      benefits: {},
      userForm: {
        level: '',
        nextLevel: '',
        nextLevelCash: ''
      }
    })
    const getBenefitsData = onMounted(() => {
      const data = ''
      callApi(benefitsList, data, (res) => {
        state.benefits = { ...res.data.Data }
        console.log(state.benefits)
        levelChange()
      })
    })
    const levelChange = () => {
      const total = state.benefits.Consumption
      if (total < 5000) {
        state.userForm.level = ' 銅級會員'
        state.userForm.nextLevel = '銀級會員'
        state.userForm.nextLevelCash = 5000 - total
      } else if (total < 10000 && total >= 5000) {
        state.userForm.state.level = ' 銀級會員'
        state.userForm.nextLevel = '金級會員'
        state.userForm.nextLevelCash = 10000 - total
      } else if (total < 20000 && total >= 1000) {
        state.userForm.state.level = ' 金級會員'
        state.userForm.nextLevel = '白金會員'
        state.userForm.nextLevelCash = 20000 - total
      } else {
        state.userForm.state.level = ' 白金會員'
      }
    }
    return {
      state,
      getBenefitsData
    }
  }
}
</script>
