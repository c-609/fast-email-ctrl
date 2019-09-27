<template>
<div>
  <div>
    <el-tree 
      node-key="id"
      highlight-current
      v-if="isLoadingTree"
      :data="deptData" 
      :props="deptProps" 
      @node-click="getNodeData"
      :render-content="renderContent"
      >  
    </el-tree>
  </div>
</div>
</template>

<script>
import { getDeptTree, getDeptInfo } from './../../../../api/right-managing/dept.js'
import eventBus from "./../../../../utils/eventBus.js"
import DeptTools from "./DeptTools"
export default {
  name: 'DeptTree',
  components:'DeptTools',
  data() {
      return {
         form: {
          name: undefined,
          id: undefined,
          parentId: undefined,
          sort: undefined,
        },
        allDept:[],
        deptData:[],
        deptProps:{
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
        var id = data.id;
        var _this = this;
        getDeptInfo(id).then(response => {
          this.form = response.data.data;
          eventBus.$emit("getDeptNodeData",this.form);
        });
        // eventBus.$emit("getDeptNodeData",this.form); 大坑
        eventBus.$emit("deptNodeClick");
        // eventBus.$emit("isClickNode",'true');0k
      },
      
      renderContent(h,{data}){
        let  _this = this;
        return h(DeptTools,{
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
      getDeptTree().then(res=>{
        this.deptData = res.data.data;
       
        })
    }
}
</script>

<style>
/* .el-tree-node__content:hover .tree-btn,鼠标悬浮出现tree-btn */
.is-current>.el-tree-node__content .dept-btn{
  display:inline-block;
}
.is-current>.el-tree-node__content .dept-label{
  font-weight:600;
  white-space:normal;
}
</style>