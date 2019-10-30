<template >
<div class="note" :style="note" >
    <div class="card"> 
    <index class="index"></index>
   <el-form :rules="rules" 
            class="login-container" 
            label-position="left" 
            :model="loginForm" 
            ref="loginForm"
            label-width="0px" 
            v-loading="loading"
            @keyup.enter.native="submitForm('loginForm')"
            >
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="acount">
      <el-input type="text" v-model="loginForm.acount"  
                auto-complete="off" placeholder="账号" prefix-icon="el-icon-user"></el-input>
    </el-form-item>
    <el-form-item prop="pass" >
      <el-input type="password" v-model="loginForm.pass" prefix-icon="el-icon-lock"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="passcode" class="pass-code">
        
       <div>
            <el-input class="passcode" type="text" v-model="loginForm.passcode" 
                    auto-complete="off" placeholder="验证码" prefix-icon="el-icon-key">
            </el-input>
            <div class="code" @click="refreshCode" >        
            <identify :identifyCode="identifyCode"></identify>
            </div>
       </div>
          

    </el-form-item >
                <el-checkbox class="login_remember"
                 v-model="checked"
                 label-position="left"
                 box-color="red"
                 >记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" class="submit-button"  @click="submitForm('loginForm')" >登录</el-button>
    </el-form-item>
  </el-form>
  </div>
</div>
</template>

<script>
    import identify from './../common/identify.vue'
    import './../../assets/icon/iconfont.css'
    import {loginObj} from './../../api/login.js'
    import {Message} from 'element-ui'
    // import '@/../../styles/?login.scss'
    // import '@/./../../s?tyles/login.scss'
    import Index from "./Index.vue"
    export default{
        name:'Login',
        components:{
            identify,
            Index
        },
        data(){
         var validateAcount = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('账户不能为空'));
            }else{
                callback();
            }
         };
         var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
         };
         var validatePasscode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('验证码不能为空'));
            }else{
                callback();
            }
         };
            return {
                identifyCodes: "1234567890",
                identifyCode: "",
                note: {
                    height:"100%",
                    backgroundImage: "url(" + require("./../../../static/img/login_bg.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    display:"flex",
                },
                checked: true,
                loginForm: {
                    acount:'asd',
                    pass:'123',
                    passcode: ''
                },
                rules:{
                    acount: [{ validator: validateAcount, trigger: 'blur' }],
                    pass: [{ validator: validatePass, trigger: 'blur' }],
                    passcode: [{ validator: validatePasscode, trigger: 'blur' }]
                },
                loading: false
            }
        },
        mounted(){
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        methods: {
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                    ];
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.loginForm.passcode==this.identifyCode){
                            this.loading = true;
                            var _this=this;
                            
                            loginObj(this.loginForm.acount,this.loginForm.pass).then(res=>{
                                if(res.data.code == 0){
                                    this.$router.push('/home')
                                }
                            })
                        }else{
                            this. refreshCode();
                            this.loginForm.passcode='';
                            Message.error({message: '验证码错误'});
                        }
                    }
                });
            } 
        }
    }
</script>
<style  lang="scss" >
@import './../../styles/login.scss'
</style>