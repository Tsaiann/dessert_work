<template>
  <div class="header row vertical">
    <div class="row vertical v_center container sideTop">
      <div class="logo" @click="$router.push({name:'Content'})"></div>
      <p @click="$router.push({name:'Content'})">Seasonal Fructification</p>
      <div class="icon row horizontal center">
        <div class="icon_user"></div>
        <div class="icon_cart"></div>
      </div>
    </div>
    <div class="menu">
      <div class=" row horizontal v_center space_between">
        <ul class="row horizontal">
          <li @click="$router.push({name:'About'})">關於季菓</li>
          <li @click="$router.push({name:'Products'})">商品分類</li>
          <li @click="$router.push({name:'User'})">會員專區</li>
          <li @click="$router.push({name:'QuestionsAns'})">常見Q&A</li>
          <li @click="$router.push({name:'FoodData'})">菓食資料庫</li>
        </ul>
        <div>
          <input type="text" placeholder="請輸入商品名稱">
          <img src="../assets/home/icon_search.png" alt="search">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerTop',
  components: {
    
  },
  setup(){
    return{

    }
  }
}
</script>