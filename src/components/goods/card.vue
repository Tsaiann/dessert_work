<template>
  <div>
    <Toast position="center" />
    <div class="goods-detail_item">
      <img :src="list.ImageUrls[0].Url" alt="" />
      <div class="icon">
        <div class="row vertical center" @click="$router.push({ name: 'GoodsDetail' })">
          <i class="pi pi-search-plus" style="font-size: 1.4rem"></i>
          <p>查看商品</p>
        </div>
        <div class="row vertical center" @click="addCart()">
          <i class="pi pi-shopping-bag" style="font-size: 1.4rem"></i>
          <p>加入購物車</p>
        </div>
      </div>
      <h2>{{ list.Name }}</h2>
      <p>NT {{ list.UnitPrice }}</p>
    </div>
  </div>
</template>
<script>
import { addGoodsCart } from '@/service/api'
import { callApi } from '@/utils/callApi'
import { reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
export default {
  name: 'Card',
  props: {
    list: Object
  },
  setup(props) {
    const toast = useToast()
    const router = useRouter()
    const state = reactive({
      cartForm: {
        GoodsID: 37,
        ItemNum: 1,
        Specs: [
          {
            SpecID: 56,
            Num: 1
          }
        ]
      }
    })
    const goodsList = props.list
    const addCart = async () => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo !== null) {
        console.log(userInfo)
        const data = state.cartForm
        callApi(addGoodsCart, data, () => {
          toast.add({ severity: 'success', summary: '新增成功！', detail: 'Message Content' })
        })
      } else {
        toast.add({ severity: 'error', summary: '請先登入會員！', detail: 'Message Content' })
      }
    }
    return {
      goodsList,
      addCart,
      state
    }
  }
}
</script>
