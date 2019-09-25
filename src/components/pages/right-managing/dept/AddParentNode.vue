<template>
  <div>
    <el-button 
      class="el-icon-plus" 
      size="mini" 
      type="primary" 
      style="float:left; margin-top: 10px; margin-bottom: 20px" 
      @click="addDept()"
      >
        添加顶级节点
      </el-button></div>
</template>

<script>

import eventBus from "./../../../../utils/eventBus.js"
export default {
  name: 'NodeAddButton',
 
    methods: {
      addDept(){
        eventBus.$emit("addDeptNode",false,'add','-1')
    },
    },
}
</script>

<style>

</style>