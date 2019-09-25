<template>
  <div>
    <el-tabs @tab-click="swithTabs" style="margin-bottom:30px">
      <el-tab-pane label="信息管理" name="infoManage"></el-tab-pane>
      <el-tab-pane label="密码管理" name="passwordManage"></el-tab-pane>
    </el-tabs>
    <info-manage v-if="tabName=='infoManage'"></info-manage>
    <password-manage v-if="tabName=='passwordManage'"></password-manage>
  </div>
</template>

<script>
import InfoManage from './InfoManage'
import PasswordManage from './PasswordManage'
export default {
  name: 'Person',
  components: {
    InfoManage,
    PasswordManage
  },
  data(){
    return {
      tabName: 'infoManage'
    }
  },
  methods: {
    swithTabs(tab,event){
      this.tabName = tab.name;
    }
  }
}
</script>

<style>

</style>