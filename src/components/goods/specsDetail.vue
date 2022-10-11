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
          <div class="specs_exception">
            <div class="row horizontal bottom_left" data-space-bottom="1.5rem">
              <h3 data-space-right="1rem">選擇規格</h3>
              <span>( 最多可選{{ state.specsCount }}種 )</span>
            </div>
            <div class="field-checkbox">
              <div v-for="(item, i) in state.newGoodsData" :key="i" class="field-checkbox-item">
                <input :id="item.ID" type="checkbox" name="specs" :value="item.ID" v-model="state.allSpecsCheckedID" @click="handleSpecsMax($event)" />
                <label :for="item.ID">{{ item.Specs }}</label>
                <input class="specsCount" type="number" v-model="item.Num" max="99" min="1" />
              </div>
            </div>
          </div>
          <div>
            <h3>購買數量</h3>
            <div class="goods-main-content__count" data-space-left="1.5rem">
              <i class="pi pi-minus" @click="countChange('minus')"></i>
              <InputNumber class="p-inputtext-sm" v-model="state.count" />
              <i class="pi pi-plus" style="color: red" @click="countChange('plus')"></i>
            </div>
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
        <div class="row vertical center" @click="aboutGoodsRouter(15)">
          <img src="../../assets/goods/meringueTart0.jpg" alt="tart" />
          <h2>蛋白霜檸檬塔</h2>
          <p>NT 80</p>
        </div>
        <div class="row vertical center" @click="aboutGoodsRouter(14)">
          <img src="../../assets/goods/strawberryTart.jpg" alt="tart" />
          <h2>法式卡士達草莓塔</h2>
          <p>NT 120</p>
        </div>
        <div class="row vertical center" @click="aboutGoodsRouter(16)">
          <img src="../../assets/goods/poundCake01.jpg" alt="poundCake" />
          <h2>柳橙糖霜磅蛋糕</h2>
          <p>NT 80</p>
        </div>
        <div class="row vertical center" @click="aboutGoodsRouter(1)">
          <img src="../../assets/goods/strawberryChiffon01.jpg" alt="chiffon" />
          <h2>草莓香草戚風蛋糕</h2>
          <p>NT 580</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, inject, computed } from 'vue'
import { callApi } from '@/utils/callApi'
import { useStore } from 'vuex'
import { addGoodsCart, addLikeList, allLikeList, getImg, getGoodsList } from '@/service/api'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import guideLine from '@/components/guideLine.vue'

export default {
  name: 'SpecsDetail',
  components: {
    guideLine
  },
  setup() {
    const reload = inject('reload')
    const toast = useToast()
    const router = useRouter()
    const state = reactive({
      goodsData: [],
      newGoodsData: [],
      imgList: [],
      allSpecsCheckedID: [],
      currentSpecsChecked: [],
      checkedStatus: [],
      count: 1,
      specsCount: null,
      cartForm: {
        GoodsID: null,
        Specs: []
      },
      like: false
    })
    //獲得該商品詳細資料
    const getGoodDetail = onMounted(() => {
      const data = { ID: localStorage.getItem('goodsDetailID') * 1 }
      callApi(getGoodsList, data, (res) => {
        state.goodsData = res.data.Data
        state.cartForm.GoodsID = state.goodsData.ID
        state.specsCount = state.goodsData.GoodsSpecs[0].Specs
        guideData[0].label = state.goodsData.Name
        state.newGoodsData = state.goodsData.GoodsSpecs.slice(1)
        getImg()
        likeStatus()
      })
    })
    //獲得照片
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
        checkSpecs()
        const totalNum = state.cartForm.Specs.reduce((pre, cur) => {
          return pre + cur.Num
        }, 0)
        if (totalNum == state.specsCount) {
          state.cartForm.Specs.unshift({
            SpecID: state.goodsData.GoodsSpecs[0].ID,
            Num: state.count
          })
          const data = state.cartForm
          callApi(addGoodsCart, data, () => {
            toast.add({ severity: 'success', summary: '已加入購物車！', group: 'goods_addcart' })
            state.cartForm.Specs = []
          })
        } else {
          toast.add({ severity: 'error', summary: '規格有誤，請再次確認！', group: 'errorBox' })
          state.cartForm.Specs = []
          console.log(state.specsCount)
          console.log(totalNum)
        }
      } else {
        toast.add({ severity: 'error', summary: '請先登入會員！', group: 'errorBox' })
      }
    }
    //直接購買（跳轉結帳）
    const handleBuy = async () => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo !== null) {
        checkSpecs()
        const totalNum = state.cartForm.Specs.reduce((pre, cur) => {
          return pre + cur.Num
        }, 0)
        if (totalNum == state.specsCount) {
          state.cartForm.Specs.unshift({
            SpecID: state.goodsData.GoodsSpecs[0].ID,
            Num: state.count
          })
          const data = state.cartForm
          callApi(addGoodsCart, data, () => {
            router.push({ name: 'Cart' })
            state.cartForm.Specs = []
          })
        } else {
          toast.add({ severity: 'error', summary: '規格有誤，請再次確認！', group: 'errorBox' })
          state.cartForm.Specs = []
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
    //判斷收藏清單裡是否已有資料
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
    //相關產品的路由跳轉
    const aboutGoodsRouter = (id) => {
      localStorage.setItem('goodsDetailID', id)
      router.push({ name: 'GoodsDetail' })
    }
    //限制商品規格的數量
    const handleSpecsMax = (event) => {
      if (event.target.checked === true) {
        if (state.currentSpecsChecked.length < state.goodsData.GoodsSpecs[0].Specs) {
          state.currentSpecsChecked.push(event.target.value)
          console.log(state.currentSpecsChecked)
        } else {
          event.target.checked = false
          toast.add({ severity: 'error', summary: '已超過數量！', group: 'errorBox' })
        }
      } else if (event.target.checked === false) {
        state.currentSpecsChecked = state.currentSpecsChecked.filter((item) => {
          return item !== event.target.value
        })
        console.log(state.currentSpecsChecked)
      }
    }
    const checkSpecs = () => {
      for (let i in state.goodsData.GoodsSpecs) {
        for (let j in state.allSpecsCheckedID) {
          if (state.goodsData.GoodsSpecs[i].ID === state.allSpecsCheckedID[j]) {
            state.cartForm.Specs.push({
              SpecID: state.goodsData.GoodsSpecs[i].ID,
              Num: state.goodsData.GoodsSpecs[i].Num
            })
          }
        }
      }
    }
    return {
      state,
      getGoodDetail,
      guideData,
      likeStatus,
      handleAddLike,
      handleBuy,
      addCart,
      countChange,
      aboutGoodsRouter,
      handleSpecsMax,
      checkSpecs
    }
  }
}
</script>
