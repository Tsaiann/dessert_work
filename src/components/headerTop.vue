<template>
  <div class="header row vertical">
    <Toast position="center" group="cartGoodsDelete">
      <template #message="slot">
        <div class="row horizontal">
          <div data-width="100%">
            <div class="row vertical center">
              <i class="pi pi-exclamation-circle" style="font-size: 3rem" data-space-bottom="1rem"></i>
              <h4>{{ slot.message.summary }}</h4>
              <nav></nav>
            </div>
            <div class="row horizontal center">
              <Button class="p-button-success" label="取消" @click="onReject('cartGoodsDelete')" data-space-right="1rem"></Button>
              <Button class="p-button-secondary" label="確定" @click="onConfirm(slot.message.ID)"></Button>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <Toast position="center" group="errorBox">
      <template #message="slotProps">
        <div class="row horizontal">
          <div data-width="100%">
            <div class="row vertical center">
              <i class="pi pi-exclamation-triangle" style="font-size: 3rem" data-space-bottom="1rem"></i>
              <h4>{{ slotProps.message.summary }}</h4>
              <nav></nav>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <Toast position="center" group="successBox">
      <template #message="slotProps">
        <div class="row horizontal">
          <div data-width="100%">
            <div class="row vertical center">
              <i class="pi pi-check-circle" style="font-size: 3rem" data-space-bottom="1rem"></i>
              <h4>{{ slotProps.message.summary }}</h4>
              <nav></nav>
            </div>
          </div>
          <i class="pi pi-times" style="font-size: 1rem" @click="handleReset"></i>
        </div>
      </template>
    </Toast>
    <Toast position="center" group="logout">
      <template #message="slot">
        <div class="row horizontal">
          <div data-width="100%">
            <div class="row vertical center">
              <i class="pi pi-exclamation-circle" style="font-size: 3rem" data-space-bottom="1rem"></i>
              <h4>{{ slot.message.summary }}</h4>
              <nav></nav>
            </div>
            <div class="row horizontal center">
              <Button class="p-button-success" label="取消" @click="onReject('logout')" data-space-right="1rem"></Button>
              <Button class="p-button-secondary" label="確定" @click="onConfirmLogout"></Button>
            </div>
          </div>
        </div>
      </template>
    </Toast>
    <div class="container sideTop">
      <input id="checkboxMenu" type="checkbox" v-model="menuChecked" />
      <label for="checkboxMenu" class="customize_menu">
        <div class="media_menu" data-space-right="1rem"></div>
        <div class="side-menu-bg"></div>
        <div class="side-menu">
          <div class="logo">
            <img src="../assets/home/logo.png" alt="logo" />
            <p>Seasonal Fructification</p>
            <i class="pi pi-times"></i>
          </div>
          <div @click="$router.push({ name: 'About' })">關於季菓</div>
          <div class="exception">商品分類</div>
          <ul>
            <li v-for="(item, i) in goodsTypeList" :key="i" @click="routerChange(item.path)">{{ item.name }}</li>
          </ul>
          <div @click="memberRouterChangeMedia">會員專區</div>
          <ul v-if="memberStatus !== null">
            <li v-for="(item, i) in memberList" :key="i" @click="routerChange(item.path)">{{ item.name }}</li>
          </ul>
          <div @click="$router.push({ name: 'QuestionsAns' })">常見Q&A</div>
          <div @click="$router.push({ name: 'FoodData' })">菓實資料庫</div>
        </div>
      </label>
      <div class="logo" @click="$router.push({ name: 'Content' })"></div>
      <h3 @click="$router.push({ name: 'Content' })">Seasonal Fructification</h3>
      <div class="icon row horizontal center">
        <input id="checkboxicon" type="checkbox" v-model="memberChecked" />
        <label for="checkboxicon" class="specs-customize_member">
          <i class="pi pi-user" @click="handleMember">
            <div class="float-block_member" v-if="confirmUserInfo">
              <button class="button_confirm" @click="memberRouter">會員專區</button>
              <button class="button_confirm" @click="logout">登出</button>
            </div>
          </i>
        </label>
        <i class="pi pi-shopping-cart icon_cart" tabindex="0">
          <div class="float-block">
            <h3 v-if="goodsList.length <= 0">您的購物車是空的</h3>
            <div class="float-block_item" v-for="(item, i) in goodsList" :key="i" v-else>
              <div class="row horizontal v_center">
                <img :src="renderCartImg(item.ImageUrls[0].Url)" :alt="item.ImageUrls[0].Ident" />
                <div class="float-block_item__text" data-space-left="1rem">
                  <h2>{{ item.Goods.Name }}</h2>
                  <p>數量： {{ item.Specs[0].Num }}</p>
                </div>
              </div>
              <i class="pi pi-trash" @click="deleteCartData(item.ID)"></i>
            </div>
            <div class="cart-check">
              <button class="button_confirm" @click="goCart" v-if="goodsList.length > 0">立即結帳</button>
              <button class="button_confirm" @click="$router.push({ name: 'Goods' })" v-else>馬上選購</button>
            </div>
          </div>
          <div class="cart_count">
            <p>{{ goodsList.length }}</p>
          </div>
        </i>
        <input id="checkboxSearch" type="checkbox" v-model="searchChecked" />
        <label for="checkboxSearch" class="specs-customize_member">
          <i class="pi pi-search">
            <div class="float-block_search">
              <InputText placeholder="Search" type="text" v-model="search" />
              <button class="button_confirm" @click="handleSearch">搜尋</button>
            </div>
          </i>
        </label>
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
import { ref, reactive, onMounted, inject } from 'vue'
import { getGoodsCart, deleteGoodsCart } from '@/service/api'
import { callApi } from '@/utils/callApi'
import { useRouter } from 'vue-router'
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
    const confirmUserInfo = ref(null)
    const memberStatus = localStorage.getItem('memberInfo')
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
    const memberChecked = ref(false)
    const searchChecked = ref(false)
    const menuChecked = ref(false)
    const goodsTypeList = reactive([
      {
        name: '所有商品',
        path: 'Goods',
        to: '/products/goods'
      },
      {
        name: '熱銷排行',
        path: 'Hot',
        to: '/products/hot'
      },
      {
        name: '戚風蛋糕',
        path: 'Chiffon',
        to: '/products/chiffon'
      },
      {
        name: '杯子蛋糕',
        path: 'Cupcake',
        to: '/products/cupcake'
      },
      {
        name: '馬卡龍',
        path: 'Macaron',
        to: '/products/macaron'
      },
      {
        name: '其他',
        path: 'Other',
        to: '/products/other'
      }
    ])
    const memberList = reactive([
      {
        name: '我的帳戶',
        path: 'Homepage',
        to: '/member/homepage'
      },
      {
        name: '訂單查詢',
        path: 'Order',
        to: '/member/order'
      },
      {
        name: '收藏清單',
        path: 'Like',
        to: '/member/like'
      },
      {
        name: '專屬優惠',
        path: 'Discount',
        to: '/member/discount'
      }
    ])
    // 獲得所有購物車資料
    const getCartData = onMounted(() => {
      const memberInfo = localStorage.getItem('memberInfo')
      if (memberInfo === null) {
        return
      } else {
        confirmUserInfo.value = true
        const data = ''
        callApi(getGoodsCart, data, (res) => {
          goodsList.value = [...res.data.Data]
        })
      }
    })
    // 點擊會員icon判斷有沒有登入會員跳換路由
    const handleMember = () => {
      const memberInfo = localStorage.getItem('memberInfo')
      if (memberInfo === null) {
        router.push({ name: 'User' })
      }
    }
    // 判斷menu中會員是否登入來跳轉路由
    const memberRouterChange = onMounted(() => {
      const memberInfo = localStorage.getItem('memberInfo')
      if (memberInfo === null) {
        routerList[2].to = '/user'
      } else {
        routerList[2].to = '/member'
      }
    })
    // 判斷menu中會員是否登入來跳轉路由(手機)
    const memberRouterChangeMedia = () => {
      const memberInfo = localStorage.getItem('memberInfo')
      if (memberInfo === null) {
        router.push({ name: 'User' })
      } else {
        return
      }
    }
    // 刪除購物車商品
    const deleteCartData = async (id) => {
      toast.add({ severity: 'success', summary: '確定要刪除商品？', group: 'cartGoodsDelete', ID: id })
    }
    const onReject = (name) => {
      toast.removeGroup(name)
    }
    const onConfirm = async (id) => {
      const data = { ID: id }
      await callApi(deleteGoodsCart, data, () => {
        toast.add({ severity: 'success', summary: '刪除成功！', group: 'successBox' })
        toast.removeGroup('cartGoodsDelete')
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
    // 購物車結帳功能
    const goCart = () => {
      router.push({ name: 'Cart' })
    }
    //登出會員
    const logout = () => {
      toast.add({ severity: 'success', summary: '確定要登出嗎？', group: 'logout' })
    }
    const onConfirmLogout = () => {
      localStorage.clear()
      router.push({ name: 'User' })
      memberChecked.value = false
      reload()
    }
    //會員詳情
    const memberRouter = () => {
      router.push({ name: 'Homepage' })
      memberChecked.value = false
    }
    //當點擊空白處可取消checkbox勾選
    const closeCheckbox = onMounted(() => {
      document.addEventListener('click', (e) => {
        const iconEl = document.querySelector('.float-block_member')
        if (iconEl && !iconEl.contains(e.target)) {
          memberChecked.value = false
        }
      })
    })
    const handleReset = async () => {
      await reload()
    }
    const onConfirmLike = async (id) => {
      const data = { GoodsID: id }
      await callApi(deleteLikeList, data, () => {
        toast.add({ severity: 'success', summary: '刪除成功！', group: 'successBox' })
        toast.removeGroup('likeDelete')
        getLikeList()
      })
    }
    //media點擊時跳轉到相對應的路由
    const routerChange = async (path) => {
      await router.push({ name: path })
      await reload()
    }
    return {
      search,
      memberRouterChange,
      goodsCount,
      getCartData,
      searchChecked,
      memberStatus,
      memberList,
      closeCheckbox,
      menuChecked,
      routerList,
      goodsList,
      memberChecked,
      confirmUserInfo,
      goodsTypeList,
      routerChange,
      handleMember,
      deleteCartData,
      onReject,
      onConfirm,
      renderCartImg,
      handleSearch,
      goCart,
      logout,
      memberRouter,
      handleReset,
      onConfirmLogout,
      onConfirmLike,
      memberRouterChangeMedia
    }
  }
}
</script>
