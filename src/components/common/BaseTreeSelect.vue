
<template>
  <div style="text-align:left">
    <el-tag
      :key="index"
      v-for="(item,index) in options"
      closable
      :disable-transitions="false"
      @close="handleClose(index)"
    >{{item.name}}</el-tag>
    <el-popover width="500" trigger="manual" v-model="visible" @show="popoverShow">
      <div>
        <p>选择部门</p>
        <el-tree
          ref="tree"
          :data="data"
          :props="defaultProps"
          :show-checkbox="true"
          node-key="id"
          check-strictly
          default-expand-all
          :check-on-click-node="true"
          :highlight-current="true"
          @check="check"
        ></el-tree>
      </div>
      <div>
        <p>选择角色</p>
        <el-radio-group v-model="role">
          <el-radio v-for="(item,index) in roles" :key="index" :label="item">{{item.name}}</el-radio>
        </el-radio-group>
        <div class="btnDiv">
          <el-button @click="visible = !visible" size="mini" type="info" plain>取消</el-button>
          <el-button @click="ensure" size="mini" type="primary">确认</el-button>
        </div>
      </div>

      <el-button
        class="button-new-tag"
        size="small"
        @click="visible = !visible"
        slot="reference"
      >+ 部门身份</el-button>
    </el-popover>
  </div>
</template>
 
<script>
import { Message } from "element-ui";
export default {
  name: "tree-select",
  props: {
    // 树结构数据
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    defaultProps: {
      type: Object,
      default() {
        return {};
      }
    },
    options:{
      type:Array,
      default:[]
    },
    roles: {
      type: Array
    }
  },
  data() {
    return {
  
      selectedData: [], // 选中的节点
      checkedIds: [],
      checkedData: [],
      role: "",
      visible: false
    };
  },
  methods: {
    //弹框显示时
    popoverShow() {
      this.$refs.tree.setCheckedKeys([], true);
      this.checkedIds = [];
      this.checkedData = [];
      this.role = "";
    },

    //当复选框被点击时
    check(node) {
      this.$refs.tree.setCheckedKeys([node.id], true); //使用element定义的方法
    },

    //确认
    ensure() {
      this.checkedIds = this.$refs.tree.getCheckedKeys(); // 所有被选中的节点的 key 所组成的数组数据
      this.checkedData = this.$refs.tree.getCheckedNodes(); // 所有被选中的节点所组成的数组数据

      if (this.checkedData.length > 0) {
        if (this.role == "") {
          this.$message({
          message: "请选择角色",
          type: "warning"
        });
        } else {
          var obj = new Object();
          obj.deptId = this.checkedData[0].id;
          obj.deptName = this.checkedData[0].name;
          obj.roleId = this.role.id;
          obj.roleName = this.role.name;
          obj.name = this.checkedData[0].name + "--" + this.role.name;
          this.options.push(obj);

          this.visible = !this.visible;
        }
      } else {
        this.$message({
          message: "请选择部门",
          type: "warning"
        });
      }
    },
    //移除部门身份
    handleClose(index) {
      this.options.splice(index, 1);
    }
  },
  watch: {
    isShowSelect(val) {
      // 隐藏select自带的下拉框
      this.$refs.select.blur();
    },
    checkedKeys(val) {
      if (!val) return;
      this.checkedKeys = val;
      this.initCheckedData();
    }
  }
};
</script>
 
<style scoped>
.common-tree {
  overflow: auto;
}
.tree-select {
  z-index: 111;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
p {
  font-size: 17px;
  font-weight: 700;
  border-bottom: 2px solid #f4f4f4;
}

.btnDiv {
  text-align: right;
  margin-top: 10px;
}
</style>
