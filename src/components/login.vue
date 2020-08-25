<template>
<div class="login">
  <div @click="close()" class="login_cover"></div>
  <div class="login_main">
      <p>Login in</p>
      <input v-model="name"  type="text" class="login_name login_left" placeholder="User Name">
      <input v-model="pwd"  type="text" class="login_name login_left" placeholder="Password">
      <button @click="loginIn()" class="login_name login_btn">登陆</button>
    </div>
</div>
</template>
<script>
import urlJson from '@/http/url'
export default {
    data(){
        return{
            name:'',
            pwd:'',
            userName:''
        }
    },
    computed:{
    },
    watch:{   
    },
    created(){
    },
    mounted(){
    },
    methods: {
      close(){
        this.$emit('closePopup',this.userName)
      },
      loginIn(){
        console.log('',this.name,this.pwd)
        this.$ajax.post(urlJson.login,{
            userName: this.name,
            userPwd: this.pwd,
        }).then((res)=>{
            console.log('res',res)
            if(res.data.status === '0'){
                if(res.data.result && res.data.result.userName) {
                  this.userName = res.data.result.userName
                  this.close()
                }else{
                   alert('用户名或密码错误')
                }
            }
        }).catch((err)=>{
          console.log('err',err)
        })
      }
    }
}
</script>
<style lang="less" scoped>
.login{
  .login_cover{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index:2;
  }
  .login_main{
    width: 400px;
    background-color:#fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 30px 40px 40px;
    z-index: 5;
    .login_name{
      width: 100%;
      height: 50px;
      border: 1PX solid #c4c4c4;
      margin-top: 20px;
    }
    .login_left{
      padding-left: 20px;
    }
    .login_btn{
      cursor:pointer;
    }
  }
}              
</style>
