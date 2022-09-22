<template>
  <div class="card">
    <div class="goods-detail_item">
      <img :src="list.ImageUrls[0].Url" alt="" />
      <div class="icon">
        <div class="row vertical center" @click="checkGoodsDetail(list.ID)">
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
    <Dialog
      class="goods_dialog"
      v-model:visible="state.visibleDialog"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '800px', height: '490px' }"
      :modal="true"
    >
      <div class="dialog_main">
        <div class="row horizontal">
          <div class="goods_galleria">
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
            </div>
          </div>
        </div>
        <div class="row horizontal center">
          <button class="button_submit normal" data-space-right="1rem" data-width="100%" @click="addCartDialog()">加入購物車</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { addGoodsCart, getGoodsList } from '@/service/api'
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
      visibleDialog: false,
      newGoodsData: [],
      imgList: [],
      goodsData: [],
      allSpecsCheckedID: [],
      currentSpecsChecked: [],
      specsCount: null,
      count: 1,
      cartForm: {
        GoodsID: null,
        Specs: []
      }
    })
    const goodsList = props.list
    // 增加進購物車
    const addCart = async (list) => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo !== null) {
        if (list.ID === 47 || list.ID === 48 || list.ID === 49 || list.ID === 50 || list.ID === 51 || list.ID === 52) {
          getGoodDetail(list.ID)
          state.visibleDialog = true
        } else {
          state.cartForm.GoodsID = list.ID
          state.cartForm.Specs.push({ SpecID: list.GoodsSpecs[1].ID, Num: 1 })
          const data = state.cartForm
          await callApi(addGoodsCart, data, async () => {
            toast.add({ severity: 'success', summary: '已加入購物車！', group: 'goods_addcart' })
            state.cartForm.Specs = []
          })
        }
      } else {
        toast.add({ severity: 'error', summary: '請先登入會員！', group: 'errorBox' })
      }
    }

    //商品詳細頁面
    const checkGoodsDetail = (id) => {
      localStorage.setItem('goodsDetailID', id)
      if (id === 47 || id === 48 || id === 49 || id === 50 || id === 51 || id === 52) {
        router.push({ name: 'SpecsDetail' })
      } else {
        router.push({ name: 'GoodsDetail' })
      }
    }
    //獲得該商品詳細資料
    const getGoodDetail = (id) => {
      localStorage.setItem('goodsDetailID', id)
      const data = { ID: localStorage.getItem('goodsDetailID') * 1 }
      state.imgList = []
      callApi(getGoodsList, data, (res) => {
        state.goodsData = res.data.Data
        state.cartForm.GoodsID = state.goodsData.ID
        state.specsCount = state.goodsData.GoodsSpecs[0].Specs
        state.newGoodsData = state.goodsData.GoodsSpecs.slice(1)
        getImg()
      })
    }
    //獲得照片
    const getImg = () => {
      for (let i in state.goodsData.ImageUrls) {
        const url = state.goodsData.ImageUrls[i].Url
        state.imgList.push({ url: process.env.VUE_APP_BASE_API + '/imgs/' + url })
      }
    }
    //需要的商品數量
    const countChange = (name) => {
      if (name === 'plus' && state.count < 99) {
        state.count += 1
      } else if (name === 'minus' && state.count > 1) {
        state.count -= 1
      }
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
    //加入到購物車
    const addCartDialog = async () => {
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
            state.visibleDialog = false
          })
        } else {
          toast.add({ severity: 'error', summary: '規格有誤，請再次確認！', group: 'errorBox' })
          state.cartForm.Specs = []
        }
      } else {
        toast.add({ severity: 'error', summary: '請先登入會員！', group: 'errorBox' })
      }
    }
    return {
      getGoodDetail,
      goodsList,
      addCart,
      state,
      reload,
      checkGoodsDetail,
      countChange,
      checkSpecs,
      handleSpecsMax,
      addCartDialog
    }
  }
}
</script>
