<template>
  <div class="content">
    <div class="homePhoto mb_9">
      <img src="../assets/home/home.png" alt="home_photo">
    </div>
    <div class="row vertical mb_7">
      <div class="mb_7 autoCenter row vertical center">
        <p class="mb_1">熱銷排名</p>
        <img src="../assets/home/shape01.png" alt="shape" width="150px">
      </div>
      <ul class="row horizontal space_between container cake_item">
        <li>
          <img src="../assets/home/cake_item01.png" alt="cake">
          <div>
            <p>馬斯卡彭草莓派</p>
            <p>NT 120</p>
          </div>
        </li>
        <li>
          <img src="../assets/home/cake_item02.png" alt="cake">
          <div>
            <p>巧克力焦糖杯子蛋糕</p>
            <p>NT 60</p>
          </div>
        </li>
        <li>
          <img src="../assets/home/cake_item03.png" alt="cake">
          <div>
            <p>巧克力杏仁馬卡龍</p>
            <p>NT 80</p>
          </div>
        </li>
        <li>
          <img src="../assets/home/cake_item04.png" alt="cake">
          <div>
            <p>咖啡焦糖戚風</p>
            <p>NT 480</p>
          </div>
        </li>
      </ul>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="cakeType mb_9">
      <img src="../assets/home/cake_kind01.png" alt="a kind of cake">
      <img src="../assets/home/cake_kind02.png" alt="a kind of cake">
      <img src="../assets/home/cake_kind03.png" alt="a kind of cake">
    </div>
    <div class="container autoCenter mb_9"><img src="../assets/home/shape02.png" alt="shape" width="1000px"></div>
    <ul class="brand container mb_9">
      <li class="row vertical">
        <img src="../assets/home/icon-brand.png" alt="brand" width="110px">
        <p>品牌故事</p>
      </li>
      <li class="row vertical">
        <img src="../assets/home/icon-delivery.png" alt="delivery" width="150px">
        <p>宅配需知</p>
      </li>
      <li class="row vertical">
        <img src="../assets/home/icon-return.png" alt="return goods" width="110px">
        <p>退換貨政策</p>
      </li>
      <li class="row vertical">
        <img src="../assets/home/icon-private.png" alt="private" width="80px">
        <p>隱私權</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'Content',
  setup(){
    return{

    }
  }
}
</script>