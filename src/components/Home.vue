<template>
 <div class="container"
      :class="{'container-collapse':isCollapse}">
    <div class="header">
      <el-row style="top:15px" type="flex">
        <el-col :span="1" style="float:left"><shrink></shrink></el-col>
        <el-col></el-col>
        <el-col :span="1" style="padding-top:1px">
          <theme-picker ></theme-picker>
        </el-col>
        <el-col :span="3" style="padding-top:5px">
          <personal-info  @open="open"></personal-info>
        </el-col>
      </el-row> 
    </div>

    <div class="layoout">
      <div class="layout-main">
        <tabs ref="child1Container"></tabs>  
        <el-scrollbar style="height:100%">
          <el-card class="main-card">
            <router-view v-if="isRouterAlive"></router-view>
          </el-card>
        </el-scrollbar>
      </div>
      <div class="layout-aside">
        <logo></logo>
        <nav-menu  @open="open"></nav-menu>
      </div>
    </div>

  </div>
</template>

<script>
import ThemePicker from './pages/index/header/ThemePicker' 
import PersonalInfo from './pages/index/header/PersonalInfo'
import NavMenu from './pages/index/aside/NavMenu'
import Shrink from './pages/index/header/Shrink'
import Logo from './pages/index/aside/Logo'
import Tabs from './pages/index/Tabs'
export default {
  name: 'Home',
  
  components: {
    Shrink,
    ThemePicker,
    PersonalInfo,
    Logo,
    Tabs,
    NavMenu
  },

  data() {
    return {
      isRouterAlive:true
    } 
  },

  provide(){
    return {
      reload:this.reload
    }
  },
 
  methods:{
    open(){
          this.$refs.child1Container.check();
    },
    reload(){
      
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
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
.layout-tags{
  float: right
}
</style>
