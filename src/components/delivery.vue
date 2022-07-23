<template>
  <div class="delivery container">
    <guideLine :data="guideData" />
    <div data-space-left="1rem">
      <h2 data-space-bottom="0.5rem">蛋糕宅配須知</h2>
      <p data-space-bottom="1.5rem">
        目前我們配合黑貓宅急便做蛋糕宅配運送，為了確保商品的新鮮及配送安全，全程都會使用低溫冷凍配送，因此如果蛋糕內容含有新鮮水果及無法冷凍的食材就不能選擇宅配運送。
      </p>
      <div class="deliveryImg"></div>
      <ul class="delivery-list">
        <li>＊ 可指定到貨日：時間為週二至週六，因應黑貓宅急便週日公休政策，所以週日及週一無法指定到貨。</li>
        <li>＊ 訂單送出後，請在24小時內完成付款，付款完成才開始安排訂單製作。</li>
        <li>＊ 所有商品皆為新鮮製作，所以我們最快出貨日為下單後3個工作天，如有急單需求請務必來電確認，夥伴們會跟您確認更改收貨日期的事宜。</li>
        <li>＊ 如訂單送出後有需要修改到貨日期，請電洽店面或私訊粉絲團做修改。</li>
        <li>
          ＊
          宅配商品我們皆進行了多次的配送實驗，也有最完全保護的包裝，但是配送過程還是有一定的風險，下單前請三思，可能會因配送而有碰撞的狀態，風險須自行承擔，除非為嚴重變形及耗損，黑貓宅配才會視狀況做賠償，可以接受者再下單喔。
        </li>
      </ul>
      <h2 data-space-bottom="0.5rem">付款方式</h2>
      <p data-space-bottom="3rem">信用卡 (支援國內外Visa, Master, JCB, 銀聯卡)或ATM虛擬代碼轉帳 (於一日內持結帳畫面中的虛擬代碼到實體ATM或網路銀行繳費)</p>
      <p data-space-bottom="3rem">若有任何問題都歡迎與我們聯繫。</p>
    </div>
  </div>
</template>

<script>
import guideLine from '@/components/guideLine.vue'
import { reactive } from 'vue'

export default {
  name: 'Delivery',
  components: {
    guideLine
  },
  setup() {
    const guideData = reactive([
      {
        label: '宅配需知',
        to: '/delivery'
      }
    ])
    return {
      guideData
    }
  }
}
</script>
