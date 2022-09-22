<template>
  <div class="like container">
    <Toast position="center" group="likeDelete">
      <template #message="slot">
        <div class="row horizontal">
          <div data-width="100%">
            <div class="row vertical center">
              <i class="pi pi-exclamation-circle" style="font-size: 3rem" data-space-bottom="1rem"></i>
              <h4>{{ slot.message.summary }}</h4>
              <nav></nav>
            </div>
            <div class="row horizontal center">
              <Button class="p-button-success" label="取消" @click="onReject()" data-space-right="1rem"></Button>
              <Button class="p-button-secondary" label="確定" @click="onConfirm(slot.message.ID)"></Button>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <div class="likeList" v-for="(item, i) in state.likeList" :key="i">
      <img :src="state.imgList[i]" alt="cake" data-space-right="2rem" @click="changeRouter(item.GoodsID)" />
      <div class="likeList_text" @click="changeRouter(item.GoodsID)">
        <h2>{{ item.Goods.Name }}</h2>
        <p>NT {{ item.Goods.UnitPrice }}</p>
      </div>
      <div class="row horizontal bottom_right" data-width="10%">
        <div class="iconList" @click="deleteLike(item.GoodsID)">
          <i class="pi pi-trash"></i>
          <span>刪除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { allLikeList, deleteLikeList, getImg } from '@/service/api'
import { callApi } from '@/utils/callApi'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

export default {
  name: 'Like',
  setup() {
    const state = reactive({
      likeList: [],
      imgList: [],
      cartForm: {
        GoodsID: null,
        Specs: []
      }
    })
    const router = useRouter()
    const toast = useToast()
    //獲得收藏清單列表
    const getLikeList = onMounted(() => {
      const data = ''
      callApi(allLikeList, data, (res) => {
        state.likeList = [...res.data.Data]
        state.imgList = []
        console.log(state.likeList)
        getLikeImg()
      })
    })
    //刪除商品
    const deleteLike = (id) => {
      toast.add({ severity: 'success', summary: '確定要刪除商品？', group: 'likeDelete', ID: id })
    }
    const onReject = () => {
      toast.removeGroup('likeDelete')
    }
    const onConfirm = async (id) => {
      const data = { GoodsID: id }
      await callApi(deleteLikeList, data, () => {
        toast.add({ severity: 'success', summary: '刪除成功！', group: 'goods_addcart' })
        toast.removeGroup('likeDelete')
      })
    }
    //獲得商品照片
    const getLikeImg = async () => {
      for (let i in state.likeList) {
        const data = { ident: state.likeList[i].Goods.ImagesIdnet }
        await callApi(getImg, data, (res) => {
          state.imgList.push(res.data.Data[0].Url)
        })
      }
    }
    //跳轉商品頁面
    const changeRouter = (id) => {
      localStorage.setItem('goodsDetailID', id)
      if (id === 47 || id === 48 || id === 49 || id === 50 || id === 51 || id === 52) {
        router.push({ name: 'SpecsDetail' })
      } else {
        router.push({ name: 'GoodsDetail' })
      }
    }
    return {
      state,
      getLikeList,
      deleteLike,
      onConfirm,
      onReject,
      getLikeImg,
      changeRouter
    }
  }
}
</script>
