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
// import {getRole} from './../../../api/right-managing/role.js'
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
                {label:'角色标识' ,prop:'name'},
                {label:'角色描述' ,prop:'nameZh'},
                {label:'操作', prop: 'operate',width:'200px',fixed:'right'}
            ],
            roles:[],
        }
    },
    created:function(){
        // getRole().then(res=>{
        //   this.roles=res.data.data;
        // })
        
    }
}
</script>

<style >


</style>
