<template>
  <div class="container products">
    <guideLine :data="guideData" />
    <Toast position="center" />
    <div class="goods-main">
      <div class="row horizontal center">
        <div data-width="70%" data-space-right="2rem">
          <Galleria :value="images" :numVisible="3">
            <template #item="slotProps">
              <img :src="slotProps.item.src" :alt="slotProps.item.alt" />
            </template>
            <template #thumbnail="slotProps">
              <img :src="slotProps.item.src" :alt="slotProps.item.alt" />
            </template>
          </Galleria>
        </div>
        <div class="goods-main-content">
          <h2>法式卡士達草莓塔</h2>
          <hr />
          <p>建議售價 NT120</p>
          <div class="specs">
            <div class="row horizontal bottom_left" data-space-bottom="2rem">
              <h3 data-space-right="1rem">選擇規格</h3>
              <span>( 可選1種 )</span>
            </div>
            <input id="checkbox" type="checkbox" />
            <label for="checkbox" class="specs-customize">四吋</label>
          </div>
          <div>
            <h3>購買數量</h3>
            <div class="goods-main-content__count" data-space-left="1.5rem">
              <i class="pi pi-minus" @click="countChange('minus')"></i>
              <InputNumber class="p-inputtext-sm" v-model="state.cartForm.ItemNum" />
              <i class="pi pi-plus" style="color: red" @click="countChange('plus')"></i>
            </div>
            <Textarea v-model="state.remark" rows="5" cols="30" data-width="100%" placeholder="有任何額外需求請打在此處" />
            <div class="like">
              <i class="pi pi-heart" data-space-left="1rem"></i>
              <span data-space-left="0.5rem" @click="handleAddLike">加入到收藏清單</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row horizontal center" data-space-bottom="2rem" data-space-top="2rem">
        <button class="button_submit normal" data-width="50%" @click="addCart()">加入購物車</button>
        <button class="button_submit confirm" data-width="50%" @click="handleBuy()">直接購買</button>
      </div>
    </div>
    <div class="goods-data">
      <div class="row horizontal center" data-space-bottom="1rem">
        <h1 data-width="50%">商品詳細資訊</h1>
        <h1 data-width="50%" @click="$router.push({ name: 'Delivery' })">送貨及付款方式</h1>
      </div>
      <div class="wire"></div>
      <h2>商品詳細資訊</h2>
      <p data-space-bottom="2rem">
        ＊ 產品皆為手工製作，需要7個工作天出貨，請提早訂購。<br />＊ 請謹慎選擇日期&數量。下單後『 訂單不接受追加、提前或延後出貨
        』如更改訂單需收150元人工處理單件費用。<br />＊ 出貨後2天內會到貨 ，時間將會依照黑貓物流業者當日之 路況 / 車況 / 貨運量而定。
      </p>
      <p data-space-bottom="1rem">
        歷史悠久的馬卡龍（Macaron），粉嫩圓潤的造型，帶著美麗的裙邊，總是輕易擄獲人心。<br />酥脆外殼、軟糯卻不黏牙的內餡，加上主廚精心設計、甜而不膩的口味搭配，送禮自用兩相宜！
      </p>
      <p data-space-bottom="1rem">
        馬卡龍禮盒 ( 8入 / 盒 ) 可任選八種口味<br />＊來點茶：鐵觀音/奶茶 / 伯爵茶 / 抹茶 / 紅茶 <br />＊來點酒：貝禮詩香甜酒 / 卡嚕哇咖啡酒 /君度橙酒<br />
        ＊來點水果：荔枝 水蜜桃 / 草莓 / 柚子 / 葡萄柚<br />＊經典口味：巧克力 / 檸檬 / 焦糖 / 玫瑰 / 薰衣草 / 黑醋栗 / 香草
      </p>
      <p data-space-bottom="2rem">紙盒尺寸：10cm(長)10cm(寬)5.5cm(高)</p>
      <p>
        ※ 食用前冷藏取出靜置回溫20分鐘，冷凍取出靜置回溫30分鐘，待外殼與內餡軟硬適中，口感最佳。<br />※ 產品皆為蛋奶素。<br />※ 室溫下不建議放至超過３小時 ，
        每種口味成分不同 ，軟化程度不同。<br />※ 馬卡龍需冷藏保存，最佳賞味期限4天，保存期限7天，可置於冷凍保存，保存期限30天 <br />※
        馬卡龍冷凍退冰後，請盡速食用完畢。不建議再放置冷凍，以免影響口感及衛生。
      </p>
    </div>
    <div class="goods-about">
      <div>
        <h1 data-width="100%" data-space-bottom="1rem">相關產品</h1>
        <div class="wire"></div>
      </div>
      <div class="goods-about_item">
        <div class="row vertical center">
          <img src="../../assets/goods/strawberry.jpeg" alt="" />
          <h2>馬卡龍禮盒</h2>
          <p>NT 580</p>
        </div>
        <div class="row vertical center">
          <img src="../../assets/goods/strawberry.jpeg" alt="" />
          <h2>馬卡龍禮盒</h2>
          <p>NT 580</p>
        </div>
        <div class="row vertical center">
          <img src="../../assets/goods/strawberry.jpeg" alt="" />
          <h2>馬卡龍禮盒</h2>
          <p>NT 580</p>
        </div>
        <div class="row vertical center">
          <img src="../../assets/goods/strawberry.jpeg" alt="" />
          <h2>馬卡龍禮盒</h2>
          <p>NT 580</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, inject } from 'vue'
import { addGoodsCart, addLikeList } from '@/service/api'
import { callApi } from '@/utils/callApi'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import guideLine from '@/components/guideLine.vue'

export default {
  name: 'GoodsDetail',
  components: {
    guideLine
  },
  setup() {
    const reload = inject('reload')
    const toast = useToast()
    const router = useRouter()
    const state = reactive({
      goodsList: [],
      remark: '',
      cartForm: {
        GoodsID: 37,
        ItemNum: 1,
        Specs: [
          {
            SpecID: 56,
            Num: 1
          }
        ]
      }
    })
    const guideData = reactive([
      {
        label: '所有商品',
        to: '/products'
      }
    ])
    const images = reactive([
      {
        src: require('../../assets/goods/strawberry.jpeg'),
        alt: 'strawberry tart'
      },
      {
        src: require('../../assets/goods/strawberry.jpeg'),
        alt: 'strawberry tart'
      },
      {
        src: require('../../assets/goods/strawberry.jpeg'),
        alt: 'strawberry tart'
      }
    ])
    const countChange = (name) => {
      if (name === 'plus' && state.cartForm.ItemNum < 99) {
        state.cartForm.ItemNum += 1
      } else if (name === 'minus' && state.cartForm.ItemNum > 1) {
        state.cartForm.ItemNum -= 1
      }
    }
    const addCart = async () => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo !== null) {
        const data = state.cartForm
        callApi(addGoodsCart, data, () => {
          toast.add({ severity: 'success', summary: '新增成功！', detail: 'Message Content' })
          reload()
        })
      } else {
        toast.add({ severity: 'error', summary: '請先登入會員！', detail: 'Message Content' })
      }
    }
    const handleBuy = async () => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo !== null) {
        console.log(userInfo)
        const data = state.cartForm
        await callApi(addGoodsCart, data, () => {
          router.push({ name: 'Cart' })
        })
        await reload()
      } else {
        toast.add({ severity: 'error', summary: '請先登入會員！', detail: 'Message Content' })
      }
    }
    const handleAddLike = () => {
      const data = { GoodsID: 37 }
      callApi(addLikeList, data, (res) => {
        console.log(res)
      })
    }
    return {
      state,
      guideData,
      images,
      countChange,
      addCart,
      handleBuy,
      handleAddLike
    }
  }
}
</script>
