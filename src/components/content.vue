<template>
  <div class="content">
    <div class="homePhoto mb_9">
      <div>
        <img src="../assets/home/home01.png" alt="">
      </div>
      <div class="carousel" v-for="(img, index) of homeImgs" :key="index" v-show="index === show">
        <img :src="img.src">
      </div>
      <ul class="row horizontal">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="row vertical mb_7">
      <div class="mb_7 autoCenter row vertical center">
        <p class="mb_1">熱銷排名</p>
        <img src="../assets/home/shape01.png" alt="shape" width="150px">
      </div>
      <ul class="row horizontal space_between container cake_item">
        <li class="itemTab">
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
      <ul class="page mb_9 container">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="cakeType mb_9">
      <div class="item">
        <img src="../assets/home/cake_kind01.png" alt="a kind of cake">
        <p>戚風蛋糕</p>
        <span>Chiffon cake</span>
      </div>
      <div class="item">
        <img src="../assets/home/cake_kind02.png" alt="a kind of cake">
        <p>杯子蛋糕</p>
        <span>Cupcake</span>
      </div>
      <div class="item">
        <img src="../assets/home/cake_kind03.png" alt="a kind of cake">
        <p>馬卡龍</p>
        <span>Macaron</span>
      </div>
    </div>
    <div class="container autoCenter mb_9"><img src="../assets/home/shape02.png" alt="shape" width="1000px"></div>
    <ul class="brand container mb_9">
      <li class="row vertical" @click="$router.push({name:'About'})">
        <div class="icon-brand"></div>
        <p>品牌故事</p>
      </li>
      <li class="row vertical" @click="$router.push({name:'Delivery'})">
        <div class="icon-delivery"></div>
        <p>宅配需知</p>
      </li>
      <li class="row vertical" @click="$router.push({name:'Return'})">
        <div class="icon-return"></div>
        <p>退換貨政策</p>
      </li>
      <li class="row vertical" @click="$router.push({name:'Private'})">
        <div class="icon-private"></div>
        <p>隱私權</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'Content',
  setup(){
    let homeImgs=[
      { src: "/img/home01.42f2080e.png" },
      { src: "/img/home02.9b39495a.png" },
      { src: "/img/home03.f2647de4.png" }
    ]
    let show = 0
    return{
      homeImgs,
      show
    }
  }
}
</script>