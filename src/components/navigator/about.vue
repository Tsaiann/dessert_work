<template>
  <div class="about container">
    <guideLine :data="guideData" />
    <div class="about-page" data-space-bottom="5rem">
      <h1 data-space-bottom="5rem">關於季菓</h1>
      <div class="about-content">
        <div class="about-content-item">
          <div class="media_block"></div>
          <img src="../../assets/other/about.png" alt="about" data-space-right="3rem" />
          <img src="../../assets/other/about_word.png" alt="about" data-space-right="1rem" />
          <div class="about-content-text">
            <h2 data-space-bottom="1rem">季菓 Season Fructification</h2>
            <p>意味著由每個季節所帶來不同風味的新鮮水果，結合各式甜點創造出只屬於當季風味的特色甜點。</p>
            <p>使用最簡單細緻的方式烘培，讓顧客除了可以吃到食物本身的風味外，也能感受到其與甜點融合後的另一種層次口感。</p>
            <p>堅持不添加任何加工食品，希望能讓顧客消費時感受到家一樣的溫暖與安心。</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptatibus asperiores inventore, beatae sit distinctio odio nostrum animi vero,
              nisi cumque sunt dicta accusantium eligendi impedit expedita ipsa? Suscipit, sed!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import guideLine from '@/components/guideLine.vue'
import { reactive } from 'vue'

const guideData = reactive([
  {
    label: '關於季菓',
    to: '/about'
  }
])
</script>
