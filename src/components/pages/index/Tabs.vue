<template>
<div class="tabs-container">    
  <el-tabs 
    v-model="editableTabsValue"
    @tab-remove="removeTab"
    @tab-click="click" >
    <el-tab-pane
      v-for="(item) in editableTabs"
      :closable="item.close"
      :key="item.name"
      :label="item.title"
      :name="item.name" >
    </el-tab-pane>
  </el-tabs>
  <el-dropdown style="float:right; margin-top:5px">
    <el-button type="primary" size="mini">
      更多
      <i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="closeOthersTabs">关闭其他</el-dropdown-item>
      <el-dropdown-item @click.native="closeAllTabs">关闭全部</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>


<script>
import eventBus from './../../../utils/eventBus.js'
  export default {
    data() {
      return {
          dir:'',
          isFind:-1,
          tabsName:'',
          editableTabsValue: '1',
          editableTabs: [{
            title: '首页',
            name: '1',
            content: '首页',
            close: false,
            dir:'/wel'
          }],
        tabIndex: 1
      }
    },
    created(){
        this.$router.push('/wel')
        eventBus.$on('name',res=>{
            this.tabsName=res;
            this.isFind=-1;
        })
        eventBus.$on('router',res=>{
            this.dir=res;  
        })
    },
    methods: {
      addTab(editableTabsValue) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: this.tabsName,
          name: newTabName,
          content: this.tabsName,
          dir:this.dir,
          close:true
        });
        this.$router.push(this.dir)
        this.editableTabsValue = newTabName;
        // console.log(this.editableTabs)
      },
      click(item){
          this.editableTabs.map((index)=>{
              if(index.name==item.name){
                eventBus.$emit("checked",index.dir);
                this.$router.push(index.dir)
              }
          })
         
      },
      check(){
        this.editableTabs.map((index)=>{
            if(this.tabsName==index.title){
             this.isFind=0;
             this.editableTabsValue=index.name;
            }
        })
        if(this.isFind==-1){
            this.addTab();
        }else{
            // console.log("----------------------------"+this.isFind)
        }
       
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                 eventBus.$emit("checked",nextTab.dir);
                  this.$router.push(nextTab.dir);
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      closeOthersTabs(){
        this.editableTabs.map((index)=>{
            if(index.name!=this.editableTabsValue&&index.name!=1){
              this.removeTab(index.name)
            }
        })
      },
      closeAllTabs(){
        this.editableTabs.map((index)=>{
            if(index.name!=1){
              this.removeTab(index.name)
            }
        })
      }

    }
  }
</script>

<style>
.tabs-container{
    user-select: none; 
    position: relative;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: hidden;
    border-top: 1px solid #f6f6f6;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
}
.tabs-container .el-tabs{
  background: white;
  height:40px;
  float: left;
}
.tabs-container .el-tabs__active-bar{
  height: 3px;
}
</style>