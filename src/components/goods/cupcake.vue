<template>
  <div>
    <div class="goods-list-title">
      <div></div>
      <h2>杯子蛋糕</h2>
    </div>
    <div class="goods-detail">
      <card v-for="(item, i) in state.goodsList" :key="i" :list="item" />
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { getGoodsList } from 'services/api'
import { callApi } from 'utils/callApi'
import card from 'components/goods/card'

export default {
  name: 'Cupcake',
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
    const getAllGoodsList = onMounted(() => {
      state.goodsListSearch.GoodsType = 4
      const data = state.goodsListSearch
      callApi(getGoodsList, data, (res) => {
        state.goodsList = [...res.data.Data]
      })
    })
    return {
      state,
      getAllGoodsList
    }
  }
}
</script>
