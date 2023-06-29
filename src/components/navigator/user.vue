<template>
  <div class="user container">
    <guideLine :data="guideData" />
    <div class="user-page">
      <router-view />
    </div>
  </div>
</template>

<script>
import guideLine from 'components/guideLine.vue'
import { reactive } from 'vue'

export default {
  name: 'User',
  components: {
    guideLine
  },
  setup() {
    const guideData = reactive([
      {
        label: '會員登入與註冊',
        to: '/user'
      }
    ])
    return {
      guideData
    }
  }
}
</script>
