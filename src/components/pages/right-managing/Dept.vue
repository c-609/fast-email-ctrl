<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-row>
          <add-parent-node></add-parent-node>
          <add-child-node style="float:left; margin-left:20px"></add-child-node>
        </el-row>
        <el-row>
          <dept-tree></dept-tree>
        </el-row>
      </el-col>
      <el-col :span="18">
        <dept-form></dept-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import AddChildNode from "./Dept/AddChildNode"
import AddParentNode from "./Dept/AddParentNode"
import DeptForm from "./Dept/DeptForm"
import DeptTree from "./Dept/DeptTree"
  export default {
    name: 'Dept',
    components:{
      AddChildNode,
      AddParentNode,
      DeptForm,
      DeptTree,
    }
  };
</script>
