<template>
  <div class="menu-form">
    <el-card>
    <el-form label-width="100px" :model="form" ref="form">
      <el-form-item label="父级节点" prop="parentId">
        <el-input v-model="form.parentId" :disabled="true"></el-input>
      </el-form-item>
      <div v-if="formStatus==''||formStatus=='edit'||formStatus=='add'">
        <el-form-item label=标题 prop="name" :rules="[{required:true, validator:checkName, trigger:'blur'}]">
          <el-input v-model="form.name"  placeholder="请输入标题" :disabled="formEdit"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="节点ID" prop="id" v-if="formStatus!='add'" :rules="[{required:true, validator:checkId, trigger:'blur'}]">
        <el-input v-model="form.id" placeholder="请输入节点ID" :disabled="formEdit"></el-input>
      </el-form-item>
      <div v-if="formStatus=='add'">
        <el-form-item label="请求地址" prop="url" :rules="[{required:true, validator:checkUrl, trigger:'blur'}]">
          <el-input v-model="form.url"  placeholder="请求地址" :disabled="formEdit"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="前端组件" prop="component" v-if="formStatus!='add'">
        <el-input v-model="form.component" placeholder="请输入描述" :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="前端地址" prop="path" v-if="formStatus!='add'">
        <el-input v-model="form.path"  placeholder="嵌套地址" :disabled="formEdit"></el-input>
      </el-form-item>

      <el-form-item style="float:left" v-if="formStatus=='add'">
        <el-button type="primary" size="small" @click="addSave('form')">保存</el-button>
        <el-button size="small" @click="cancelButton('form')">取消</el-button>
      </el-form-item>
      <el-form-item style="float:left" v-if="formStatus=='edit'">
        <el-button type="primary" size="small" @click="editUpdate('form')">更新</el-button>
        <el-button size="small" @click="cancelButton('form')">取消</el-button>
      </el-form-item>

    </el-form>
    </el-card>
  </div>
</template>

<script>
import eventBus from "./../../../../utils/eventBus.js"
import { getMenu, addMenu, updateMenu} from '../../../../api/right-managing/menu';
export default {
  name: 'MenuForm',
  inject:['reload'],
  data(){
    return { 
      formStatus:'',
      formEdit:true,
      formAdd:true,
      addParentId:'',
      form: {
        permission: undefined,
        name: undefined,
        id: undefined,
        parentId: undefined,
        icon: undefined,
        sort: undefined,
        component: undefined,
        type: undefined,
        path: undefined,
        url:undefined
      },
      // rules: {
      //     name: [
      //       { validator: checkName, trigger: 'blur' }
      //     ],
      //     // url: [
      //     //   { validator: checkUrl, trigger: 'blur' }
      //     // ]
      //   }
      // rules:{
      //   name: [{ required:true,message:'标题不能为空', trigger: 'blur' }],
      //   // url: [{ required:true,message:'地址不能为空', trigger: 'blur' }],
      // }

    }
  },
  created:function(){
    this.addMenu();
    this.addButton();
    this.nodeEdit();
    eventBus.$on("getMenuNodeData",(form)=>{
        this.addParentId = form.id;
        this.form = form;
        this.formStatus='';
        this.formEdit=true;
        this.formAdd=true;
      })
  },
  beforeDestroy(){
    eventBus.$off("addMenuNode");
    eventBus.$off("addMenu");
    eventBus.$off("menuNodeEdit");
    eventBus.$off("getMenuNodeData");
  },
  methods:{
    checkId(rule, value, callback) {
      if (!value) {
        callback(new Error('节点id不能为空'));
      }else{
        callback();
      }
    },
    checkUrl(rule, value, callback) {
      if (!value) {
        callback(new Error('请求地址不能为空'));
      }else{
        callback();
      }
    },
    checkName (rule, value, callback) {
      if (!this.form.name) {
        callback(new Error('标题不能为空'));
      }else{
        callback()
      }
    },
    addMenu(){
      eventBus.$on("addMenuNode",(formAdd,formStatus,node)=>{
        this.formStatus = formStatus;
        this.formEdit = formAdd;
        this.addParentId = node;    
        this.resetForm();
      })
    },
    addButton(){
      eventBus.$on("addMenu",(formAdd,formStatus)=>{
        this.formStatus = formStatus;
        this.formEdit = formAdd;
        this.resetForm();
      })
    },
    nodeEdit(){
      eventBus.$on('menuNodeEdit',()=>{
        this.formEdit = false;
        this.formStatus = 'edit'
      })
    },
    addSave(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addMenu(this.form.parentId, this.form.url, this.form.name, this.form.path)
          .then(res=>{
            this.reload();
          })
        } else {
          return false;
        }
        });
    },
    editUpdate(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateMenu(this.form.id, this.form.name, this.form.component, this.form.path)
          .then(res=>{
            this.reload();
          })
        } else {
          return false;
        }
        });
    },
    cancelButton(formName){
      this.formEdit = true;
      this.formStatus = '';
      this.$refs[formName].resetFields();
    },
     resetForm() { 
      this.form = {
          permission: undefined,
          name: undefined,
          id : undefined,
          parentId: this.addParentId,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          path: undefined
        }
      }
  }
}
</script>

<style scoped>

.menu-form{
 margin-left: 160px;
 margin-top: 10px
 /* margin-right: 20px; */
}
.el-input,
.el-select{
  /* width:500px; */
  float: left;
}

</style>