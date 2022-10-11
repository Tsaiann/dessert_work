<template>
  <div class="container products">
    <guideLine :data="guideData" />
    <div class="goods-main">
      <div class="row horizontal center">
        <div data-width="70%" data-space-right="2rem" class="goods_galleria">
          <Galleria :value="state.imgList" :numVisible="state.imgList.length">
            <template #item="slotProps">
              <img :src="slotProps.item.url" :alt="slotProps.item.Ident" />
            </template>
            <template #thumbnail="slotProps">
              <img :src="slotProps.item.url" :alt="slotProps.item.Ident" />
            </template>
          </Galleria>
        </div>
        <div class="goods-main-content">
          <h2>{{ state.goodsData.Name }}</h2>
          <hr />
          <p>建議售價 NT{{ state.goodsData.UnitPrice }}</p>
          <div class="specs">
            <div class="row horizontal bottom_left" data-space-bottom="2rem">
              <h3 data-space-right="1rem">選擇規格</h3>
              <span>( 可選1種 )</span>
            </div>
            <input id="checkbox" type="checkbox" v-model="state.check" />
            <label for="checkbox" class="specs-customize">{{ state.specs }}</label>
          </div>
          <div>
            <h3>購買數量</h3>
            <div class="goods-main-content__count" data-space-left="1.5rem">
              <i class="pi pi-minus" @click="countChange('minus')"></i>
              <InputNumber class="p-inputtext-sm" v-model="state.count" />
              <i class="pi pi-plus" style="color: red" @click="countChange('plus')"></i>
            </div>
            <Textarea v-model="state.remark" rows="5" cols="30" data-width="100%" placeholder="有任何額外需求請打在此處" />
            <div class="like" v-if="state.like === false" @click="handleAddLike">
              <i class="pi pi-heart" data-space-left="1rem"></i>
              <span data-space-left="0.5rem">加入到收藏清單</span>
            </div>
            <div class="like_finish" v-else>
              <i class="pi pi-heart-fill" data-space-left="1rem"></i>
              <span data-space-left="0.5rem">已加入收藏清單</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row horizontal center" data-space-bottom="2rem" data-space-top="2rem">
        <button class="button_submit normal" data-width="50%" @click="addCart()">加入購物車</button>
        <button class="button_submit confirm" data-width="50%" @click="handleBuy()">直接購買</button>
      </div>
    </div>
    <div class="goods-data">
      <div class="row horizontal center" data-space-bottom="1rem">
        <h1 data-width="50%">商品詳細資訊</h1>
        <h1 data-width="50%" @click="$router.push({ name: 'Delivery' })">送貨及付款方式</h1>
      </div>
      <div class="wire"></div>
      <h2>商品詳細資訊</h2>
      <p style="white-space: pre-wrap">{{ state.goodsData.Description }}</p>
    </div>
    <div class="goods-about">
      <div>
        <h1 data-width="100%" data-space-bottom="1rem">相關產品</h1>
        <div class="wire"></div>
      </div>
      <div class="goods-about_item">
        <div class="row vertical center" @click="aboutGoodsRouter(10)">
          <img src="../../assets/goods/macaron02.jpg" alt="" />
          <h2>馬卡龍</h2>
          <p>NT 80</p>
        </div>
        <div class="row vertical center" @click="aboutGoodsRouter(7)">
          <img src="../../assets/goods/cupcake01.jpg" alt="" />
          <h2>杯子蛋糕</h2>
          <p>NT 70</p>
        </div>
        <div class="row vertical center" @click="aboutGoodsRouter(11)">
          <img src="../../assets/goods/macaronBox5-01.jpg" alt="" />
          <h2>馬卡龍禮盒 - 5入</h2>
          <p>NT 400</p>
        </div>
        <div class="row vertical center" @click="aboutGoodsRouter(8)">
          <img src="../../assets/goods/cupcakeBox4-01.jpg" alt="" />
          <h2>杯子蛋糕禮盒 - 4入</h2>
          <p>NT 280</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, inject, ref } from 'vue'
import { callApi } from '@/utils/callApi'
import { useStore } from 'vuex'
import { addGoodsCart, addLikeList, allLikeList, getImg, getGoodsList } from '@/service/api'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import guideLine from '@/components/guideLine.vue'

export default {
  name: 'GoodsDetail',
  components: {
    guideLine
  },
  setup() {
    const reload = inject('reload')
    const toast = useToast()
    const router = useRouter()
    const state = reactive({
      check: false,
      goodsData: [],
      imgList: [],
      specs: '',
      count: 1,
      remark: '',
      cartForm: {
        GoodsID: null,
        Specs: [
          {
            SpecID: null,
            Num: null
          }
        ]
      },
      like: false
    })
    //獲得該商品詳細資料
    const getGoodDetail = onMounted(() => {
      const data = { ID: localStorage.getItem('goodsDetailID') * 1 }
      callApi(getGoodsList, data, (res) => {
        state.goodsData = res.data.Data
        state.cartForm.GoodsID = state.goodsData.ID
        state.cartForm.Specs[0].SpecID = state.goodsData.GoodsSpecs[1].ID
        state.specs = state.goodsData.GoodsSpecs[1].Specs
        guideData[0].label = state.goodsData.Name
        getImg()
        likeStatus()
      })
    })
    const getImg = () => {
      for (let i in state.goodsData.ImageUrls) {
        const url = state.goodsData.ImageUrls[i].Url
        state.imgList.push({ url: process.env.VUE_APP_BASE_API + '/imgs/' + url })
      }
    }
    const guideData = reactive([
      {
        label: null,
        to: '/goodsDetail'
      }
    ])
    //需要的商品數量
    const countChange = (name) => {
      if (name === 'plus' && state.count < 99) {
        state.count += 1
      } else if (name === 'minus' && state.count > 1) {
        state.count -= 1
      }
    }
    //加入到購物車
    const addCart = async () => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo !== null) {
        if (state.check == true) {
          state.cartForm.Specs[0].Num = state.count
          const data = state.cartForm
          callApi(addGoodsCart, data, () => {
            toast.add({ severity: 'success', summary: '已加入購物車！', group: 'goods_addcart' })
          })
        } else {
          toast.add({ severity: 'error', summary: '請選擇規格', group: 'errorBox' })
        }
      } else {
        toast.add({ severity: 'error', summary: '請先登入會員！', group: 'errorBox' })
      }
    }
    //直接購買（跳轉結帳）
    const handleBuy = async () => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo !== null) {
        if (state.check == true) {
          state.cartForm.Specs[0].Num = state.count
          const data = state.cartForm
          await callApi(addGoodsCart, data, () => {
            router.push({ name: 'Cart' })
          })
          await reload()
        } else {
          toast.add({ severity: 'error', summary: '請選擇規格', group: 'errorBox' })
        }
      } else {
        toast.add({ severity: 'error', summary: '請先登入會員！', group: 'errorBox' })
      }
    }
    //加入到收藏清單
    const handleAddLike = () => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo !== null) {
        const data = { GoodsID: state.cartForm.GoodsID }
        callApi(addLikeList, data, () => {
          state.like = true
        })
      } else {
        toast.add({ severity: 'error', summary: '請先登入會員！', group: 'errorBox' })
      }
    }
    const onConfirm = () => {
      toast.removeGroup('goodsDetail')
      reload()
    }
    const likeStatus = () => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo === null) {
        return
      } else {
        const data = ''
        callApi(allLikeList, data, (res) => {
          console.log(res)
          for (let i in res.data.Data) {
            if (res.data.Data[i].GoodsID === state.cartForm.GoodsID) {
              state.like = true
            }
          }
        })
      }
    }
    const aboutGoodsRouter = (id) => {
      localStorage.setItem('goodsDetailID', id)
      router.push({ name: 'SpecsDetail' })
    }
    const test = () => {
      console.log(state.specsCheckedID)
    }
    return {
      state,
      getGoodDetail,
      guideData,
      likeStatus,
      onConfirm,
      handleAddLike,
      handleBuy,
      addCart,
      countChange,
      aboutGoodsRouter
    }
  }
}
</script>
