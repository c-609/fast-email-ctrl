<template>
  <div id="app">
       <div>
          <Tabs ref="child1Container"></Tabs>
      </div>
      <div>
          <NavMenu @open="open"></NavMenu>
      </div>
     
  </div>
</template>

<script>
import eventBus from './../utils/eventBus.js'
import NavMenu from './../components/pages/index/aside/NavMenu'
import Tabs from './../components/pages/index/Tabs'
export default {
  name: 'App',
  components:{
      NavMenu,
      Tabs
  },
  methods:{
      open(){
          this.$refs.child1Container.check();
      }
  }
}
</script>

<style >

#app{
  position: absolute;
  text-align: center;
  height: 100%;
  width: 100%;
 
}
body{
  margin: 0px
}
</style>
