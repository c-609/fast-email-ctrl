<template>
  <div>
    <i class="el-icon-s-custom image"></i>
    <el-dropdown class="personnal" @command="handleCommand">
      <span class="el-dropdown-link" style="color:white">
        {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="personalInfo">个人信息</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {logOut, getUser} from './../../../../api/login.js'
import eventBus from './../../../../utils/eventBus.js'
export default {
    name: 'PersonalInfo',
    data(){
      return {
        user:[]
      }
    },
    methods: {
      open(){
            //
        },
      handleCommand(command){
        var _this = this;
        if (command == 'logout') {
          this.$confirm('注销登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.commit('logout',-1);
            logOut();
            _this.$router.replace({path: '/'});
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '取消'
            });
          });
        }
        else if(command == 'personalInfo'){
          eventBus.$emit("router","/person");//发送路径给Tabs
          eventBus.$emit("name","个人信息");//发送菜单名给Tabs
            this.$emit('open');
        }
      }
    },
    created:function(){
      getUser().then((res)=>{
        this.user=res.data.data;
      });
    }
}
</script>

<style>
.image{
  color: white;
  font-size: 20px
}
</style>