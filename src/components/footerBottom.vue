<template>
  <div class="footerBottom">
    <div class="footer container">
      <div class="logo">
        <img src="../assets/home/logo.png" alt="logo">
        <p>Seasonal Fructification</p>
      </div>
      <div class="contact">
        <p>聯絡我們</p>
        <ul>
          <li>服務時間:9:00 - 18:00</li>
          <li>客服專線:02-2876-7897</li>
          <li>客服信箱:season99@gmail.com</li>
        </ul>
      </div>
      <div class="contact serve">
        <p>客戶服務</p>
        <ul>
          <li @click="$router.push({name:'Delivery'})">宅配須知</li>
          <li @click="$router.push({name:'Private'})">服務條款細則與隱私權保護</li>
          <li @click="$router.push({name:'Return'})">退換貨政策</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footerBottom',
  setup(){
    return{

    }
  }
}
</script>