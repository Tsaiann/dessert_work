<template>
  <div class="home">
    <p>hello!</p>
    <navigator />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import navigator from '@/components/navigator.vue'
import footerBottom from '@/components/footerBottom.vue'
import { ref, reactive, computed, onMounted, onBeforeMount } from 'vue'

export default {
  name: 'Home',
  components: {
    navigator,
    footerBottom
  },
  setup(){
    return{

    }
  }
}
</script>
