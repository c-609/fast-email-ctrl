<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-row>
          <add-parent-node></add-parent-node>
          <add-child-node style="float:left; margin-left:20px"></add-child-node>
        </el-row>
        <el-row>
          <menu-tree></menu-tree>
        </el-row>
      </el-col>
      <el-col :span="18">
        <menu-form></menu-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import AddChildNode from "./menu/AddChildNode"
import AddParentNode from "./menu/AddParentNode"
import MenuForm from "./menu/MenuForm"
import MenuTree from "./menu/MenuTree"
  export default {
    name: 'Menu',
    components:{
      AddChildNode,
      AddParentNode,
      MenuForm,
      MenuTree,
    }
  };
</script>
