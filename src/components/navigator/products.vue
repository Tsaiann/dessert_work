<template>
  <div class="products container">
    <guideLine :data="guideData" />
    <div class="goods-page">
      <ul>
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
import { reactive } from 'vue'
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
        label: '所有商品',
        to: '/products/goods'
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
    const routerChange = (name, path, to) => {
      guideData[0].label = name
      guideData[0].to = to
      router.push({ name: path })
    }
    return {
      goodsTypeList,
      guideData,
      routerChange
    }
  }
}
</script>
