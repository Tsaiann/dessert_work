<template>
  <div class="QA container" data-space-bottom="3rem">
    <guideLine msg="常見Q&A" />
    <div data-space-left="1rem">
      <h2 data-space-bottom="1rem">蛋糕相關問題</h2>
      <ul data-space-bottom="3rem">
        <li>
          <p>‧ 收到蛋糕與訂購的口味不符或是在宅配運送過程中嚴重受損怎麼辦？</p>
          <span> 若發生蛋糕與訂購的口味不符或是在宅配運送過程中嚴重受損的情況，請務必於收貨日當日拍照存證聯繫我們，我們將盡快與您聯繫。</span>
        </li>
        <li>
          <p>‧ 蛋糕最多可以保存幾天？</p>
          <span> 磅蛋糕、布朗尼保存方式可常溫 4 天、冷藏 7 天，稍微回烤2-3分鐘風味更佳。</span>
          <span>戚風蛋糕系列保存方式可冷藏 4 天(可直接享用)</span>
          <span>馬卡龍保存方式為冷藏 7 天，可置於冷凍保存，保存期限 30 天。</span>
          <span>詳細保存方式與期限在商品上有更詳細的說明。</span>
        </li>
        <li>
          <p>‧ 請問有提供客製化尺寸、造型等服務嗎？</p>
          <span>目前並沒有提供客製化蛋糕。</span>
        </li>
        <li>
          <p>‧ 素食可以食用嗎？</p>
          <span>所有蛋糕皆以動物性鮮奶油製作而成，部份含果醬果泥之商品含有吉利丁成分。</span>
        </li>
      </ul>
      <h2 data-space-bottom="1rem">運送相關問題</h2>
        <ul data-space-bottom="3rem">
          <li>
            <p>‧ 商品運送方式為何？ / 消費多少金額可以免運費？ / 請問最快到貨日為幾天？ / 到貨日期及地址可以更動嗎？</p>
            <span>在本站的<a href="#/delivery">宅配需知</a>說明可以得到更多詳細的內容。</span>
          </li>
        </ul>
      <h2 data-space-bottom="1rem">退換貨須知</h2>
      <ul data-space-bottom="3rem">
        <li>
          <p>‧ 收到蛋糕後發現不喜歡可以退貨嗎？</p>
          <span>生鮮食品不適用於消費者保護法第19條，並不享有 7 天鑑賞期。</span>
        </li>
        <li>
          <p>‧ 蛋糕有瑕疵可以退貨嗎？</p>
          <span>為確保食品安全以及所有顧客消費權益，商品一經售出後皆無法受理退貨 ( 包含保存不當問題 ) ；如因商品本身有瑕疵可退換等值商品，恕無法找零及退款。請務必在您收到商品後，立即確認商品狀況，若發現商品在宅配運送中嚴重受損，請拍照存證並聯繫客服，我們將盡快為您處理，除此狀況外不接受退換貨。</span>
        </li>
      </ul>
      <h2 data-space-bottom="1rem">線上客服服務時間</h2>
      <ul data-space-bottom="3rem">
        <li>‧ 線上客服回覆時間：週一 ~ 週五 早上9 : 00 ~ 晚上18 : 00</li>
        <li>‧ 客服聯絡電話：02-2876-7897</li>
        <li>‧ 客服意見反應信箱：season99@gmail.com</li>
      </ul>
    </div>
  </div>
</template>

<script>
import guideLine from '@/components/guideLine.vue'
export default {
  name:'QuestionsAns',
  components:{
    guideLine
  },
  setup(){
    return{

    }
  }
}
</script>