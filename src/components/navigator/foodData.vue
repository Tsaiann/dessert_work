<template>
  <div class="foodData container">
    <guideLine :data="guideData" />
    <div data-space-bottom="3rem">
      <div class="row vertical center" data-space-bottom="4rem">
        <h1 data-space-bottom="1rem">安心嚴選 。 品質保證</h1>
        <p>堅持使用當季新鮮水果與嚴選食材，用最安心的食材、最仔細的手法，經過不斷地嘗試、實驗，呈現給您最好的風味與品質。</p>
      </div>
      <div class="card">
        <div>
          <h2>石安牧場動福蛋</h2>
          <p>不使用抗生素及動物用藥品質保證的鮮蛋。</p>
        </div>
        <img src="../../assets/other/foodData_egg.png" alt="egg" />
      </div>
      <div class="card reverse">
        <img src="../../assets/other/foodData_sugar.png" alt="sugar" />
        <div>
          <h2>日本上原海藻糖</h2>
          <p>可抑制澱粉老化，保持口感滑順柔軟且甜度為砂糖的一半，可以使其甜而不膩口。</p>
        </div>
      </div>
      <div class="card">
        <div>
          <h2>日本菓子粉</h2>
          <p>純小麥製作，100%純天然無人工添加物。</p>
        </div>
        <img src="../../assets/other/foodData_flour.png" alt="flour" />
      </div>
      <div class="card reverse">
        <img src="../../assets/other/foodData_butter.png" alt="butter" />
        <div>
          <h2>依思尼無鹽發酵奶油條</h2>
          <p>嚴格溫控長達近20小時的緩慢發酵熟成，成品入口即化更帶有榛果與奶香的特殊風味。</p>
        </div>
      </div>
      <div class="card">
        <div>
          <h2>法芙娜黑巧克力</h2>
          <p>口感雖然純粹，但極富層次感。濃厚醇香，順滑如絲，甘甜悠長。</p>
        </div>
        <img src="../../assets/other/foodData_chocolate.png" alt="chocolate" />
      </div>
      <div class="row vertical center bowl">
        <img src="../../assets/other/foodData_bowl.png" alt="bowl" />
      </div>
    </div>
  </div>
</template>

<script>
import guideLine from '@/components/guideLine.vue'
import { reactive } from 'vue'

export default {
  name: 'FoodData',
  components: {
    guideLine
  },
  setup() {
    const guideData = reactive([
      {
        label: '菓實資料庫',
        to: '/foodData'
      }
    ])
    return {
      guideData
    }
  }
}
</script>
