<template>
  <div class="member container">
    <guideLine :data="guideData" />
    <div class="member-page">
      <ul>
        <li v-for="(item, i) in memberList" :key="i" @click="$router.push({ name: item.path })">{{ item.name }}</li>
      </ul>
      <div class="member-list">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import guideLine from '@/components/guideLine.vue'
import { reactive } from 'vue'
export default {
  name: 'Member',
  components: {
    guideLine
  },
  setup() {
    const memberList = reactive([
      {
        name: '我的帳戶',
        path: 'Homepage'
      },
      {
        name: '訂單查詢',
        path: 'Order'
      },
      {
        name: '收藏清單',
        path: 'Like'
      },
      {
        name: '詢問紀錄',
        path: 'Ask'
      },
      {
        name: '專屬優惠',
        path: 'Discount'
      }
    ])
    const guideData = reactive([
      {
        label: '會員專區',
        to: '/member'
      }
    ])
    return {
      memberList,
      guideData
    }
  }
}
</script>
