<template>
  <div class="logo">
    <div 
      v-if="isCollapse"
      class="title">
      tiger
    </div>
    <div 
       v-if="!isCollapse"
       class="title">
        tiger 快速开发框架
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  computed: {
      isCollapse(){
        return this.$store.state.isCollapse;
      }
  },

}
</script>

<style lang="scss">
.logo{
  width: 240px;
  height:64px;
  background:  #409EFF;
}
.logo .title{
  position: relative;
  top:15px;
  font-size: 20px;
  color: white;
}
</style>