<template>
  <div>
    <Toast position="center" />
    <Toast position="center" group="aa">
      <template #message="slotProps">
        <div class="row horizontal">
          <div data-width="100%">
            <div class="row vertical center" data-space-bottom="1rem">
              <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
              <h4>{{ slotProps.message.summary }}</h4>
            </div>
            <div class="row horizontal center">
              <Button class="p-button-success" label="是" @click="onConfirm()"></Button>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <div class="goods-detail_item">
      <img :src="list.ImageUrls[0].Url" alt="" />
      <div class="icon">
        <div class="row vertical center" @click="$router.push({ name: 'GoodsDetail' })">
          <i class="pi pi-search-plus" style="font-size: 1.4rem"></i>
          <p>查看商品</p>
        </div>
        <div class="row vertical center" @click="addCart(list)">
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
import { reactive, inject } from 'vue'
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
    const reload = inject('reload')
    const state = reactive({
      cartForm: {
        GoodsID: null,
        Specs: [
          {
            Num: 1
          }
        ]
      }
    })
    const goodsList = props.list
    // 增加進購物車
    const addCart = async (list) => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo !== null) {
        state.cartForm.GoodsID = list.ID
        state.cartForm.Specs[0].SpecID = list.GoodsSpecs[1].ID
        const data = state.cartForm
        await callApi(addGoodsCart, data, async () => {
          toast.add({ severity: 'success', summary: '已加入購物車！', group: 'aa' })
        })
      } else {
        toast.add({ severity: 'error', summary: '請先登入會員！', detail: 'Message Content' })
      }
    }
    const onConfirm = async () => {
      await reload()
      toast.removeGroup('bc')
    }
    return {
      goodsList,
      addCart,
      state,
      reload,
      onConfirm
    }
  }
}
</script>
