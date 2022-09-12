<template>
  <div class="cart container">
    <guideLine :data="guideData" />
    <div class="cart-page">
      <div class="card" data-space-bottom="2rem">
        <Steps :model="items" />
      </div>
      <div class="finish">
        <div class="finish-title">
          <h2>感謝您的訂購!</h2>
          <span @click="$router.push({ name: 'Order' })">查看明細</span>
        </div>
        <div data-inset="1rem">
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <p>取件人姓名：</p>
            <p>{{ recipientForm.recipient }}</p>
          </div>
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <p>取件人電話：</p>
            <p>{{ recipientForm.phone }}</p>
          </div>
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <p>取貨方式：</p>
            <p>{{ recipientForm.delivery }}</p>
          </div>
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <p>付款方式：</p>
            <p>{{ recipientForm.payment }}</p>
          </div>
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <p>收件地址：</p>
            <p>{{ recipientForm.addr }}</p>
          </div>
          <hr style="border-color: #eae2d8" />
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <span>合計：</span>
            <p>{{ recipientForm.total }}</p>
          </div>
        </div>
        <div class="finish-footer">
          <i class="pi pi-info-circle" style="font-size: 1.2rem"></i>
          <span data-space-left="0.5rem">請在時間內，至指定門市取貨。若逾期未取將可能列為黑名單，影響您在本商店訂購的權利！</span>
        </div>
      </div>
      <div class="finish-button">
        <div @click="$router.push({ name: 'Content' })">
          <p>繼續購物</p>
          <i class="pi pi-angle-right" style="font-size: 1.2rem"></i>
        </div>
        <div @click="$router.push({ name: 'Ask' })">
          <p>聯絡客服</p>
          <i class="pi pi-angle-right" style="font-size: 1.2rem"></i>
        </div>
        <div @click="$router.push({ name: 'Order' })">
          <p>查詢訂單</p>
          <i class="pi pi-angle-right" style="font-size: 1.2rem"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import guideLine from '@/components/guideLine.vue'
import { useRouter } from 'vue-router'
import { reactive, onMounted } from 'vue'
export default {
  name: 'Finish',
  components: {
    guideLine
  },
  setup() {
    const router = useRouter()
    const guideData = reactive([
      {
        label: '購物車',
        to: '/cart'
      }
    ])
    const items = reactive([
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
    const recipientForm = reactive({
      recipient: JSON.parse(localStorage.getItem('cartInfo')).recipient,
      phone: JSON.parse(localStorage.getItem('cartInfo')).phone,
      addr: JSON.parse(localStorage.getItem('cartInfo')).addr,
      payment: JSON.parse(localStorage.getItem('cartInfo')).payment,
      delivery: JSON.parse(localStorage.getItem('cartInfo')).delivery,
      total: JSON.parse(localStorage.getItem('cartTotal')).total
    })
    const text = onMounted(() => {
      console.log(router.currentRoute.value.params)
    })
    return {
      guideData,
      items,
      recipientForm,
      text
    }
  }
}
</script>
