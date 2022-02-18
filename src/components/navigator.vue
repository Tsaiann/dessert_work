<template>
  <div class="navigator row vertical mb_9">
    <div class="row vertical v_center container header mb_5">
      <div class="logo" @click="$router.push({name:'Content'})"></div>
      <p @click="$router.push({name:'Content'})">Seasonal Fructification</p>
      <div class="icon row horizontal space_between">
        <div class="icon_user"></div>
        <div class="icon_cart"></div>
        <div class="icon_search"></div>
      </div>
    </div>
    <div class="menu">
      <ul class="row horizontal space_between container">
        <li @click="$router.push({name:'About'})">關於季菓</li>
        <li @click="$router.push({name:'Products'})">商品分類</li>
        <li @click="$router.push({name:'User'})">會員專區</li>
        <li @click="$router.push({name:'QuestionsAns'})">常見Q&A</li>
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