<template>
  <div class="content">
    <div class="homePhoto" data-space-bottom="3rem">
      <div>
        <img src="../assets/home/home01.png" alt="" />
      </div>
      <transition-group tag="div" :name="transitionName">
        <div class="carousel" v-for="(img, index) of homeImgs" :key="index" v-show="index === showHomeImg">
          <img :src="img.src" />
        </div>
      </transition-group>
      <div class="prev" @click="setShow(showHomeImg - 1)"></div>
      <div class="next" @click="setShow(showHomeImg + 1)"></div>
      <ul class="row horizontal">
        <li v-for="(item, i) of homeImgs" :key="i" @click="setShow(i)" :class="{ currentPage: currentIndex === i }"></li>
      </ul>
    </div>
    <div class="card">
      <Carousel :value="state.goodsList" :numVisible="4" :numScroll="3" :responsiveOptions="responsiveOptions">
        <template #header>
          <div class="row vertical center" data-space-bottom="3rem">
            <p data-space-bottom="1rem">熱銷排名</p>
          </div>
        </template>
        <template #item="slotProps">
          <div class="product-item" @click="checkGoodsDetail(slotProps.data.ID)">
            <div class="product-item-content">
              <div>
                <img :src="slotProps.data.ImageUrls[0].Url" alt="" />
              </div>
              <div>
                <h4>{{ slotProps.data.Name }}</h4>
                <h6>NT {{ slotProps.data.UnitPrice }}</h6>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
    <div class="cakeType">
      <div class="item" @click="$router.push({ name: 'Chiffon' })">
        <img src="../assets/home/cake_kind01.png" alt="a kind of cake" />
        <p>戚風蛋糕</p>
        <span>Chiffon cake</span>
      </div>
      <div class="item" @click="$router.push({ name: 'Cupcake' })">
        <img src="../assets/home/cake_kind02.png" alt="a kind of cake" />
        <p>杯子蛋糕</p>
        <span>Cupcake</span>
      </div>
      <div class="item" @click="$router.push({ name: 'Macaron' })">
        <img src="../assets/home/cake_kind03.png" alt="a kind of cake" />
        <p>馬卡龍</p>
        <span>Macaron</span>
      </div>
    </div>
    <ul class="brand container" data-space-bottom="3rem">
      <li class="row vertical" @click="$router.push({ name: 'About' })">
        <div class="icon-brand"></div>
        <p>品牌故事</p>
      </li>
      <li class="row vertical" @click="$router.push({ name: 'Delivery' })">
        <div class="icon-delivery"></div>
        <p>宅配需知</p>
      </li>
      <li class="row vertical" @click="$router.push({ name: 'Return' })">
        <div class="icon-return"></div>
        <p>退換貨政策</p>
      </li>
      <li class="row vertical" @click="$router.push({ name: 'Private' })">
        <div class="icon-private"></div>
        <p>隱私權</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { getGoodsList } from 'services/api'
import { callApi } from 'utils/callApi'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'HomeContent',
  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      goodsList: [],
      goodsListSearch: {
        ID: 0,
        Page: 0,
        PageLimit: 10,
        GoodsName: '',
        GoodsType: 0
      }
    })
    const homeImgs = reactive([
      {
        src: require('../assets/home/home01.png')
      },
      {
        src: require('../assets/home/home02.png')
      },
      {
        src: require('../assets/home/home03.png')
      }
    ])
    let showHomeImg = ref(0)
    let transitionName = ref('right-in')
    let currentIndex = ref(0)
    const responsiveOptions = ref([
      {
        breakpoint: '800px',
        numVisible: 3,
        numScroll: 2
      },
      {
        breakpoint: '603px',
        numVisible: 2,
        numScroll: 2
      }
    ])
    const setShow = (index) => {
      if (index < 0) {
        transitionName.value = 'left-in'
        showHomeImg.value = homeImgs.length - 1
        currentIndex.value = homeImgs.length - 1
      } else if (index > homeImgs.length - 1) {
        transitionName.value = 'right-in'
        showHomeImg.value = 0
        currentIndex.value = 0
      } else {
        transitionName.value = showHomeImg.value < index ? 'right-in' : 'left-in'
        showHomeImg.value = index
        currentIndex.value = index
      }
    }
    const getAllGoodsList = onMounted(async () => {
      const data = state.goodsListSearch
      callApi(getGoodsList, data, (res) => {
        state.goodsList = [...res.data.Data]
        console.log(state.goodsList)
      })
    })
    const checkGoodsDetail = (id) => {
      store.commit('goodsModules/SET_GOODSDETAIL', id)
      const specialIds = [47, 48, 49, 50, 51, 52]
      const route = {
        name: specialIds.includes(id) ? 'SpecsDetail' : 'GoodsDetail'
      }
      router.push(route)
    }
    return {
      state,
      homeImgs,
      showHomeImg,
      transitionName,
      currentIndex,
      responsiveOptions,
      getAllGoodsList,
      checkGoodsDetail,
      setShow
    }
  }
}
</script>
