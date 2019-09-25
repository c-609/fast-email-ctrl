<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName">
        <el-input :disabled="true" v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model.number="ruleForm.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import {getUser} from './../../../../api/login.js'
  export default {
    name: 'InfoManage',
    data() {
      var checkPhoneNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        ruleForm: {
          userName: '',
          phoneNumber: '',
        },
        rules: {
          phoneNumber: [
            { validator: checkPhoneNumber, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created:function(){
      // getUser().then((res)=>{
      //   this.ruleForm.userName=res.data.data.username;
      // });
    }
  }
</script>
<style scoped>
.el-input{
  float: left;
  width: 40%;
}
.el-button{
  float: left;
}
</style>