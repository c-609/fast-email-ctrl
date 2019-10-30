<template>
  <div style="margin-right:20px">
    <el-button type="primary" @click="addBtn" icon="el-icon-edit" size="mini">添加用户</el-button>

    <el-dialog
    width="40%"
      title="新增"
      :visible.sync="userFormVisible"
      :close-on-click-modal="false"
      v-model="userFormVisible"
      @close="closeDialog"
    >
      <el-form
        size="mini"
        :model="userForm"
        status-icon
        :rules="rules2"
        ref="userForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="*账户" prop="account">
          <el-input type="text" v-model="userForm.account" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="*密码" prop="passWord1">
          <el-input type="password" v-model="userForm.passWord1" autocomplete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="*确认密码" prop="passWord2">
          <el-input type="password" v-model="userForm.passWord2" autocomplete="off" size="mini"></el-input>
        </el-form-item>
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
        <el-form-item label="部门身份" prop="roles">
          <base-tree-select
            :data="deptData"
            :roles="roles"
            :options="tags"
            :defaultProps="deptProps"
          ></base-tree-select>
        </el-form-item>
        <el-form-item label="用户状态" :label-width="formLabelWidth">
          <el-switch
            v-model="userForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="0"
            :inactive-value="102"
            active-text="有效"
            inactive-text="锁定"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getDeptTree,getDRId } from "./../../../../api/right-managing/dept.js";
import BaseTreeSelect from "../../../common/BaseTreeSelect";
import { getRoleList } from "./../../../../api/right-managing/role.js";
import { addUser } from "../../../../api/right-managing/user.js";
import { getkeys, cleanKeys } from "../../../../utils/getKeys";
import eventBus from "../../../../utils/eventBus";
export default {
  components: {
    BaseTreeSelect
  },
  props: {
    users: {
      type: Array
    }
  },
  inject: ["reload"],
  created: function() {
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
  data() {
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
      DRData:'',
      radio:'1',
      roles: [],
      tags: [],
      treeDeptData: "",
      checkIds: [],
      deptTreeVisible: false,
      userFormVisible: false,
      identifyVisible: false,
      formLabelWidth: "120px",
      userForm: {
        account: "",
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
      deptData: "",
      deptProps: {
        value: "id",
        label: "name",
        children: "children"
      },
      rules2: {
        account: [{ validator: validateAcount, trigger: "blur" }],
        passWord2: [{ validator: validatePass2, trigger: "blur" }],
        passWord1: [{ validator: validatePass, trigger: "blur" }],
        name:[{ validator: validateName, trigger: "blur" }]
        // dept: [
        //   { validator: validateDept, trigger: 'blur' }
        // ]
      }
    };
  },
  methods: {
    addBtn() {
      this.userFormVisible = true;
      this.treeDeptData = getkeys(this.deptData);
    },
    closeDialog() {
      this.tags = [];
      this.resetForm("userForm");
    },
    submitForm(formName) {
      var userInfo =[];
      for(var i=0; i<this.DRData.length; i++){
        for(var j=0; j<this.tags.length; j++){
           if(this.DRData[i].deptEntity.id == this.tags[j].deptId && this.DRData[i].roleEntity.id == this.tags[j].roleId){
             userInfo.push({"id":this.DRData[i].deptRoleId,"deptId":this.tags[j].deptId, "roleId":this.tags[j].roleId}) 
           }
        }     
      }
      console.log(userInfo)
      if (this.tags.length == 0) {
        // this.hint = "请选择部门身份";
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            addUser(this.userForm.account, this.userForm.passWord1, this.userForm.name, this.userForm.tel, this.userForm.age, this.userForm.email, this.radio, userInfo).then(res =>{
              if(res.data.code == 0 ){
                this.$notify({
                  message: '添加成功',
                  type: 'success'
                });
                this.closeDialog();
                this.reload();
              }
            })
          } else {
            return false;
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.userForm.account = ""; //清空数据
      this.userForm.passWord1 = "";
      this.userForm.passWord1 = "";
      this.userForm.passWord2 = "";
      this.userForm.dept = "";
    }
  }
};
</script>

<style>
</style>