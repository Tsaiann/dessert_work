<template>
  <div class="products container">
    <guideLine :data="guideData" />
    <div class="goods-page">
      <ul class="aside-menu">
        <li v-for="(item, i) in goodsTypeList" :key="i" @click="routerChange(item.name, item.path, item.to)">{{ item.name }}</li>
      </ul>
      <div class="goods-list">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import guideLine from '@/components/guideLine.vue'
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Products',
  components: {
    guideLine
  },
  setup() {
    const router = useRouter()
    const guideData = reactive([
      {
        label: '',
        to: router.currentRoute.value.fullPath
      }
    ])
    const goodsTypeList = reactive([
      {
        name: '所有商品',
        path: 'Goods',
        to: '/products/goods'
      },
      {
        name: '熱銷排行',
        path: 'Hot',
        to: '/products/hot'
      },
      {
        name: '戚風蛋糕',
        path: 'Chiffon',
        to: '/products/chiffon'
      },
      {
        name: '杯子蛋糕',
        path: 'Cupcake',
        to: '/products/cupcake'
      },
      {
        name: '馬卡龍',
        path: 'Macaron',
        to: '/products/macaron'
      },
      {
        name: '其他',
        path: 'Other',
        to: '/products/other'
      }
    ])
    //點擊跳轉頁面
    const routerChange = (name, path, to) => {
      guideData[0].label = name
      guideData[0].to = to
      router.push({ name: path })
    }
    //根據當前路由來替換指引條的名稱
    const changeRouterName = onMounted(() => {
      for (let i in goodsTypeList) {
        if (goodsTypeList[i].path == router.currentRoute.value.name) {
          guideData[0].label = goodsTypeList[i].name
        }
      }
    })
    return {
      changeRouterName,
      goodsTypeList,
      guideData,
      routerChange
    }
  }
}
</script>
