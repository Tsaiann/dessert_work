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
      <Carousel :value="products" :numVisible="4" :numScroll="3" :responsiveOptions="responsiveOptions">
        <template #header>
          <div class="row vertical center" data-space-bottom="3rem">
            <p data-space-bottom="1rem">熱銷排名</p>
          </div>
        </template>
        <template #item="slotProps">
          <div class="product-item">
            <div class="product-item-content">
              <div class="mb-3">
                <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.name" class="product-image" />
              </div>
              <div>
                <h4 class="mb-1">{{ slotProps.data.name }}</h4>
                <h6 class="mt-0 mb-3">${{ slotProps.data.price }}</h6>
                <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{ slotProps.data.inventoryStatus }}</span>
                <div class="car-buttons mt-5">
                  <Button icon="pi pi-search" class="p-button p-button-rounded mr-2" />
                  <Button icon="pi pi-star-fill" class="p-button-success p-button-rounded mr-2" />
                  <Button icon="pi pi-cog" class="p-button-help p-button-rounded" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
    <div class="cakeType">
      <div class="item">
        <img src="../assets/home/cake_kind01.png" alt="a kind of cake" />
        <p>戚風蛋糕</p>
        <span>Chiffon cake</span>
      </div>
      <div class="item">
        <img src="../assets/home/cake_kind02.png" alt="a kind of cake" />
        <p>杯子蛋糕</p>
        <span>Cupcake</span>
      </div>
      <div class="item">
        <img src="../assets/home/cake_kind03.png" alt="a kind of cake" />
        <p>馬卡龍</p>
        <span>Macaron</span>
      </div>
    </div>
    <div class="container autoCenter"><img src="../assets/home/shape02.png" alt="shape" width="1000px" /></div>
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
import { ref, reactive, computed, onMounted, onBeforeMount } from 'vue'
import Button from 'primevue/button'
import Carousel from 'primevue/carousel'

export default {
  name: 'Content',
  components: {
    Button,
    Carousel
  },
  setup() {
    let homeImgs = [{ src: require('../assets/home/home01.png') }, { src: require('../assets/home/home02.png') }, { src: require('../assets/home/home03.png') }]
    let showHomeImg = ref(0)
    let transitionName = ref('right-in')
    let currentIndex = ref(0)

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
    const products = ref([
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4
      },
      {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        description: 'Product Description',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3
      },
      {
        id: '1003',
        code: '244wgerg2',
        name: 'Blue T-Shirt',
        description: 'Product Description',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Clothing',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1004',
        code: 'h456wer53',
        name: 'Bracelet',
        description: 'Product Description',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        rating: 4
      },
      {
        id: '1005',
        code: 'av2231fwg',
        name: 'Brown Purse',
        description: 'Product Description',
        image: 'brown-purse.jpg',
        price: 120,
        category: 'Accessories',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4
      },
      {
        id: '1006',
        code: 'bib36pfvm',
        name: 'Chakra Bracelet',
        description: 'Product Description',
        image: 'chakra-bracelet.jpg',
        price: 32,
        category: 'Accessories',
        quantity: 5,
        inventoryStatus: 'LOWSTOCK',
        rating: 3
      },
      {
        id: '1007',
        code: 'mbvjkgip5',
        name: 'Galaxy Earrings',
        description: 'Product Description',
        image: 'galaxy-earrings.jpg',
        price: 34,
        category: 'Accessories',
        quantity: 23,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1008',
        code: 'vbb124btr',
        name: 'Game Controller',
        description: 'Product Description',
        image: 'game-controller.jpg',
        price: 99,
        category: 'Electronics',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 4
      },
      {
        id: '1009',
        code: 'cm230f032',
        name: 'Gaming Set',
        description: 'Product Description',
        image: 'gaming-set.jpg',
        price: 299,
        category: 'Electronics',
        quantity: 63,
        inventoryStatus: 'INSTOCK',
        rating: 3
      }
    ])
    const responsiveOptions = ref([
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '600px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1
      }
    ])
    return {
      homeImgs,
      showHomeImg,
      transitionName,
      setShow,
      currentIndex,
      responsiveOptions,
      products
    }
  }
}
</script>
