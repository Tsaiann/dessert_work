<template>
  <div>
    <div class="goods-list-title">
      <div></div>
      <h2>所有商品</h2>
    </div>
    <div class="goods-detail">
      <card v-for="(item, i) in state.goodsList" :key="i" :list="item" />
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { getGoodsList } from '@/service/api'
import { callApi } from '@/utils/callApi'
import card from '@/components/goods/card'
import { useRouter } from 'vue-router'

export default {
  name: 'Goods',
  components: {
    card
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      goodsList: [],
      search: router.currentRoute.value.params.search,
      goodsListSearch: {
        GoodsName: ''
      }
    })
    const getAllGoodsList = onMounted(async () => {
      if (state.search === undefined) {
        const data = state.goodsListSearch
        callApi(getGoodsList, data, (res) => {
          state.goodsList = [...res.data.Data]
        })
      } else {
        state.goodsListSearch.GoodsName = state.search
        const data = state.goodsListSearch
        callApi(getGoodsList, data, (res) => {
          state.goodsList = [...res.data.Data]
        })
      }
    })
    return {
      getAllGoodsList,
      state
    }
  }
}
</script>
