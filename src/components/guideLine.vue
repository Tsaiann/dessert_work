<template>
  <div class="guide row horizontal v_center " data-space-bottom="2.5rem">
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