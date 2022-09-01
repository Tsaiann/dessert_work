<template>
  <div class="like container">
    <Toast position="center" group="bc" @close="onReject">
      <template #message="slotProps">
        <div class="row horizontal flex flex-column">
          <div data-width="100%">
            <div class="row vertical center" data-space-bottom="1rem">
              <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
              <h4>{{ slotProps.message.summary }}</h4>
              <p>{{ slotProps.message.detail }}</p>
            </div>
            <div class="row horizontal center">
              <Button class="p-button-success" label="是" @click="onConfirm(slotProps.message.ID)" data-space-right="1rem"></Button>
              <Button class="p-button-secondary" label="否" @click="onReject"></Button>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <Paginator :rows="5" :totalRecords="state.likeList.length" :rowsPerPageOptions="[5, 10, 15]"></Paginator>
    <div class="likeList" v-for="(item, i) in state.likeList" :key="i">
      <img :src="imgList[i]" alt="cake" data-space-right="2rem" />
      <div>
        <h2>{{ item.Goods.Name }}</h2>
        <p>NT {{ item.Goods.UnitPrice }}</p>
      </div>
      <div class="row horizontal bottom_right">
        <div class="iconList" @click="$router.push({ name: 'GoodsDetail' })">
          <i class="pi pi-shopping-cart"></i>
          <span>加入購物車</span>
        </div>
        <div class="iconList" @click="deleteLike(item.GoodsID)">
          <i class="pi pi-trash"></i>
          <span>刪除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { allLikeList, deleteLikeList, getImg } from '@/service/api'
import { callApi } from '@/utils/callApi'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

export default {
  name: 'Like',
  setup() {
    const state = reactive({
      likeList: []
    })
    const router = useRouter()
    const toast = useToast()
    const imgList = ref([])
    //獲得收藏清單列表
    const getLikeList = onMounted(() => {
      const data = ''
      callApi(allLikeList, data, (res) => {
        state.likeList = [...res.data.Data]
        console.log(state.likeList)
        getLikeImg()
      })
    })
    const deleteLike = (id) => {
      toast.add({ severity: 'warn', summary: '確定要刪除商品？', group: 'bc', ID: id })
    }
    const onReject = () => {
      toast.removeGroup('bc')
    }
    const onConfirm = async (id) => {
      const data = { GoodsID: id }
      await callApi(deleteLikeList, data, () => {
        toast.add({ severity: 'success', summary: '已刪除', detail: 'Message Content' })
        toast.removeGroup('bc')
        getLikeList()
      })
    }
    const getLikeImg = () => {
      imgList.value = []
      for (let i in state.likeList) {
        const data = { ident: state.likeList[i].Goods.ImagesIdnet }
        callApi(getImg, data, (res) => {
          imgList.value.push(res.data.Data[0].Url)
        })
      }
    }
    return {
      state,
      getLikeList,
      deleteLike,
      onConfirm,
      onReject,
      getLikeImg,
      imgList
    }
  }
}
</script>
