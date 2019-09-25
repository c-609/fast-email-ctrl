<template>
<div>
  <div class="index" >
     <p class="time"> {{nowTime}} <p>
      <div>
    <img src="./../../../static/img/logo1.png" style="width:200px;height:200px;margin-top:80px; margin-left:-210px;">
    <p  style="color:white; font-size:22px" >通知快递控制台</p>
    <p style="color:white">v2.0.0</p>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
   data() {
    return {
      nowTime:'',
    };
  },
  // 挂载完成时
  mounted(){
    this.nowTimes();
  },
  methods: {
  // 获取当前时间函数
    timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
        let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
        let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
        let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
        let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
        this.nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm+":"+ss ;
    },
  // 定时器函数
    nowTimes(){
      this.timeFormate(new Date());
      this.timer=setInterval(this.nowTimes,1000);
      this.clear();
    }, 
    clear(){
       clearInterval(this.nowTimes) 
       this.nowTimes = null; 
    }
  },
  beforeDestroy:function(){
       if(this.timer){
            clearInterval(this.timer);  //在Vue实例销毁前，清除定时器
       }
  }
}
</script>

<style lang="scss">
@import './../../styles/login.scss';
</style>
