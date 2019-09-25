<template>
  <div class="button-div">
     <el-button type="primary" size="mini" @click="addChildButton()" icon="el-icon-plus" :disabled="disabled">子节点</el-button>
  </div>
</template>

<script>
import { deleteMenu} from '../../../../api/right-managing/menu';
import eventBus from "./../../../../utils/eventBus.js"
export default {
  name: 'MenuButton',
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
      eventBus.$emit("addMenu",this.formAdd,'add')
    },
  },
  created:function(){
    eventBus.$on("menuNodeClick",(i)=>{
          this.disabled = false;
    })
  },
  beforeDestroy(){
    eventBus.$off("menuNodeClick");
  }
}
</script>

<style scoped>
.button-div {
  margin-top: 10px;
  margin-bottom: 20px
}
</style>