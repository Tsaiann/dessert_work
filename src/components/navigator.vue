<template>
  <div class="navigator row vertical mb_9">
    <div class="row vertical v_center container header mb_5">
      <div class="logo"><img src="../assets/home/logo.png" alt="logo" width="70px"></div>
        <p>Seasonal Fructification</p>
        <div class="icon row horizontal">
          <img src="../assets/home/icon_user.png" alt="user" width="30px">
          <img src="../assets/home/icon_cart.png" alt="cart" width="45px">
          <img src="../assets/home/icon_search.png" alt="search" width="35px">
        </div>
    </div>
    <div class="menu">
      <ul class="row horizontal space_between container">
        <li @click="$router.push({name:'About'})">關於季菓</li>
        <li @click="$router.push({name:'Products'})">商品分類</li>
        <li @click="$router.push({name:'User'})">會員專區</li>
        <li @click="$router.push({name:'QA'})">常見Q&A</li>
        <li @click="$router.push({name:'FoodData'})">菓食資料庫</li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigator',
  components: {
    
  },
  setup(){
    return{

    }
  }
}
</script>