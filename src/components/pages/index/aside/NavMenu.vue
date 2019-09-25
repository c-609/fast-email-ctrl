<template>
<div class="menu-container">
<el-menu
  :default-active="checked"
  mode="vertical"
  :collapse="isCollapse"
  class="el-menu-vertical-demo menu"
  @open="handleOpen"
   @select="select"
  @close="handleClose"
  router >
  <template v-for="(item,index) in menus">
    <el-submenu :key="index" :index="index+''" >
      <template slot="title">
        <!-- <i :class="item.icon" style="color: #20a0ff;width: 14px;"></i>  -->
        <i :class="item.iconCls"></i>
          <span slot="title">{{item.name}}</span>
      </template>
      <template>
        <el-menu-item  
          v-for="(child,index) of item.children" 
          style="padding-left:53px"
          :key="index" 
          :index=child.path 
          @click="open(child.name)"><i :class="child.iconCls"></i>{{child.name}}</el-menu-item>
      </template>
    </el-submenu>
  </template>
</el-menu>
</div>
</template>

<script>
import eventBus from './../../../../utils/eventBus.js'
  export default {
    data() {
      return { 
        checked:'',
        menus:[
    {
        "id": 3,
        "path": "/home",
        "component": null,
        "name": "学院管理",
        "iconCls": "el-icon-menu",
        "children": [
            {
                "id": 4,
                "path": "/upms/user",
                "component": null,
                "name": "用户管理",
                "iconCls": "el-icon-user",
                "meta": null
            },
            {
                "id": 5,
                "path": "/upms/role",
                "component": null,
                "name": "角色管理",
                "iconCls": "el-icon-tickets",
                "meta": null
            },
            {
                "id": 6,
                "path": "/upms/dept",
                "component": null,
                "name": "部门管理",
                "iconCls": "el-icon-office-building",
                "meta": null
            },
        ],
        "meta": null
    }
]
      };
    },
    created:function(){
        // getMenu().then(res=>{      
        //   this.menus = res.data.data;     
        // });
         eventBus.$on('checked',res=>{//接收默认选中的导航栏菜单
            this.checked=res;
        })   
    },
    computed: {
      isCollapse(){
        return this.$store.state.isCollapse;
      }
    },
    methods: {
        select(item){
            eventBus.$emit("router",item);//发送路径给Tabs
        },
        open(name){
            eventBus.$emit("name",name);//发送菜单名给Tabs
            this.$emit('open');//
        },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      }
    }
    
  }
</script>

<style>
.menu-container .el-menu{
  border-right: solid 0px #e6e6e6;
  text-align: left
}
.menu-container .el-menu-item.is-active{
  background-color: #409EFF;
  color: white
}
 

</style>