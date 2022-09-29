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
        level: JSON.parse(localStorage.getItem('userBenefits')).level,
        nextLevel: JSON.parse(localStorage.getItem('userBenefits')).nextLevel,
        nextLevelCash: JSON.parse(localStorage.getItem('userBenefits')).nextLevelCash
      }
    })
    //得到資料
    const getBenefitsData = onMounted(() => {
      const data = ''
      callApi(benefitsList, data, (res) => {
        state.benefits = { ...res.data.Data }
      })
    })
    return {
      state,
      getBenefitsData
    }
  }
}
</script>
