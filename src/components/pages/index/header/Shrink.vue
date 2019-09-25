<template>
  <div>
    <i  v-if="!isCollapse" class="el-icon-s-fold shrink-icon" @click="setCollapse"></i>
    <i v-else class="el-icon-s-unfold shrink-icon" @click="setCollapse"></i>
  </div>
</template>

<script>
export default {
  data() {
    return { }
  },

  methods: {
    setCollapse(){   
      this.$store.commit('setCollapse');
    }
  },

  computed: {
      isCollapse(){
        return this.$store.state.isCollapse;
      }
    },
}
</script>

<style>
.shrink-icon {
  font-size: 30px;
  color:white
}
</style>