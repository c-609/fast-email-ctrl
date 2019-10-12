<template>
  <div >
    <add-role 
      :roles="roles"
      style="float:left; margin-right:20px"></add-role>
    <TableSearch :tableData="roles" ></TableSearch>
    <RoleTable :header="header"></RoleTable>
  </div>
</template>

<script>
import RoleTable from './role/RoleTable'
import AddRole from './role/AddRole'
import {getRoleList} from './../../../api/right-managing/role.js'
import TableSearch from './../../common/TableSearch'
export default {
    name: 'App',
    components:{
        RoleTable,
        TableSearch,
        AddRole
    },
    data(){
        return{
            header:[   
                {label:'角色标识' ,prop:'roleName'},
                {label:'角色描述' ,prop:'name'},
                {label:'角色权限等级',prop:'level'},
                {label:'角色权限标识',prop:'levelName'},
                {label:'操作', prop: 'operate',width:'200px',fixed:'right'}
            ],
            roles:[],
        }
    },
    created:function(){
        getRoleList(4,1).then(res=>{
          this.roles=res.data.data.records;
          console.log(this.roles)
        })
        
    }
}
</script>

<style >


</style>
