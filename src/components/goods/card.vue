<template>
  <div>
    <div class="goods-detail_item">
      <img :src="list.ImageUrls[0].Url" alt="" />
      <div class="media-icon" @click="checkGoodsDetail(list.ID)"></div>
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
      <h2 @click="checkGoodsDetail(list.ID)">{{ list.Name }}</h2>
      <p>NT {{ list.UnitPrice }}</p>
    </div>
    <Dialog
      class="goods_dialog"
      v-model:visible="state.visibleDialog"
      :breakpoints="{ '960px': '60vw' }"
      :style="{ width: '800px', height: '490px' }"
      :modal="true"
    >
      <div class="dialog_main">
        <div class="dialog_above">
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
          <div class="goods-content">
            <h2>{{ state.goodsData.Name }}</h2>
            <hr />
            <p>建議售價 NT{{ state.goodsData.UnitPrice }}</p>
            <div class="specs_exception">
              <div class="row horizontal bottom_left" data-space-bottom="1.5rem">
                <h3 data-space-right="1rem">選擇規格</h3>
                <span>( 最多可選{{ state.specsCount }}種 )</span>
              </div>
              <div class="specs" v-if="state.newGoodsData.length == 1">
                <input id="checkbox" type="checkbox" v-model="state.check" />
                <label for="checkbox" class="specs-customize">{{ state.newGoodsData[0].Specs }}</label>
              </div>
              <div class="field-checkbox" v-else>
                <div v-for="(item, i) in state.newGoodsData" :key="i" class="field-checkbox-item">
                  <input :id="item.ID" type="checkbox" name="specs" :value="item.ID" v-model="state.allSpecsCheckedID" @click="handleSpecsMax($event)" />
                  <label :for="item.ID">{{ item.Specs }}：</label>
                  <input class="specsCount" type="number" v-model="item.Num" max="99" min="1" placeholder="數量" />
                </div>
              </div>
            </div>
            <div>
              <h3>購買數量</h3>
              <div class="goods-content__count" data-space-left="1.5rem">
                <i class="pi pi-minus" @click="countChange('minus')"></i>
                <InputNumber class="p-inputtext-sm" v-model="state.count" />
                <i class="pi pi-plus" style="color: red" @click="countChange('plus')"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="row horizontal center">
          <button class="button_normal" data-width="95%" @click="addCartDialog()">加入購物車</button>
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
import { useStore } from 'vuex'

export default {
  name: 'Card',
  props: {
    list: Object
  },
  setup(props) {
    const toast = useToast()
    const store = useStore()
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
      },
      check: false
    })
    const goodsList = props.list
    // 增加進購物車
    const addCart = async (list) => {
      getGoodDetail(list.ID)
      state.visibleDialog = true
    }
    //商品詳細頁面
    const checkGoodsDetail = (id) => {
      store.commit('goodsModules/SET_GOODSDETAIL', id)
      const specialIds = [7, 8, 9, 10, 11, 12]
      const currentRoute = {
        name: specialIds.includes(id) ? 'SpecsDetail' : 'GoodsDetail'
      }
      router.push(currentRoute)
    }
    //獲得該商品詳細資料
    const getGoodDetail = (id) => {
      store.commit('goodsModules/SET_GOODSDETAIL', id)
      const data = { ID: store.state.goodsModules.currentGoodsID }
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
      if (name === 'plus' && state.count < 99) state.count += 1
      else if (name === 'minus' && state.count > 1) state.count -= 1
    }
    //限制商品規格的數量
    const handleSpecsMax = (event) => {
      if (event.target.checked === true) {
        if (state.currentSpecsChecked.length < state.goodsData.GoodsSpecs[0].Specs) {
          state.currentSpecsChecked.push(event.target.value)
        } else {
          event.target.checked = false
          toast.add({ severity: 'error', summary: '已超過數量！', group: 'errorBox' })
        }
      } else if (event.target.checked === false) {
        state.currentSpecsChecked = state.currentSpecsChecked.filter((item) => {
          return item !== event.target.value
        })
      }
    }
    //檢查商品數量是否正確
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
      const isLogin = store.getters['memberModules/getLogin']
      if (isLogin == true) {
        if (state.newGoodsData.length == 1) {
          if (state.check == true) {
            state.cartForm.Specs.push({
              SpecID: state.newGoodsData[0].ID,
              Num: state.count
            })
            const data = state.cartForm
            callApi(addGoodsCart, data, () => {
              toast.add({ severity: 'success', summary: '已加入購物車！', group: 'successBox' })
            })
          } else {
            toast.add({ severity: 'error', summary: '請選擇規格', group: 'errorBox' })
          }
        } else {
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
              toast.add({ severity: 'success', summary: '已加入購物車！', group: 'successBox' })
              state.cartForm.Specs = []
              state.visibleDialog = false
            })
          } else {
            toast.add({ severity: 'error', summary: '規格有誤，請再次確認！', group: 'errorBox' })
            state.cartForm.Specs = []
          }
        }
      } else {
        toast.add({ severity: 'error', summary: '請先登入會員！', group: 'errorBox' })
      }
    }
    return {
      state,
      reload,
      goodsList,
      checkGoodsDetail,
      countChange,
      handleSpecsMax,
      addCartDialog,
      getGoodDetail,
      addCart
    }
  }
}
</script>
