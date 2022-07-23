<template>
  <div class="cart container">
    <guideLine :data="guideData" />
    <div class="cart-page">
      <div class="card" data-space-bottom="2rem">
        <Steps :model="items" />
      </div>
      <div class="finish">
        <div class="finish-title">
          <h2>感謝您的訂購，本次訂單編號為 424344343</h2>
          <span>查看明細</span>
        </div>
        <div data-inset="1rem">
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <p>取件人姓名：</p>
            <p></p>
          </div>
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <p>取件人電話：</p>
            <p></p>
          </div>
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <p>取貨方式：</p>
            <p></p>
          </div>
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <p>付款方式：</p>
            <p></p>
          </div>
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <p>收件地址：</p>
            <p></p>
          </div>
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <p>到貨時間：</p>
            <p></p>
          </div>
          <hr style="border-color: #eae2d8" />
          <div class="row horizontal space_between" data-space-bottom="1rem">
            <span>合計：</span>
            <p></p>
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
import { reactive } from 'vue'
export default {
  name: 'Finish',
  components: {
    guideLine
  },
  setup() {
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
    return {
      guideData,
      items
    }
  }
}
</script>
