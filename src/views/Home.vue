<template>
  <div class="home">
    <headerTop />
    <router-view />
    <footerBottom />
  </div>
</template>

<script>
import headerTop from '@/components/headerTop.vue'
import footerBottom from '@/components/footerBottom.vue'
import { ref, reactive, computed, onMounted, onBeforeMount } from 'vue'

export default {
  name: 'Home',
  components: {
    headerTop,
    footerBottom
  },
  setup(){
    return{

    }
  }
}
</script>
