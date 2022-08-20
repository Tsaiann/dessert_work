<template>
  <div>
    <div class="goods-title">
      <div></div>
      <h2>所有商品</h2>
    </div>
    <div class="goods-detail">
      <card v-for="(item, i) in state.goodsList" :key="i" :list="item" />
    </div>
    <Paginator :rows="9"></Paginator>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { getGoodsList } from '@/service/api'
import { callApi } from '@/utils/callApi'
import card from '@/components/goods/card'

export default {
  name: 'Goods',
  components: {
    card
  },
  setup() {
    const state = reactive({
      goodsList: [],
      goodsListSearch: {
        ID: 0,
        Page: 0,
        PageLimit: 0,
        GoodsName: '',
        GoodsType: 0
      }
    })
    const getAllGoodsList = onMounted(async () => {
      const data = state.goodsListSearch
      callApi(getGoodsList, data, (res) => {
        state.goodsList = [...res.data.Data]
        console.log(state.goodsList)
      })
    })
    return {
      getAllGoodsList,
      state
    }
  }
}
</script>
