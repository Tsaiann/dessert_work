<template>
  <div class="return container">
    <guideLine :data="guideData" />
    <div data-space-left="1rem">
      <h1 data-space-bottom="1rem">退款政策</h1>
      <p data-space-bottom="1rem">
        親愛的客戶，本店絕對尊重您的權益並予以保護。為了幫助您瞭解，謹以下列聲明，向您說明退換貨政策之類別、使用範圍及方式、以及如果您對於感動食品的退換貨政策聲明、相關告知事項有任何疑問，還請您與我們聯絡，我們將會儘快協助處理。
      </p>
      <ul class="return-list">
        <li>＊ 服務人員為確保商品品質，出貨前都會檢查商品。</li>
        <li>＊ 商品若有瑕疵需退換，需保留商品出貨時所有相關文件及完整包裝以及照片 (需有外箱與內容物受損 或是缺失的影片或是照片)，否則不予受理。</li>
        <li>＊ 商品若有寄錯需退換，需保留商品出貨時所有相關文件及完整包裝，否則不予受理。</li>
        <li>
          ＊ 運送過程中產品因搖晃產品位置移動或內隔移位將無法更換貨品，商品不符合主觀認定感受亦不可
          更換貨品（如：吃起來與想像中口味不符合，餅乾大小與想像中有落差，天然花瓣大小或顏色不符合期待，擺放位置不夠美麗等等主觀感受）
        </li>
        <li>＊ 商品收到超過7日，恕不接受退貨。商品一經拆封，恕無法辦理退貨，敬請見諒。</li>
        <li>
          ＊
          依據消保法規定，蛋糕商品屬於保存期限短，無法回收再販售的生鮮商品，不適用消保法7日無條件退貨。非產品品質原因退貨，需負擔來回運送成本，若無法接受請勿下單。
        </li>
        <li>＊ 退回商品需包含此筆訂單的所有商品（含贈品及紙本發票）等，如未將此筆訂單包裹中的所有內容物 妥善包裝、完整寄回，需請您自費郵資補件。</li>
        <li>
          ＊ 商品皆有材質及尺寸等相關說明，且為實品拍攝（已儘量避免色差）餅乾大小等寄送時程在首頁及條
          款細則亦皆有說明，購物前可先估算為保雙方權益，購物前請先確認相關資訊。
        </li>
      </ul>
      <h1 data-space-bottom="1rem">寄回方式</h1>
      <p data-space-bottom="2rem">我們會主動聯繫黑貓宅急便，到府收件，運費由我們負擔，詳細流程將於您提出退換貨申請時，由客服指引說明。</p>
      <h1 data-space-bottom="1rem">退款方式</h1>
      <p data-space-bottom="3rem">
        退貨商品收回並經工作人員確認商品數量無誤，符合所有退款標準，且所需資料確認無誤後，信用卡部
        分我們於10天內將款項退到您的帳戶。若您使用其他方式付款，必須請您提供正確的匯款帳號，以利完成退款手續。
      </p>
      <p data-space-bottom="3rem">若您有其他疑問，歡迎直接與我們聯絡，我們將盡快為您解答。</p>
    </div>
  </div>
</template>

<script>
import guideLine from 'components/guideLine.vue'
import { reactive } from 'vue'
export default {
  name: 'Return',
  components: {
    guideLine
  },
  setup() {
    const guideData = reactive([
      {
        label: '退換貨政策',
        to: '/return'
      }
    ])
    return {
      guideData
    }
  }
}
</script>
