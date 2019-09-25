<template>
  <div>
  <span class="menu-label">{{DATA.name}}</span>
  <span  v-if="true" style="margin-left:15px" class="menu-btn">
    <!-- <el-button type="text" class="el-icon-plus" @click.stop="nodeAdd(STORE,DATA,NODE)"></el-button> -->
    <el-button type="text" class="el-icon-edit" @click.stop="nodeEdit(DATA)"></el-button>
    <el-button type="text" class="el-icon-delete" @click.stop="nodeDel(DATA)"></el-button>
  </span>
  </div>
</template>

<script>
import eventBus from "./../../../../utils/eventBus.js"
import { deleteMenu} from '../../../../api/right-managing/menu';
export default {
  name:'MenuTools',
  inject:['reload'],
  props: ['DATA'],
  data(){
    return{
      id: '',
    }
  },
  // created:function(){
  //   eventBus.$on("getDeleteId",(id)=>{
  //         this.id=id;
  //   })
  // },
  methods: {
    // nodeAdd(s,d,n){//新增
    //   this.$emit('nodeAdd',s,d,n)
    // },
    nodeEdit(d){//编辑 
      eventBus.$emit('menuNodeEdit');
    },
    nodeDel(d){//删除
      // this.$emit('nodeDel',s,d,n)
      // console.log(s)
      // console.log(d)该节点的数据
      // console.log(n)
      if(d.children.length>0){
         this.$message.error("此节点有子级，不可删除！")
      }else{
        var _this = this;
        this.id = d.id;   
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          deleteMenu(_this.id).then((res)=>{
            this.reload();
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '取消'
          });
          });
      }
      
      
    }
  }
}
</script>

<style >
 .menu-btn{
  display:none
}
</style>