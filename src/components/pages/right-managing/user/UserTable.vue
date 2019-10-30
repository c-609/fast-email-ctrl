<template>
  <div class="user-table">
    <el-table
      ref="dormitoryTable"
      max-height="1000"
      :data="Tables"
      :row-class-name="tableRowClassName"
      :header-cell-style="headerColor"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="50" fixed="left" label="序号"></el-table-column>

      <el-table-column
        v-for="(item,key) in header"
        :key="key"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <div v-if="item.label=='身份'">
            <el-popover placement="right" width="150" trigger="hover">
              <div
                v-for="(i,index) in scope.row[item.prop]"
                :key="index"
              >{{scope.row[item.prop][index].deptName}}{{scope.row[item.prop][index].roleCNName}}</div>
              <el-button slot="reference" size="mini">查看</el-button>
            </el-popover>
            <!-- <div v-for="(i,index) in scope.row[item.prop]" :key="index">
              {{scope.row[item.prop][index].deptName}}{{scope.row[item.prop][index].roleCNName}}
            </div>-->
          </div>
          <!-- <div v-else-if="item.type==1">
            {{scope.row[item.prop][0].nameZh}}
            <div v-for="(i,index) in scope.row[item.prop]" :key="index">
              {{scope.row[item.prop][index].nameZh}}
            </div>
          </div>-->
          <!-- <div v-else-if="item.label=='状态'">
            <div v-if="scope.row[item.prop]==0">有效</div>
            <div v-if="scope.row[item.prop]==102">锁定</div>
          </div>-->
          <div v-else-if="item.label=='性别'">
            <div v-if="scope.row[item.prop]==1">男</div>
            <div v-if="scope.row[item.prop]==2">女</div>
          </div>
          <div v-else-if="item.label=='邮箱'">
            <div v-if="scope.row[item.prop]==null">暂无</div>
            <div v-if="scope.row[item.prop]!=null">{{scope.row[item.prop]}}</div>
          </div>
          <div v-else>{{scope.row[item.prop]}}</div>

          <!-- <el-button
            @click="handleView(scope.row.id)"
            type="text"
            size="small"
            v-if="item.prop=='operate'"
          >查看</el-button>-->
          <el-button
            @click="handleEdit( scope.row)"
            type="text"
            size="small"
            v-if="item.prop=='operate'"
          >编辑</el-button>
          <el-button
            @click="handleDelete(scope.row.userId)"
            type="text"
            size="small"
            v-if="item.prop==='operate'"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="查看" :visible.sync="dialogTransferVisible" @close="closeDialog">
      <el-tree
        :data="menuData"
        ref="menuData"
        node-key="id"
        :default-expand-all="true"
        :props="menuProps"
      ></el-tree>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" @close="closeDialog">
      <el-form
        size="mini"
        :model="userForm"
        status-icon
        :rules="rules2"
        ref="userForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="*姓名" prop="name">
          <el-input type="text" v-model="userForm.name" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input type="text" v-model="userForm.tel" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="text" v-model="userForm.age" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="userForm.email" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="部门身份">
          <base-tree-select
            :data="deptData"
            :roles="roles"
            :options="tags"
            :defaultProps="deptProps"
          ></base-tree-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">重 置</el-button>
        <el-button type="primary" @click="submitForm('userForm')">提 交</el-button>
      </div>
    </el-dialog>

    <div>
      <el-button size="mini" type="primary" style="float:left" @click="handleBatchDelete">批量删除</el-button>
      <el-pagination
        background
        layout="prev, pager, next, sizes, total, jumper"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        :total="Tables.length"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getPageUser,deleteUser, updateUser } from "./../../../../api/right-managing/user";
import eventBus from "./../../../../utils/eventBus.js";
import BaseTreeSelect from "./UserDeptTree/../../../../common/BaseTreeSelect";
import { getDeptTree,getDRId } from "./../../../../api/right-managing/dept.js";
import { getRoleList, updateRole } from "./../../../../api/right-managing/role.js";
export default {
  name: "UserTable",
  components: { BaseTreeSelect },
  inject: ["reload"],
  created: function() {
    getPageUser(4, 1).then(res => {
      this.Tables = res.data.data.list;
    });
    eventBus.$on('tableData',(res)=>{
      this.Tables=res
      })
    getDeptTree().then(res => {
      this.deptData = res.data.data;
    });
    getRoleList(20, 1).then(data => {
      this.roles = data.data.data.records;
    });
    getDRId().then(res=>{
      this.DRData = res.data.data;
    })
  },
  beforeDestroy() {
    eventBus.$off('tableData');
  },
  data() {
     var checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("姓名不能为空"));
      } else {
        callback();
      }
    };
     var checkTel = (rule, value, callback) => {
      if (!value) {
        callback(new Error("电话不能为空"));
      } else {
        callback();
      }
    };
     var checkAge = (rule, value, callback) => {
      if (!value) {
        callback(new Error('电话不能为空'));
      } else {
        callback();
      }
    };

     var checkEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("邮箱不能为空"));
      } else {
        callback();
      }
    };
     var checkDeptRoleId = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请选择部门身份"));
      } else {
        callback();
      }
    };
    var i = 0;
    var validateAcount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账户不能为空"));
      } else {
        for (i = 0; i < this.users.length; i++) {
          if (this.userForm.account === this.users[i].username) {
            callback(new Error("用户名已存在"));
            break;
          }
        }
        if (i >= this.users.length) {
          this.$refs.userForm.validateField("passWord1");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.userForm.checkPass !== "") {
          this.$refs.userForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userForm.passWord1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("姓名不能为空"));
      } else {
        callback();
      }
    };
    return {
      roles:"",
      deptRoleId:[],
      radio:'1',
      tags: [],
      deptData: "",
      deptProps: {
        value: "id",
        label: "name",
        children: "children"
      },
      Tables: [],
      search: "",
      pagesize: 5,
      currpage: 1,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      checkIds: [],
      userForm: {
        userId: "",
        passWord1: "",
        passWord2: "",
        dept: "",
        admin: "",
        superuser: "",
        user: "",
        status: 0,
        name:'',
        tel:'',
        gender:'',
        age:'',
        email:''
      },
      deptProps: {
        value: "id",
        label: "name",
        children: "children"
      },
       rules2: {
        name: [{required: true, validator: checkName, trigger: "blur" }],
        tel: [{ required: true,validator: checkTel, trigger: "blur" }],
        age: [{required: true, validator: checkAge, trigger: "blur" }],
        email:[{ required: true,validator: checkEmail, trigger: "blur" }],
        deptRoleId: [
          {required: true, validator: checkDeptRoleId, trigger: 'blur' }
        ]
      },
      menuProps: {
        label: "name",
        children: "children"
      },
      menuData: [],
      dialogTransferVisible: false
    };

  },
  props: ["header"],
 

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    headerColor({ row, rowIndex }) {
      var color = "#409EFF";
      if (localStorage.getItem("tremePackers") != null) {
        color = "" + localStorage.getItem("tremePackers") + "";
      }
      var obj = {
        background: color,
        color: "#fff"
      };
      // return 'header-color'
      return obj;
    },
    popoverHide(checkedIds, checkedData) {
      console.log(checkedIds);
      console.log(checkedData);
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      getPageUser(this.pagesize, this.currpage).then(res => {
        console.log(res.data.data);
        this.Tables = res.data.data.list;
      });
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      getPageUser(this.pagesize, this.currpage).then(res => {
        console.log(res.data.data);
        this.Tables = res.data.data.list;
      });
    },
    handleDelete(id) {
     console.log(id);
     var _this = this;
      this.$confirm('是否删除此用户?', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
    }).then(() => {
     console.log(id);
      deleteUser(id).then((res)=>{
        console.log(id)
        this.reload();
      });
    }).catch(() => {
      _this.$message({
        type: 'info',
        message: '取消'
      });
    });
    },
    // handleView(id){
    //   this.dialogTransferVisible=true;
    //   getUserMenuTree(id).then(res=>{
    //     this.menuData  = res.data.data ;
    //   })
    // },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.userForm.userId = row.userId;
      this.userForm.name = row.name;
      this.userForm.tel = row.phone;
      this.userForm.age = row.age;
      this.userForm.email = row.email;
      this.radio = row.gender.toString();
      for(var i=0; i<row.identityEntities.length; i++){
        this.tags.push({
          deptId:row.identityEntities[i].deptId,
          deptName:row.identityEntities[i].deptName,  
          name:row.identityEntities[i].deptName+"--"+row.identityEntities[i].roleCNName,  
          roleId:row.identityEntities[i].roleId,
          roleCNName:row.identityEntities[i].roleCNName,
        })
      }
      var userInfo =[];
      for(var i=0; i<this.DRData.length; i++){
        for(var j=0; j<this.tags.length; j++){
           if(this.DRData[i].deptEntity.id == this.tags[j].deptId && this.DRData[i].roleEntity.id == this.tags[j].roleId){
             userInfo.push({"deptRoleId":this.DRData[i].deptRoleId}) 
           }
        }
      }
      this.deptRoleId = userInfo;
    },
    submitForm(formName){
      this.$refs[formName].validate(valid => {
          if (valid) {
      updateUser(this.userForm.userId, this.userForm.name, this.userForm.tel, this.radio, this.userForm.age, this.userForm.email, this.deptRoleId).then(res=>{
        if(res.data.code == 0 ){
          this.$message({
            message:res.data.msg,
            type: 'info'
          });
          this.closeDialog();
          this.reload();
        }
      }); }})
    },
    resetForm(){
      this.tags = [];
      this.$refs['userForm'].resetFields();
    },
    handleDialogSure(){
      
    },
    handleBatchDelete(){},
    closeDialog() {
     this.$refs['userForm'].resetFields();
      this.tags = [];
      // this.userForm.userId =  "";
      // this.userForm.name = "";
      // this.userForm.tel = "";
      // this.userForm.age = "";
      // this.userForm.email = "";
    }
  }
};
</script>

<style type="text/css" >
.user-table .el-switch {
  float: left;
  display: block;
  margin-left: 35px;
  margin-top: 8px;
}
.user-table .el-table .warning-row {
  background: oldlace;
}
/* .user-table .el-table .header-color {
    background: #409EFF;
  } */
.user-table .el-table .success-row {
  background: #f0f9eb;
}
.el-pagination {
  text-align: right;
  margin-top: 20px;
  margin-right: 50px;
}
</style>

