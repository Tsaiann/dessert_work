<template>
  <div class="cart container">
    <Toast position="center" />
    <Toast position="center" group="goodsDelete">
      <template #message="slot">
        <div class="row horizontal">
          <div data-width="100%">
            <div class="row vertical center">
              <i class="pi pi-exclamation-circle" style="font-size: 3rem" data-space-bottom="1rem"></i>
              <h4>{{ slot.message.summary }}</h4>
            </div>
            <div class="row horizontal center">
              <Button class="p-button-success" label="取消" @click="onReject()" data-space-right="1rem"></Button>
              <Button class="p-button-secondary" label="確定" @click="onConfirm(slot.message.ID)"></Button>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <guideLine :data="guideData" />
    <div class="cart-page">
      <div class="card" data-space-bottom="2rem">
        <Steps :model="steps" />
      </div>
      <h2 class="exception_title">購物車</h2>
      <div class="cart-data">
        <ul class="cart-data-title">
          <li data-width="55%">商品詳情</li>
          <li data-width="22%">數量</li>
          <li data-width="20%">小計</li>
        </ul>
        <div class="cart-data-content" v-for="(item, i) in state.goodsList" :key="i">
          <div class="cart-data-content_detail">
            <img :src="renderCartImg(item.ImageUrls[0].Url)" :alt="item.ImageUrls[0].Ident" />
            <div>
              <h3>{{ item.Goods.Name }}</h3>
              <span>{{ item.specsName }}</span>
              <p class="cart-data-content_price">NT{{ item.TimestampPice }}</p>
            </div>
          </div>
          <div class="cart-data-count">
            <i class="pi pi-minus" style="font-size: 0.5rem" @click="changeCart('minus', item)"></i>
            <InputNumber v-model="item.Specs[0].Num" class="p-inputtext-sm"></InputNumber>
            <i class="pi pi-plus" style="font-size: 0.5rem" @click="changeCart('plus', item)"></i>
          </div>
          <div class="cart-data-content_total">NT {{ item.total }}</div>
          <i class="pi pi-times" @click="deleteCartData(item.ID)"></i>
        </div>
        <div class="cart-data-content-media" v-for="(item, i) in state.goodsList" :key="i">
          <div class="cart-data-content-media_detail">
            <img :src="renderCartImg(item.ImageUrls[0].Url)" :alt="item.ImageUrls[0].Ident" />
            <div data-width="65%">
              <h3>{{ item.Goods.Name }}</h3>
              <span>{{ item.specsName }}</span>
              <p class="cart-data-content_price">NT{{ item.TimestampPice }}</p>
            </div>
            <i class="pi pi-times" @click="deleteCartData(item.ID)"></i>
          </div>
          <div class="row horizontal space_between" data-space-top="1rem">
            <div class="cart-data-count">
              <i class="pi pi-minus" style="font-size: 0.5rem" @click="changeCart('minus', item)"></i>
              <InputNumber v-model="item.Specs[0].Num" class="p-inputtext-sm"></InputNumber>
              <i class="pi pi-plus" style="font-size: 0.5rem" @click="changeCart('plus', item)"></i>
            </div>
            <div class="cart-data-content_total">NT {{ item.total }}</div>
          </div>
        </div>
      </div>
      <div class="order-options">
        <div class="send">
          <h2>送貨以及付款方式</h2>
          <p>送貨方式</p>
          <div class="sent_options">
            <Dropdown
              v-model="state.deliveryValue"
              :options="sentItems"
              optionLabel="name"
              optionValue="name"
              placeholder="請選擇送貨方式"
              @change="feeMethodSelect()"
            />
          </div>
          <p>付款方式</p>
          <div class="sent_options">
            <Dropdown v-model="state.paymentValue" :options="payItems" optionValue="name" optionLabel="name" placeholder="請選擇付款方式" />
          </div>
        </div>
        <div class="info">
          <h2>訂單資訊</h2>
          <div class="row horizontal space_between">
            <p>商品總計：</p>
            <p>NT {{ allGoodsTotal }}</p>
          </div>
          <div class="row horizontal space_between">
            <p>運費</p>
            <p>NT {{ feeChange }}</p>
          </div>
          <div class="row horizontal space_between">
            <p>優惠券</p>
            <p v-if="state.discountID.length === 1">NT -{{ state.discountFee }}</p>
          </div>
          <div class="row horizontal h_end">
            <span @click="dialogDiscountVisible = true">使用優惠券</span>
          </div>
          <hr />
          <div class="row horizontal space_between">
            <p>合計：</p>
            <p>NT {{ orderTotal }}</p>
          </div>
        </div>
        <Dialog header="優惠券" v-model:visible="dialogDiscountVisible" :style="{ width: '500px' }" :breakpoints="{ '550px': '60vw' }" class="cart_dialog">
          <div class="discount-content">
            <div v-for="(item, i) in state.benefits" :key="i" class="discount_item">
              <input :id="item.ID" type="checkbox" :value="item.ID" v-model="state.discountID" @click="handleSpecsMax($event, item.Amount)" />
              <label :for="item.ID">
                <div class="dialog-discount">
                  <h2>NT ${{ state.benefits[i].Amount }}</h2>
                  <p>單筆消費滿1000元即可使用一張</p>
                  <p>使用日期：2022/12/31</p>
                </div>
              </label>
            </div>
          </div>
          <template #footer>
            <div class="row horizontal" data-space-top="1rem">
              <button class="button_cancel" @click="discountButton('cancel')">取消</button>
              <button class="button_confirm" @click="discountButton('confirm')">確定</button>
            </div>
          </template>
        </Dialog>
      </div>
      <div class="row horizontal h_end" data-width="80%" style="margin: 20px auto">
        <button class="button_confirm" data-width="40%" @click="handleNextPage()">前往結賬</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed, inject } from 'vue'
import guideLine from 'components/guideLine.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { getGoodsCart, deleteGoodsCart, updateCartInfo, benefitsList } from 'services/api'
import { callApi } from 'utils/callApi'
import { useStore } from 'vuex'

export default {
  name: 'Cart',
  components: {
    guideLine
  },
  setup() {
    const store = useStore()
    const reload = inject('reload')
    const router = useRouter()
    const toast = useToast()
    const dialogDiscountVisible = ref(false)
    const state = reactive({
      discountID: [],
      benefits: [],
      goodsList: [],
      goodsSpecs: [], // 所有規格
      currentSpecs: [],
      updateCartForm: {
        ID: 0,
        GoodsID: 0,
        Specs: [
          {
            ID: 0,
            SpecID: 0,
            Num: 0
          }
        ]
      },
      deliveryValue: null,
      paymentValue: null,
      deliveryFee: 0,
      discountFee: null,
      total: 0
    })
    const payItems = reactive([
      {
        name: '現金付款'
      },
      {
        name: '信用卡'
      },
      {
        name: '匯款'
      }
    ])
    const sentItems = reactive([
      {
        name: '自取'
      },
      {
        name: '冷藏包裹'
      }
    ])
    const guideData = reactive([
      {
        label: '購物車',
        to: '/cart'
      }
    ])
    const steps = reactive([
      {
        label: '訂單資訊',
        to: '/cart'
      },
      {
        label: '填寫資料',
        to: '/fillInfo'
      },
      {
        label: '資料確認',
        to: '/finish'
      }
    ])
    //根據選擇的寄送方式運費不同
    const feeMethodSelect = () => {
      state.deliveryValue === '自取' ? (state.deliveryFee = 0) : (state.deliveryFee = 150)
    }
    const feeChange = computed(() => {
      return state.deliveryFee * 1
    })
    //整筆訂單的金額總數
    const orderTotal = computed(() => {
      let total = 0
      for (let i in state.goodsList) {
        total += state.goodsList[i].total
      }
      return total + state.deliveryFee - state.discountFee
    })
    //取得購物車資料
    const getCartData = onMounted(() => {
      const data = ''
      callApi(getGoodsCart, data, (res) => {
        state.goodsList = [...res.data.Data]
        totalCount()
        specsChange()
      })
    })
    //得到所有商品規格
    const getGoodsSpecs = onMounted(() => {
      const goodsInfo = JSON.parse(localStorage.getItem('goodsInfo'))
      let specs = goodsInfo.map((item) => {
        return item.GoodsSpecs
      })
      state.goodsSpecs = specs.flat(Infinity)
    })
    //針對一筆商品內規格作轉換(chiffon/other)
    const specsCommon = (orderSpecs) => {
      for (let i in state.goodsSpecs) {
        if (orderSpecs.Specs[0].SpecID == state.goodsSpecs[i].ID) {
          orderSpecs.specsName = state.goodsSpecs[i].Specs
        }
      }
    }
    //針對一筆商品內規格作轉換(macaron/cupcake)
    const specsAdded = (orderSpecs) => {
      for (let i in orderSpecs.Specs) {
        for (let j in state.goodsSpecs) {
          if (orderSpecs.Specs[i].SpecID == state.goodsSpecs[j].ID) {
            orderSpecs.specsName.push(state.goodsSpecs[j].Specs)
          }
        }
      }
      orderSpecs.specsName.splice(0, 1)
      orderSpecs.specsName = orderSpecs.specsName.join()
    }
    //取得訂單中規格超過一筆的資料
    const specsChange = () => {
      for (let i in state.goodsList) {
        if (state.goodsList[i].Specs.length > 1) {
          state.goodsList[i].specsName = []
          specsAdded(state.goodsList[i])
        } else if (state.goodsList[i].Specs.length == 1) {
          specsCommon(state.goodsList[i])
        }
      }
    }
    //刪除購物車資料
    const deleteCartData = async (id) => {
      toast.add({ severity: 'success', summary: '確定要刪除商品？', group: 'goodsDelete', ID: id })
    }
    const onReject = () => {
      toast.removeGroup('goodsDelete')
    }
    const onConfirm = async (id) => {
      const data = { ID: id }
      await callApi(deleteGoodsCart, data, () => {
        toast.removeGroup('goodsDelete')
        getCartData()
      })
      await reload()
    }
    // 前往下一頁
    const handleNextPage = async () => {
      if (state.deliveryValue && state.paymentValue) {
        store.commit('cartModules/SET_CARTPAYMENT', state)
        store.commit('cartModules/SET_CARTTOTAL', orderTotal.value)
        router.push({ name: 'FillInfo' })
      } else {
        toast.add({ severity: 'error', summary: '請選擇送貨與付款方式', group: 'errorBox' })
      }
    }
    //每筆商品的金額總數
    const totalCount = () => {
      for (let i in state.goodsList) {
        state.goodsList[i]['total'] = state.goodsList[i].TimestampPice * state.goodsList[i].Specs[0].Num
      }
    }
    //所有商品的金額總數
    const allGoodsTotal = computed(() => {
      let total = 0
      for (let i in state.goodsList) {
        total += state.goodsList[i].total
      }
      return total
    })
    //更新購物車的商品數量
    const changeCart = (method, obj) => {
      state.updateCartForm.ID = obj.ID
      state.updateCartForm.GoodsID = obj.GoodsID
      state.updateCartForm.Specs[0].ID = obj.Specs[0].ID
      state.updateCartForm.Specs[0].SpecID = obj.Specs[0].SpecID
      if (method === 'plus' && obj.Specs[0].Num < 99) state.updateCartForm.Specs[0].Num = obj.Specs[0].Num + 1
      else if (method === 'minus' && obj.Specs[0].Num > 1) state.updateCartForm.Specs[0].Num = obj.Specs[0].Num - 1
      const data = state.updateCartForm
      callApi(updateCartInfo, data, () => {
        getCartData()
      })
    }
    //得到優惠券資料
    const getBenefitsData = onMounted(() => {
      const data = ''
      callApi(benefitsList, data, (res) => {
        state.benefits = [...res.data.Data.DiscountTicket]
      })
    })
    //限制商品規格的數量
    const handleSpecsMax = (event, fee) => {
      if (event.target.checked === true) {
        if (allGoodsTotal.value >= 1000) {
          if (state.discountID.length == 1) {
            event.target.checked = false
            toast.add({ severity: 'error', summary: '已超過數量！', group: 'errorBox' })
          } else {
            state.discountFee = fee
          }
        } else {
          event.target.checked = false
          toast.add({ severity: 'error', summary: '消費金額未達到！', group: 'errorBox' })
        }
      } else {
        state.discountFee = null
      }
    }
    const discountButton = (method) => {
      const obj = {
        cancel: () => {
          state.discountFee = null
          state.discountID = []
          dialogDiscountVisible.value = false
        },
        confirm: () => {
          dialogDiscountVisible.value = false
        }
      }
      obj[method]()
    }
    //傳回來的圖片加上正確網址
    const renderCartImg = (img) => {
      return process.env.VUE_APP_BASE_API + '/imgs/' + img
    }
    return {
      state,
      getGoodsSpecs,
      getBenefitsData,
      guideData,
      steps,
      sentItems,
      payItems,
      dialogDiscountVisible,
      getCartData,
      allGoodsTotal,
      feeChange,
      orderTotal,
      discountButton,
      specsChange,
      renderCartImg,
      handleSpecsMax,
      changeCart,
      handleNextPage,
      deleteCartData,
      onConfirm,
      onReject,
      totalCount,
      feeMethodSelect
    }
  }
}
</script>
