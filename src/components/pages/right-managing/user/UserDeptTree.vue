<template>
  <div class="user-dept-tree">
    <el-card>
      根据部门筛选
      <br />
      <br />
      <el-tree
        node-key="id"
        highlight-current
        :data="deptData"
        :props="deptProps"
        @node-click="getNodeData"
        :expand-on-click-node="false"
        :render-content="renderContent"
        default-expand-all
      ></el-tree>
    </el-card>
  </div>
</template>

<script>
import { getDeptTree } from "./../../../../api/right-managing/dept.js";

// import {getListByDeptId} from './../../../../api/right-managing/user.js'
import eventBus from "./../../../../utils/eventBus.js";
export default {
  name: "UserDeptTree",
  data() {
    return {
      deptData: "",
      deptProps: {
        label: "name",
        children: "children"
      }
    };
  },
  created() {
    getDeptTree().then(res => {
      this.deptData = res.data.data;
    });
  },
  methods: {
    // getNodeData(data){
    //   getListByDeptId(data.id).then(res=>{
    //     eventBus.$emit('tableData',res)
    //   })
    // }
    // renderContent(data){
    //   console.log(data)
    // }
  }
};
</script>

<style>
/* .el-tree-node:focus > .el-tree-node__content {
  font-weight: 200
} */
.is-current > .el-tree-node__content {
  font-weight: bold;
  white-space: normal;
}
</style>
