<template>
  <div>
    <el-table
    ref="dormitoryTable"
      :data="Tables"
      border
      style="width: 100%"
      :row-style="{height:'0'}"
      :cell-style="{padding:'0'}" >
      <el-table-column
        type="index"
        width="50"
        fixed="left"
        label="序号">
      </el-table-column>

      <el-table-column
        v-for="(item,key) in header" 
        :key="key" 
        :prop="item.prop" 
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed">
        <template slot-scope="scope">
          <div>{{scope.row[item.prop]}}</div> 
          <el-button @click="handleEdit(scope.row)" type="text" size="small" v-if="item.prop=='operate'">编辑</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="text" size="small" v-if="item.prop=='operate'">删除</el-button>
       </template>  
      </el-table-column>   
    </el-table>

    <el-dialog title="编辑角色" :visible.sync="isAddRoleForm" @close="closeEditDialog" width="30%">
      <el-form :model="roleForm" status-icon :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色标识" prop="role" >
          <el-input type="text" v-model="roleForm.role"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleZh">
          <el-input type="text" v-model="roleForm.roleZh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="auth">
          <el-select v-model="item" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('roleForm')">提交</el-button>
          <el-button @click="resetForm('roleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="修改权限"
      :visible.sync="dialogTransferVisible"
      @close='closeDialog'
      >
      <el-tree
        :data="menuData"
        ref="menuData"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="defaultChecked"
        :props="menuProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTransferVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogSure">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      	<el-pagination background
            :current-page=currpage
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pagesize"
          :total="total"
          @current-change="handleCurrentChange"  
          @size-change="handleSizeChange" 
          >
        </el-pagination>
    </div>
  </div>
</template>


<script>
// import {deleteRole, getRightTree, getRoleRight, updateRoleRight, getRoleDept, updateRole,updateRoleDept} from './../../../../api/right-managing/role.js'
import eventBus from './../../../../utils/eventBus.js';
import EditRoleForm  from './EditRoleForm'
import BaseTreeSelect from './../../../common/BaseTreeSelect'
// import {getDeptTree} from './../../../../api/right-managing/dept.js'\
import {getRoleList, deleteRole,updateRole} from '../../../../api/right-managing/role'
  export default {
    name: 'BasicTable',
    props: ['header'],
    components: {EditRoleForm, BaseTreeSelect},
    inject:['reload'],
    created:function(){
      getRoleList(this.pagesize,this.currpage).then(res=>{
          this.Tables=res.data.data.records;
          this.total = res.data.data.total;
        })
    },
     data() {
      var checkRoleZh = (rule, value, callback)=>{
        if(!value){
          callback(new Error('角色描述不能为空'))
        }else{
          callback()
        }
      };
      return { 
        item:'',
        options: [{
          value: '0',
          label: '当前机构'
        }, {
          value: '1',
          label: '同级机构'
        } 
        ],
        rules:{
          roleZh:[{validator: checkRoleZh, trigger: 'blur'}]
        },
        Tables:[],
        search: '',  
        total:'', 
        pagesize: 4,
		    currpage: 1,
        dialogTransferVisible: false,
        deptData: [],
        deptProps: {
          value: 'id',
          label: 'name',
          children: 'children'
        },
        defaultCheckedKeys: [],
        roleForm: {
          id: '',
          role:'',
          roleZh: ''
        },
        isAddRoleForm: false,
        data:{
          rid:'',
          mids:''
        },
        value:[],
        transferData:[],
        menuData:[],
        menuProps:{
          label: 'name',
          children: 'children'
        },
        defaultChecked:[],
        rid:''
      }
    },
    computed:{
        TablesChange(){
            return this.Tables;
        }
    },
  
     methods: {
       handleCurrentChange(cpage) {
          this.currpage = cpage;
          getRoleList(this.pagesize,this.currpage).then(res=>{
          this.Tables=res.data.data.records;
          this.total = res.data.data.total;
        })
				},
				handleSizeChange(psize) {
        this.pagesize = psize;
        getRoleList(this.pagesize,this.currpage).then(res=>{
          this.Tables=res.data.data.records;
          this.total = res.data.data.total;
        })
        },

        //编辑
        closeEditDialog(){
          this.$refs.deptData.setCheckedKeys([]);  
          this.$refs.roleForm.resetFields();
        },
        handleEdit(row){
          this.roles = row;
          this.roleForm.id = row.id;
          this.roleForm.role = row.roleName;
          this.roleForm.roleZh = row.name;
        
          this.isAddRoleForm = true;
        },
        submitForm(roleForm){
          var _this = this;
          this.$refs[roleForm].validate((valid)=>{
            if(valid){
              let levelName = '';
              if(this.item == 0){
                levelName = "当前部门"
              }else if(this.item == 1){
                levelName = "同级部门"
              }else{
                levelName = "weizhi"
              }
              console.log(this.roleForm.id);
              console.log( this.roleForm.role);
              console.log(this.roleForm.roleZh)
              updateRole(this.roleForm.id, this.roleForm.role, this.roleForm.roleZh,0,this.item,levelName,2).then((res)=>{
                console.log(res)
                if(status!=200){
                  _this.$message({
                    type:'success',
                    message:'修改成功' 
                  })
                  _this.reload();
                } else{
                  _this.$message({
                        type:'success',
                        message:'修改失败' 
                      })
                }   
              })
              var d = this.$refs.deptData.getCheckedKeys();
              var deptIds = d.join(",")
              console.log(this.roleForm.id)
              updateRoleDept(this.roleForm.id,deptIds).then((res)=>{
                
                console.log(res)
              })
              this.isAddRoleForm = false;
                }else{
                  return false;
              }
              })          
        },
        resetForm(formName){
          this.$refs[formName].resetFields();
          this.isAddRoleForm = false;
        },

        //删除
        handleDelete(id) {
            var _this = this;
            this.$confirm('是否删除此角色?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteRole(id).then(res=>{
                if(status!=200){
                  _this.$message({
                    type:'info',
                    message:'删除成功' 
                  })
                }
              })
              this.reload();
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '取消'
              });
            });
        },

        //修改权限
        closeDialog(){
          this.$refs.menuData.setCheckedKeys([]);  
        },
       
        handleDialogSure(){
          var m = this.$refs.menuData.getCheckedKeys().concat(this.$refs.menuData.getHalfCheckedKeys());
          var mids = m.join(",")
          var _this = this;
          updateRoleRight(this.rid, mids).then((res)=>{
            if(status!=200){
                  _this.$message({
                    type:'success',
                    message:'修改成功' 
                  })
                }    
            });
          this.dialogTransferVisible=false;
        }  
    },
  }
</script>

<style type="text/css" >
.el-pagination{
		text-align: right;
    margin-top:20px;
    margin-right: 50px
	}
</style>
