<template>
  <div class="home">
    <navigator />
    <router-view />
    <footerBottom />
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
