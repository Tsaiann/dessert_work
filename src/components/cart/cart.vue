<template>
  <div class="cart container">
    <Toast position="center" />
    <Toast position="center" group="bc">
      <template #message="slotProps">
        <div class="row horizontal">
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
    <guideLine :data="guideData" />
    <div class="cart-page">
      <div class="card" data-space-bottom="2rem">
        <Steps :model="steps" />
      </div>
      <div class="cart-data">
        <h2>購物車</h2>
        <DataTable :value="goodsList" responsiveLayout="scroll">
          <Column field="GoodsID" header="商品名稱"></Column>
          <Column field="TimestampPice" header="價格"></Column>
          <Column field="ItemNum" header="數量"></Column>
          <Column field="total" header="小計"></Column>
          <Column bodyStyle="text-align: center; overflow: visible">
            <template #body="{ data }">
              <i class="pi pi-times" @click="deleteCartData(data.ID)"></i>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="row horizontal center">
        <div class="send">
          <h2>送貨以及付款方式</h2>
          <p>送貨方式</p>
          <Dropdown
            v-model="selectedSend"
            :options="sentItems"
            optionLabel="name"
            optionValue="name"
            placeholder="請選擇送貨方式"
            :style="{ width: '94%' }"
            @change="fee()"
          />
          <p>付款方式</p>
          <Dropdown v-model="selectedPay" :options="payItems" optionLabel="name" placeholder="請選擇付款方式" :style="{ width: '94%' }" />
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
            <InputText type="text" class="p-inputtext-sm" />
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
        <Dialog header="優惠券" v-model:visible="dialogDiscountVisible" :style="{ width: '500px' }">
          <div class="row horizontal wrap space_between">
            <div class="dialog-discount">
              <h2>NT $100</h2>
              <p>單筆消費滿500元即可使用一張</p>
              <p>使用日期：2023/12/31</p>
            </div>
          </div>
          <template #footer>
            <div class="row horizontal">
              <button class="button_submit cancel" @click="dialogDiscountVisible = false">取消</button>
              <button class="button_submit confirm">確定</button>
            </div>
          </template>
        </Dialog>
      </div>
      <div class="row horizontal h_end" data-space-top="2rem" data-width="90%">
        <button class="button_submit confirm" @click="handleNextPage(method.delivery)">前往結賬</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from 'vue'
import guideLine from '@/components/guideLine.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { getGoodsCart, deleteGoodsCart } from '@/service/api'
import { callApi } from '@/utils/callApi'

export default {
  name: 'Cart',
  components: {
    guideLine
  },
  setup() {
    const method = reactive({
      delivery: '',
      payment: ''
    })
    const deliveryChange = computed(() => {
      return method.delivery
    })
    const router = useRouter()
    const toast = useToast()
    const selectedSend = ref(null)
    const selectedPay = ref(null)
    const dialogDiscountVisible = ref(false)
    const goodsList = ref([])
    const deliveryFee = ref(0)
    const fee = () => {
      if (selectedSend.value === '自取') {
        deliveryFee.value = 0
      } else {
        deliveryFee.value = 150
      }
    }
    const feeChange = computed(() => {
      return deliveryFee.value * 1
    })
    const orderTotal = computed(() => {
      let total = 0
      for (let i in goodsList.value) {
        total += goodsList.value[i].total
      }
      return total + deliveryFee.value
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
    const getCartData = onMounted(() => {
      const data = ''
      callApi(getGoodsCart, data, (res) => {
        goodsList.value = [...res.data.Data]
        totalCount()
      })
    })
    const deleteCartData = async (id) => {
      toast.add({ severity: 'warn', summary: '確定要刪除商品？', group: 'bc', ID: id })
    }
    const handleNextPage = (delivery) => {
      if (selectedPay.value !== null && selectedSend.value !== null) {
        router.push({
          name: 'FillInfo',
          query: {
            d: delivery
          }
        })
      } else {
        toast.add({ severity: 'error', summary: '請選擇送貨與付款方式', detail: 'Message Content' })
      }
    }
    const onReject = () => {
      toast.removeGroup('bc')
    }
    const onConfirm = async (id) => {
      const data = { ID: id }
      await callApi(deleteGoodsCart, data, () => {
        toast.add({ severity: 'success', summary: '已刪除', detail: 'Message Content' })
        toast.removeGroup('bc')
        getCartData()
      })
    }
    const totalCount = () => {
      for (let i in goodsList.value) {
        goodsList.value[i]['total'] = goodsList.value[i].TimestampPice * goodsList.value[i].ItemNum
      }
    }
    const allGoodsTotal = computed(() => {
      let total = 0
      for (let i in goodsList.value) {
        total += goodsList.value[i].total
      }
      return total
    })
    return {
      guideData,
      steps,
      selectedSend,
      selectedPay,
      sentItems,
      payItems,
      handleNextPage,
      dialogDiscountVisible,
      getCartData,
      goodsList,
      deleteCartData,
      onConfirm,
      onReject,
      totalCount,
      allGoodsTotal,
      feeChange,
      fee,
      deliveryFee,
      orderTotal,
      method,
      deliveryChange
    }
  }
}
</script>
