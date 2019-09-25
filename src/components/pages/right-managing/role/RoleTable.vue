<template>
  <div>
    <el-table
    ref="dormitoryTable"
      :data="Tables.slice((currpage - 1) * pagesize, currpage * pagesize)"
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
          <el-button @click="handleEditRirhts(scope.row)" type="text" size="small" v-if="item.prop=='operate'">修改权限</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="text" size="small" v-if="item.prop=='operate'">删除</el-button>
       </template>  
      </el-table-column>   
    </el-table>

    <el-dialog title="编辑角色" :visible.sync="isAddRoleForm" @close="closeEditDialog">
      <el-form :model="roleForm" status-icon :rules="rules" ref="roleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色标识" prop="role" >
          <el-input type="text" v-model="roleForm.role" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleZh">
          <el-input type="text" v-model="roleForm.roleZh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据权限" prop="auth">
          <el-tree
            :data="deptData" 
            :props="deptProps" 
            ref="deptData"
            show-checkbox
            check-strictly=true
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="defaultCheckedKeys"
             >
          </el-tree>
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
			:total="Tables.length"
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
// import {getDeptTree} from './../../../../api/right-managing/dept.js'
  export default {
    name: 'BasicTable',
    props: ['header'],
    components: {EditRoleForm, BaseTreeSelect},
    inject:['reload'],
    // created:function(){
    //   eventBus.$on('Ta',(data)=>{
    //     this.Tables=data
    //   })
    //   getRightTree().then(res=>{
    //     this.menuData = res.data.data;
    //   })
    //   getDeptTree().then(res=>{
    //       this.deptData = res.data.data;
    //     });
    // },
    // beforeDestroy() {
    //   eventBus.$off('Ta');
    // },
     data() {
      var checkRoleZh = (rule, value, callback)=>{
        if(!value){
          callback(new Error('角色描述不能为空'))
        }else{
          callback()
        }
      };
      return { 
        rules:{
          roleZh:[{validator: checkRoleZh, trigger: 'blur'}]
        },
        Tables:[],
        search: '',   
        pagesize: 8,
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
    watch:{
        TablesChange(){
           this.handleCurrentChange(1);
        }
    },
     methods: {
       handleCurrentChange(cpage) {
					this.currpage = cpage;
				},
				handleSizeChange(psize) {
					this.pagesize = psize;
        },

        //编辑
        closeEditDialog(){
          this.$refs.deptData.setCheckedKeys([]);  
          this.$refs.roleForm.resetFields();
        },
        handleEdit(row){
          this.roles = row;
          this.roleForm.id = row.id;
          this.roleForm.role = row.name;
          this.roleForm.roleZh = row.nameZh;
          getRoleDept(row.id).then(res=>{        
            this.defaultCheckedKeys = res.data.data;
          });
          this.isAddRoleForm = true;
        },
        submitForm(roleForm){
          var _this = this;
          this.$refs[roleForm].validate((valid)=>{
            if(valid){
              updateRole(this.roleForm.id, this.roleForm.role, this.roleForm.roleZh).then((res)=>{
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
        handleEditRirhts(row){
          this.dialogTransferVisible=true;
          this.rid = row.id;     
          getRoleRight(this.rid).then(res=>{     
            this.defaultChecked = res.data.data ;
          }) 
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
