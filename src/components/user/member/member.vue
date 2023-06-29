<template>
  <div class="member container">
    <guideLine :data="guideData" />
    <div class="member-page">
      <ul class="aside-menu">
        <li v-for="(item, i) in memberList" :key="i" @click="routerChange(item.name, item.path, item.to)">{{ item.name }}</li>
      </ul>
      <div class="member-list">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import guideLine from 'components/guideLine.vue'
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Member',
  components: {
    guideLine
  },
  setup() {
    const router = useRouter()
    const memberList = reactive([
      {
        name: '我的帳戶',
        path: 'Homepage',
        to: '/member/homepage'
      },
      {
        name: '訂單查詢',
        path: 'Order',
        to: '/member/order'
      },
      {
        name: '收藏清單',
        path: 'Like',
        to: '/member/like'
      },
      {
        name: '專屬優惠',
        path: 'Discount',
        to: '/member/discount'
      }
    ])
    const guideData = reactive([
      {
        label: '',
        to: router.currentRoute.value.fullPath
      }
    ])
    //根據當前路由來替換指引條的名稱
    const changeRouterName = onMounted(() => {
      for (let i in memberList) {
        if (memberList[i].path == router.currentRoute.value.name) {
          guideData[0].label = memberList[i].name
        }
      }
    })
    const routerChange = (name, path, to) => {
      guideData[0].label = name
      guideData[0].to = to
      router.push({ name: path })
    }
    return {
      memberList,
      guideData,
      changeRouterName,
      routerChange
    }
  }
}
</script>
