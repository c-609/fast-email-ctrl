<template>
  <div class="button-div">
     <el-button type="primary" size="mini" @click="addChildButton()" icon="el-icon-plus" :disabled="disabled">子节点</el-button>
  </div>
</template>

<script>
import { deleteDept} from '../../../../api/right-managing/dept';
import eventBus from "./../../../../utils/eventBus.js"
export default {
  name: 'DeptButton',
  inject:['reload'],
  data(){
    return{
      formEdit:false,
      formAdd:false,
      id:'',
      disabled: true
      // formStatus: ''
    }
  },
  methods:{
    addChildButton(){
      eventBus.$emit("addDept",this.formAdd,'add')
    },
  },
  created:function(){
    eventBus.$on("deptNodeClick",()=>{
          this.disabled = false;
    })
  },
  beforeDestroy(){
    eventBus.$off("deptNodeClick");
  }
}
</script>

<style scoped>
.button-div {
  margin-top: 10px;
  margin-bottom: 20px
}
</style>