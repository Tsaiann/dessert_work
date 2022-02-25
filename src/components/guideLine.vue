<template>
  <div class="guide row horizontal v_center mb_5">
      <div></div>
      <p>></p>
      <p>{{ msg }}</p>
  </div>
</template>
<script>

export default {
  name:'GuideLine',
  props:{
    msg: String,
  },
  setup(props){
    const msg = props.msg
    
    return{
      msg
    }
  }
}
</script>