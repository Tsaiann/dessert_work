<template>
  <div class="header row vertical">
    <Toast position="center" group="bc">
      <template #message="slotProps">
        <div class="row horizontal">
          <div data-width="100%">
            <div class="row vertical center" data-space-bottom="1rem">
              <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
              <h4>{{ slotProps.message.summary }}</h4>
              <p>{{ slotProps.message.detail }}</p>
            </div>
            <div class="row horizontal center">
              <Button class="p-button-success" label="是" @click="onConfirm(slotProps.message.ID)" data-space-right="1rem"></Button>
              <Button class="p-button-secondary" label="否" @click="onReject"></Button>
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
                <img :src="item.ImageUrls[0].Url" alt="aaa" />
                <div class="float-block_item__text" data-space-left="1rem">
                  <h2>原味戚風蛋糕</h2>
                  <p>四吋</p>
                </div>
                <div class="float-block_item__count" data-space-left="1.5rem">
                  <p>數量： {{ item.ItemNum }}</p>
                </div>
              </div>
              <i class="pi pi-trash" @click="deleteCartData(item.ID)"></i>
            </div>
            <div class="cart-check">
              <button class="button_submit confirm" @click="$router.push({ name: 'Cart' })">立即結帳</button>
            </div>
          </div>
        </i>
      </div>
    </div>
    <div class="menu">
      <Menubar :model="routerList">
        <template #end>
          <img src="../assets/home/icon_search.png" alt="search" />
          <InputText placeholder="Search" type="text" />
        </template>
      </Menubar>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { getGoodsCart, deleteGoodsCart } from '@/service/api'
import { callApi } from '@/utils/callApi'
import { useRouter } from 'vue-router'
import { resetForm } from '../utils/resetForm'
import { useToast } from 'primevue/usetoast'

export default {
  name: 'headerTop',
  setup() {
    const router = useRouter()
    const toast = useToast()
    const goodsList = ref([])
    const goodsCount = ref(1)
    const floatBlockState = ref(false)
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
    const getCartData = onMounted(() => {
      const data = ''
      callApi(getGoodsCart, data, (res) => {
        goodsList.value = [...res.data.Data]
        console.log(goodsList.value)
      })
    })
    const handleCart = () => {
      if (floatBlockState === false) {
        floatBlockState === true
      } else {
        router.push({ name: 'Cart' })
        floatBlockState === false
      }
    }
    const handleMember = () => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo === null) {
        router.push({ name: 'User' })
      } else {
        router.push({ name: 'Member' })
      }
    }
    const memberRouterChange = onMounted(() => {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo === null) {
        routerList[2].to = '/user'
      } else {
        routerList[2].to = '/member'
      }
    })
    const deleteCartData = async (id) => {
      toast.add({ severity: 'warn', summary: '確定要刪除商品？', group: 'bc', ID: id })
    }
    const onReject = () => {
      toast.removeGroup('bc')
    }
    const onConfirm = async (id) => {
      const data = { ID: id }
      await callApi(deleteGoodsCart, data, () => {
        toast.add({ severity: 'success', summary: '已刪除', detail: 'Message Content' })
        toast.removeGroup('bc')
        getCartData()
      })
    }
    return {
      routerList,
      goodsList,
      floatBlockState,
      handleMember,
      memberRouterChange,
      handleCart,
      goodsCount,
      getCartData,
      deleteCartData,
      onReject,
      onConfirm
    }
  }
}
</script>
