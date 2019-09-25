<template>
  <div style="margin-right:20px">
    <el-button type="primary" @click="userFormVisible = true" icon="el-icon-edit" size="mini">添加用户</el-button>

    <el-dialog title="新增" :visible.sync="userFormVisible" @close='closeDialog'>
      <el-form :model="userForm" status-icon :rules="rules2" ref="userForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账户" prop="account">
          <el-input type="text" v-model="userForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord1">
          <el-input type="password" v-model="userForm.passWord1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passWord2">
          <el-input type="password" v-model="userForm.passWord2" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属部门" prop="dept">
          <el-input type="text" v-model="userForm.dept" autocomplete="off"  v-on:click.native="deptTreeVisible='true'"></el-input>
        </el-form-item> -->
        <el-form-item label="角色标识" prop="roles">
          <!-- <el-checkbox v-for="(item,index) in roles" :key="index" v-model="item.name" >{{item.nameZh}}</el-checkbox> -->
          <el-checkbox-group v-model="checkIds">
            <el-checkbox v-for="(item,index) in roles" :key="index" :label="item.id"  >{{item.nameZh}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户状态"  :label-width="formLabelWidth">
          <el-switch
            v-model="userForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="0"
            :inactive-value="102"
            active-text="有效"
            inactive-text="锁定">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button> 
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- <el-dialog :visible.sync="deptTreeVisible"  @close="closedeptTree">
      <el-tree 
        node-key="id"
        highlight-current
        :data="deptData" 
        :props="deptProps" 
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :render-content="renderContent"
        default-expand-all
        >  
      </el-tree>
    </el-dialog> -->
  </div>
</template>

<script>
// import {getDeptTree} from './../../../../api/right-managing/dept.js'
// import {addUser} from '../../../../api/right-managing/user.js'
export default {
     props:{
      roles:{
          type:Array
      },
      users:{
          type:Array
      } 
     },
    inject:['reload'],
    created:function(){
      // getDeptTree().then(res=>{
      //   this.deptData = res.data.data;
      // })
    },
    data() {
      
      var i=0;
      var validateAcount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('账户不能为空'));
        } else {
          for(i=0;i<this.users.length;i++){
           if(this.userForm.account === this.users[i].username){
              callback(new Error('用户名已存在'));
              break;
           }
          }
          if ( i>=this.users.length) {
            this.$refs.userForm.validateField('passWord1');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.userForm.checkPass !== '') {
            this.$refs.userForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userForm.passWord1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      // var validateDept = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请选择部门'));
      //   } else {
      //     callback();
      //   }
      // };
      return {
        checkIds:[],
        deptTreeVisible:false,
        userFormVisible: false,
        formLabelWidth: '120px',
        userForm: {
          account:'',
          passWord1:'',
          passWord2: '',
          dept: '',
          admin:'',
          superuser:'',
          user:'',
          status: 0,
        },
        deptData: '',
        deptProps: {
          label: 'name',
          children: 'children'
        },
        rules2: {
          account: [
            { validator: validateAcount, trigger: 'blur' }
          ],
           passWord2: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          passWord1: [
            { validator: validatePass, trigger: 'blur' }
          ],
          // dept: [
          //   { validator: validateDept, trigger: 'blur' }
          // ]
        }
      };
    },
    methods: {
      closedeptTree(){
        this.deptTreeVisible = false;
      },
      handleNodeClick(data){
        this.userForm.dept = data.name;
        this.deptTreeVisible = false;
      },
      closeDialog(){
        this.resetForm('userForm');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var roles = [];
            roles =this.checkIds
            addUser( this.userForm.account, this.userForm.passWord1,this.userForm.status, roles.join(","))
              .then(res=>{
                this.reload();
                if( res && res.data.data != 0 ){
                  this.$message({
                    type: 'success',
                    message: '添加用户成功'
                  });
                }else{
                   this.$message.error('添加失败');
                }
              }); 
              this.userFormVisible = false;
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {

        this.$refs[formName].resetFields();
        this.userForm.account= '';//清空数据
        this.userForm.passWord1 = '';
        this.userForm.passWord2 = '';
        this.userForm.dept = '';
      }
    }
  }
</script>

<style>

</style>