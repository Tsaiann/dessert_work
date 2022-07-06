<template>
  <div class="header row vertical">
    <div class="row vertical v_center container sideTop">
      <div class="logo" @click="$router.push({ name: 'Content' })"></div>
      <p @click="$router.push({ name: 'Content' })">Seasonal Fructification</p>
      <div class="icon row horizontal center">
        <div class="icon_user"></div>
        <div class="icon_cart"></div>
      </div>
    </div>
    <div class="menu">
      <Menubar :model="items">
        <template #end>
          <img src="../assets/home/icon_search.png" alt="search" />
          <InputText placeholder="Search" type="text" />
        </template>
      </Menubar>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'

export default {
  name: 'headerTop',
  components: {
    Menubar,
    InputText
  },
  setup() {
    const items = ref([
      {
        label: '關於季菓',
        to: '/about'
      },
      {
        label: '商品分類',
        items: [
          {
            label: '所有商品',
            to: '/products/goods'
          },
          {
            label: '熱銷排行',
            to: '/products/hot'
          },
          {
            label: '戚風蛋糕',
            to: '/products/chiffon'
          },
          {
            label: '杯子蛋糕',
            to: '/products/cupcake'
          },
          {
            label: '馬卡龍',
            to: '/products/macaron'
          },
          {
            label: '其他',
            to: '/products/other'
          }
        ]
      },
      {
        label: '會員專區',
        to: '/user/login'
      },
      {
        label: '常見Q&A',
        to: '/questionsAns'
      },
      {
        label: '菓實資料庫',
        to: '/foodData'
      }
    ])
    return {
      items
    }
  }
}
</script>
