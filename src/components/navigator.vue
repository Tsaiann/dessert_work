<template>
  <div class="navigator row vertical">
    <div class="row vertical v_center header">
      <div class="logo"><img src="../assets/home/logo.png" alt="logo" width="70px"></div>
        <p>Seasonal Fructification</p>
        <div class="icon row horizontal">
          <img src="../assets/home/icon_user.png" alt="user" width="30px">
          <img src="../assets/home/icon_cart.png" alt="cart" width="45px">
          <img src="../assets/home/icon_search.png" alt="search" width="35px">
        </div>
    </div>
    <div class="menu">
      <ul class="row horizontal space_between">
        <li>關於季菓</li>
        <li>商品分類</li>
        <li>會員專區</li>
        <li>常見Q&A</li>
        <li>菓食資料庫</li>
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