<template>
<div>
  <div>
    <el-tree 
      node-key="id"
      highlight-current
      v-if="isLoadingTree"
      :data="menuData" 
      :props="menuProps" 
      @node-click="getNodeData"
      :render-content="renderContent"
      >  
    </el-tree>
  </div>
</div>
</template>

<script>
import { getMenuTree, getMenuList } from './../../../../api/right-managing/menu.js'
import eventBus from "./../../../../utils/eventBus.js"
import MenuTools from "./MenuTools"
export default {
  name: 'MenuTree',
  components:'MenuTools',
  data() {
      return {
         form: {
          permission: undefined,
          name: undefined,
          id: undefined,
          parentId: undefined,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          path: undefined,
        },
        allMenu:[],
        menuData:[{status:false}],
        menuProps:{
          label: 'name',
          children: 'children'
        },
        isLoadingTree: false,//是否加载节点树
      };
    },
    mounted(){
      this.initExpand()
    },
    methods: {
      initExpand(){
        this.isLoadingTree = true;
      },
     getNodeData(data) {
        data.status = true
        var id = data.id;
        for(var i=0;i<this.allMenu.length;i++){
          // getMenuList().then(response => {
          //   this.allMenu = response.data.data;      
          // })
          if(this.allMenu[i].id==id){
            this.form = this.allMenu[i];
            break;
          }
        }
        eventBus.$emit("getMenuNodeData",this.form);
        eventBus.$emit("menuNodeClick");
        // eventBus.$emit("isClickNode",'true');0k
      },
      
      renderContent(h,{data}){
        let  _this = this;
        return h(MenuTools,{
          props:{
            DATA:data,
            // NODE:node,
            // STORE:store,
          },
          // on:{
          //   // nodeAdd: ((s,d,n)=>_this.handleAdd(s,d,n)),
          //   nodeEdit: ((d)=>_this.handleEdit(d)),
          //   nodeDel: ((d)=>_this.handleDelete(d)),
          // }
        })
      }

    },
   
    created:function(){
      getMenuTree().then(res=>{
        this.menuData = res.data.data; 
        })
      getMenuList().then(response => {
        this.allMenu = response.data.data;   
        })
    }
}
</script>

<style>
/* .el-tree-node__content:hover .tree-btn,鼠标悬浮出现tree-btn */
.is-current>.el-tree-node__content .menu-btn{
  display:inline-block;
}
.is-current>.el-tree-node__content .menu-label{
  font-weight:600;
  white-space:normal;
}
</style>