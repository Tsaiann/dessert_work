<template>
  <router-view v-if="isRouterAlive" />
</template>

<script>
import { ref, onMounted, provide, nextTick } from 'vue'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
export default {
  name: 'App',
  setup() {
    const isRouterAlive = ref(true)
    let beforeUnloadTime = ref(0)
    let gapTime = ref(0)

    const beforeunloadHandler = () => {
      beforeUnloadTime.value = new Date().getTime()
    }
    const unloadHandler = () => {
      gapTime.value = new Date().getTime() - beforeUnloadTime.value
      // 判斷是關閉還是刷新
      if (gapTime.value <= 7) {
        localStorage.clear()
      }
    }

    const clearLocalStorage = onMounted(() => {
      window.addEventListener('beforeunload', () => {
        beforeunloadHandler()
      })
      window.addEventListener('unload', () => {
        unloadHandler()
      })
    })
    const reload = () => {
      isRouterAlive.value = false
      nextTick(function () {
        isRouterAlive.value = true
      })
    }
    provide('reload', reload)
    return {
      clearLocalStorage,
      isRouterAlive,
      reload
    }
  }
}
</script>
