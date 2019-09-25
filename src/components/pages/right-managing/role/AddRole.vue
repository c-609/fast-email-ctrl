<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-edit" size="mini">添加角色</el-button>

    <el-dialog title="添加角色" :visible.sync="dialogFormVisible" @close='closeDialog'>
      <el-form :model="roleForm" status-icon :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色标识" prop="role">
          <el-input type="text" v-model="roleForm.role" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleZh">
          <el-input type="text" v-model="roleForm.roleZh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('roleForm')">提交</el-button>
          <el-button @click="resetForm('roleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {addRole} from './../../../../api/right-managing/role.js'
  export default {
    props:{
      roles:{
        type:Array
      }
    },

     inject:['reload'],
    data() {
      
      var validaterole = (rule, value, callback) => {
        var i=0;
        var s="ROLE_";
        if (value === '') {
          callback(new Error('角色标识不能为空'));
        } else {
          for(i=0;i<this.roles.length;i++){
           if(s+this.roleForm.role === this.roles[i].name){
              callback(new Error('角色标识已存在'));
              break;
           }
          }
          if ( i>=this.roles.length) {
            this.$refs.roleForm.validateField('checkrole');
          }
          callback();
        }
      };
      var validateroleZh = (rule, value, callback) => {
        var i=0;
        if (value === '') {
          callback(new Error('角色描述不能为空'));
        } else {

          for(i=0;i<this.roles.length;i++){
           if(this.roleForm.roleZh === this.roles[i].nameZh){
              callback(new Error('角色描述已存在'));
              break;
           }
          }
          if (i>=this.roles.lrngth) {
            this.$refs.roleForm.validateField('checkrole');
          }
          callback();
        }
      };
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        roleForm: {
          role: '',
          roleZh: '',
         
        },
        rules: {
          role: [
            { validator: validaterole, trigger: 'blur' }
          ],
          roleZh: [
            { validator: validateroleZh, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      closeDialog(){
        this.roleForm.role = '';//清空数据
        this.roleForm.roleZh = '';
       },
      submitForm(formName) {
       var  _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addRole(this.roleForm.role,this.roleForm.roleZh).then((res)=>{
              if(res.data.data===1){
                _this.$message({
                  type:'info',
                  message:'添加成功' 
                })
              }
              this.reload();
            });
           this.dialogFormVisible=false;
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>