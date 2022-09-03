<template>
  <div class="header row vertical">
    <Toast position="center" group="cart">
      <template #message="slot">
        <div class="row horizontal">
          <div data-width="100%">
            <div class="row vertical center" data-space-bottom="1rem">
              <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
              <h4>{{ slot.message.summary }}</h4>
              <p>{{ slot.message.detail }}</p>
            </div>
            <div class="row horizontal center">
              <Button class="p-button-success" label="是" @click="onConfirm(slot.message.ID)" data-space-right="1rem"></Button>
              <Button class="p-button-secondary" label="否" @click="onReject()"></Button>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <Toast position="center" group="confirm">
      <template #message="slotProps">
        <div class="row horizontal">
          <div data-width="100%">
            <div class="row vertical center" data-space-bottom="1rem">
              <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
              <h4>{{ slotProps.message.summary }}</h4>
              <p>{{ slotProps.message.detail }}</p>
            </div>
            <div class="row horizontal center">
              <Button class="p-button-success" label="是" @click="onConfirmCart"></Button>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <div class="row vertical v_center container sideTop">
      <div class="logo" @click="$router.push({ name: 'Content' })"></div>
      <h3 @click="$router.push({ name: 'Content' })">Seasonal Fructification</h3>
      <div class="icon row horizontal center">
        <i class="pi pi-user" @click="handleMember"></i>
        <i class="pi pi-shopping-cart icon_cart" tabindex="0">
          <div class="float-block">
            <h3 v-if="goodsList.length <= 0">您的購物車是空的</h3>
            <div class="float-block_item" v-for="(item, i) in goodsList" :key="i" v-else>
              <div class="row horizontal v_center">
                <img :src="renderCartImg(item.ImageUrls[0].Url)" alt="aaa" />
                <div class="float-block_item__text" data-space-left="1rem">
                  <h2>{{ item.Goods.Name }}</h2>
                  <p>數量： {{ item.Specs[0].Num }}</p>
                </div>
              </div>
              <i class="pi pi-trash" @click="deleteCartData(item.ID)"></i>
            </div>
            <div class="cart-check">
              <button class="button_submit confirm" @click="goCart">立即結帳</button>
            </div>
          </div>
          <div class="cart_count">
            <p>{{ goodsList.length }}</p>
          </div>
        </i>
      </div>
    </div>
    <div class="menu">
      <Menubar :model="routerList">
        <template #end>
          <img src="../assets/home/icon_search.png" alt="search" @click="handleSearch" />
          <InputText placeholder="Search" type="text" v-model="search" />
        </template>
      </Menubar>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, inject } from 'vue'
import { getGoodsCart, deleteGoodsCart } from '@/service/api'
import { callApi } from '@/utils/callApi'
import { useRouter } from 'vue-router'
import { resetForm } from '../utils/resetForm'
import { useToast } from 'primevue/usetoast'

export default {
  name: 'headerTop',
  setup() {
    const reload = inject('reload')
    const router = useRouter()
    const toast = useToast()
    const goodsList = ref([])
    const goodsCount = ref(1)
    const search = ref('')
    const routerList = reactive([
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
        to: '/user'
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
    // 獲得所有購物車資料
    const getCartData = onMounted(() => {
      const data = ''
      callApi(getGoodsCart, data, (res) => {
        goodsList.value = [...res.data.Data]
        console.log(goodsList.value)
      })
    })
    // 點擊會員icon判斷有沒有登入會員跳換路由
    const handleMember = () => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo === null) {
        router.push({ name: 'User' })
      } else {
        router.push({ name: 'Member' })
      }
    }
    // 判斷menu中會員是否登入來跳轉路由
    const memberRouterChange = onMounted(() => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo === null) {
        routerList[2].to = '/user'
      } else {
        routerList[2].to = '/member'
      }
    })
    // 刪除購物車商品
    const deleteCartData = async (id) => {
      toast.add({ severity: 'warn', summary: '確定要刪除商品？', group: 'cart', ID: id })
    }
    const onReject = () => {
      toast.removeGroup('bc')
    }
    const onConfirm = async (id) => {
      const data = { ID: id }
      await callApi(deleteGoodsCart, data, () => {
        toast.add({ severity: 'success', summary: '已刪除', detail: 'Message Content' })
        toast.removeGroup('cart')
        getCartData()
      })
    }
    //傳回來的圖片加上正確網址
    const renderCartImg = (img) => {
      return process.env.VUE_APP_BASE_API + '/imgs/' + img
    }
    // 搜尋框功能
    const handleSearch = () => {
      router
        .push({
          name: 'Goods',
          params: {
            search: search.value
          }
        })
        .then(() => {
          reload()
        })
    }
    // 購物車結帳功能（會員/非會員）
    const goCart = () => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo === null) {
        toast.add({ severity: 'warn', summary: '請先登入會員！', group: 'confirm' })
      } else {
        router.push({ name: 'Cart' })
      }
    }
    const onConfirmCart = () => {
      router.push({ name: 'User' })
      toast.removeGroup('confirm')
    }
    return {
      routerList,
      goodsList,
      handleMember,
      memberRouterChange,
      goodsCount,
      getCartData,
      deleteCartData,
      onReject,
      onConfirm,
      renderCartImg,
      search,
      handleSearch,
      goCart,
      onConfirmCart
    }
  }
}
</script>
