<template>
  <div>
    <el-dialog title="编辑角色" :visible.sync="visible" @close="closeDialog" :show="show">
      <el-form :model="roleForm" status-icon :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色标识" prop="role">
          <el-input type="text" v-model="roleForm.role" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleZh">
          <el-input type="text" v-model="roleForm.roleZh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据权限" prop="auth">
          <base-tree-select
            :data="deptData"
            :defaultProps="deptProps" 
            multiple
            :nodeKey="nodeKey" 
            :checkedKeys="defaultCheckedKeys"
            @popoverHide="popoverHide" >
          </base-tree-select>
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
import BaseTreeSelect from './../../../common/BaseTreeSelect'
import {getDeptTree, getRoleDept} from './../../../../api/right-managing/dept.js'
  export default {
    props:{
      roles:'',
      show:{
        type: Boolean,
        default:false
      }
    },
    components: {BaseTreeSelect},
    inject:['reload'],
    created(){
      getDeptTree().then(res=>{
        this.deptData = res.data.data
      })
      // getRoleDept(id).then(res=>{
      //   console.log(res);
      //   this.defaultCheckedKeys = res.data.id;
      // })
    },
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
        formLabelWidth: '120px',
        deptData: '',
        deptProps: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        defaultCheckedKeys: [ ],
        id: this.roles.id,
        roleForm: {
          role: this.roles.name,
          roleZh: this.roles.nameZh
        },
        visible: this.show,
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
    watch: {
      show(){
        this.visible = this.show ;
      },
      roles:{
        handler(newValue,oldValue){
          this.roleForm.role =roles.name;
          this.roleForm.roleZh = roles.nameZh;
        }
      }
    },
    methods: {
      closeDialog(){
        this.roleForm.role = '';//清空数据
        this.roleForm.roleZh = '';
        this.$emit('update:show', false)
        console.log(this.roles)
       },
      submitForm(formName) {
        this.visible=false;
  
      //  var  _this = this;
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       addRole(this.roleForm.role,this.roleForm.roleZh).then((res)=>{
      //         if(res.data.data===1){
      //           _this.$message({
      //             type:'info',
      //             message:'添加成功' 
      //           })
      //         }
      //         this.reload();
      //       });
      //      this.dialogFormVisible=false;
      //     } else {
      //       return false;
      //     }
      //   });
      },
      resetForm(formName) {
        this.roleForm.role = this.roles.name;
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>