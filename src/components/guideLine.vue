<template>
  <div class="guide row horizontal v_center mb_5">
      <div></div>
      <p>></p>
      <p>{{ msg }}</p>
  </div>
</template>
<script>

import { ref } from 'vue'

export default {
  name:'GuideLine',
  props:{
    msg: String,
  },
  setup(props){
    const msg = ref(props.msg)
    
    return{
      msg
    }
  }
}
</script>