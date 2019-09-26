<template>
  <div>
    <el-row class="user-table">
      <el-col :span="4">
        <user-dept-tree style="margin-right:20px" ></user-dept-tree>
      </el-col>
      <el-col :span="20">
        <add-user
          :roles="roles" 
          :users="users" 
          style="float:left">
        </add-user>
        <TableSearch ></TableSearch>
        <i class="el-icon-refresh refresh" @click="refresh"></i>
        <user-table :header="header" :roles="roles" ></user-table>
      </el-col>
      
    </el-row>
  </div>
</template>

<script>
// import {getRoleList} from './../../../api/right-managing/role.js'
// import {getUserList} from './../../../api/right-managing/user.js'
import UserTable from './user/UserTable'
import UserDeptTree from './user/UserDeptTree'
import AddUser from './user/AddUser'
import TableSearch from './../../common/TableSearch'
export default {
  name: 'User',
  inject:['reload'],
  components: {
    UserTable,
    AddUser,
    TableSearch,
    UserDeptTree
  },

  data() {
    return {
      users: [],
      roles: [],
      header: [
        //  o:表示单个数值  1：表示多个数值 数组
        {label:'ID' ,prop:'userId',type:0},
        {label:'姓名' ,prop:'name',type:0},
        {label:'电话',prop:'phone',type:0},
        {label:'性别',prop:'gender',type:0},
        {label:'年龄',prop:'age',type:0},
        {label:'邮箱',prop:'email',type:0},
        // {label:'部门',prop:'depts',type:0},
        // {label:'状态',prop:'status',type:0},
        {label: '操作', prop:'operate',width:'200px',fixed:'right'}
      ],
    }
  },

  mounted:function(){
    // getUserList().then((res)=>{
    //   this.users=res.data.data;
    // });
    // getRoleList().then((data)=>{
    //   this.roles=data.data.data;    
    // });
  },
  
  methods:{
    refresh(){
      this.reload();
    }
  }

}
</script>

<style>
.user-table .refresh{
  font-size: 25px;
  float: right;
  color: #409EFF;
}

</style>