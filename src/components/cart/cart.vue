<template>
  <div class="cart container">
    <Toast />
    <guideLine :data="guideData" />
    <div class="cart-page">
      <div class="card" data-space-bottom="2rem">
        <Steps :model="steps" />
      </div>
      <div class="cart-data">
        <h2>購物車</h2>
        <DataTable :value="tabledata" responsiveLayout="scroll">
          <Column field="name" header="商品名稱"></Column>
          <Column field="price" header="價格"></Column>
          <Column field="count" header="數量"></Column>
          <Column field="total" header="小計"></Column>
          <Column bodyStyle="text-align: center; overflow: visible">
            <template #body>
              <i class="pi pi-times"></i>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="row horizontal center">
        <div class="send">
          <h2>送貨以及付款方式</h2>
          <p>送貨方式</p>
          <Dropdown v-model="selectedSend" :options="sentItems" optionLabel="name" placeholder="請選擇送貨方式" :style="{ width: '94%' }" />
          <p>付款方式</p>
          <Dropdown v-model="selectedPay" :options="payItems" optionLabel="name" placeholder="請選擇付款方式" :style="{ width: '94%' }" />
        </div>
        <div class="info">
          <h2>訂單資訊</h2>
          <div class="row horizontal space_between">
            <p>商品小計：</p>
            <p>NT $1000</p>
          </div>
          <div class="row horizontal space_between">
            <p>運費</p>
            <p>NT $0</p>
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
            <p>NT $1000</p>
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
        <button class="button_submit confirm" @click="handleNextPage">前往結賬</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import guideLine from '@/components/guideLine.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

export default {
  name: 'Cart',
  components: {
    guideLine
  },
  setup() {
    const router = useRouter()
    const toast = useToast()
    const selectedSend = ref(null)
    const selectedPay = ref(null)
    const dialogDiscountVisible = ref(false)
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
    const tabledata = reactive([
      {
        name: '草莓塔',
        price: 160,
        count: 2,
        total: 320
      },
      {
        name: '草莓塔',
        price: 160,
        count: 2,
        total: 320
      },
      {
        name: '草莓塔',
        price: 160,
        count: 2,
        total: 320
      }
    ])
    const handleNextPage = () => {
      if (selectedPay.value !== null && selectedSend.value !== null) {
        router.push({ name: 'FillInfo' })
      } else {
        toast.add({ severity: 'error', summary: '請選擇送貨與付款方式', detail: 'Message Content' })
      }
    }
    return {
      guideData,
      steps,
      tabledata,
      selectedSend,
      selectedPay,
      sentItems,
      payItems,
      handleNextPage,
      dialogDiscountVisible
    }
  }
}
</script>
