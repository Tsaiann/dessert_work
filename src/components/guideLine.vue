<template>
  <div class="guide" data-space-bottom="2.5rem">
    <Breadcrumb :home="home" :model="pageData" />
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'GuideLine',
  props: {
    data: Array
  },
  setup(props) {
    const pageData = props.data
    const home = reactive({
      icon: 'pi pi-home',
      to: '/'
    })
    return {
      pageData,
      home
    }
  }
}
</script>
