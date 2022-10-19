<template>
  <div class="discount container">
    <div class="discount-data">
      <h2>會員累積消費 - {{ state.userForm.level }}</h2>
      <p>NT ${{ state.benefits.Consumption }}</p>
      <div>
        <span :style="progress()"></span>
      </div>
      <span>再消費NT ${{ state.userForm.nextLevelCash }}即可升等為{{ state.userForm.nextLevel }}</span>
    </div>
    <div class="member-title">
      <div></div>
      <h2>優惠券</h2>
    </div>
    <p v-if="state.discount == 0">目前還沒有可以使用的優惠券</p>
    <div class="row horizontal space_between wrap">
      <div class="discount-coupon" v-for="(item, i) in state.benefits.DiscountTicket" :key="i">
        <div class="discount-coupon_header">
          <span></span>
        </div>
        <div class="discount-coupon_content">
          <h2>${{ item.Amount }}</h2>
          <p>單筆消費滿1000元即可使用一張</p>
          <p>單筆消費限用一張折價券</p>
          <p>使用期限：2022/12/31</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { benefitsList } from '@/service/api'
import { callApi } from '@/utils/callApi'

export default {
  name: 'Discount',
  setup() {
    const state = reactive({
      progress: 0,
      benefits: {},
      discount: 0,
      userForm: {
        level: JSON.parse(localStorage.getItem('memberBenefits')).level,
        nextLevel: JSON.parse(localStorage.getItem('memberBenefits')).nextLevel,
        nextLevelCash: JSON.parse(localStorage.getItem('memberBenefits')).nextLevelCash
      }
    })
    //得到資料
    const getBenefitsData = onMounted(() => {
      const data = ''
      callApi(benefitsList, data, (res) => {
        state.benefits = { ...res.data.Data }
        state.progress = 10000 / state.benefits.Consumption
        state.discount = state.benefits.DiscountTicket.length
        console.log(state.discount)
      })
    })
    const progress = () => {
      return `width: calc(100% / ${state.progress})`
    }
    return {
      state,
      getBenefitsData,
      progress
    }
  }
}
</script>
