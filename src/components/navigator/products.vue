<template>
  <div class="products container">
    <guideLine :data="guideData" />
    <div class="goods-page">
      <ul>
        <li v-for="(item, i) in goodsTypeList" :key="i" @click="$router.push({ name: item.path })">{{ item.name }}</li>
      </ul>
      <div class="goods-list">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import guideLine from '@/components/guideLine.vue'
import { reactive } from 'vue'
export default {
  name: 'Products',
  components: {
    guideLine
  },
  setup() {
    const guideData = reactive([
      {
        label: '所有商品',
        to: '/products'
      }
    ])
    const goodsTypeList = reactive([
      {
        name: '所有商品',
        path: 'Goods'
      },
      {
        name: '熱銷排行',
        path: 'Hot'
      },
      {
        name: '戚風蛋糕',
        path: 'Chiffon'
      },
      {
        name: '杯子蛋糕',
        path: 'Cupcake'
      },
      {
        name: '馬卡龍',
        path: 'Macaron'
      },
      {
        name: '其他',
        path: 'Other'
      }
    ])
    return {
      goodsTypeList,
      guideData
    }
  }
}
</script>
