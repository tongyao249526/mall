<template>
<div class="header">
  <div class="header_top fl jusc-between alic">
    <login @closePopup="(name)=>close(name)" v-if="loginOff"></login>
    <img class="logo" src="../assets/imgs/logo.png" alt="">
    <div class="fl">
        <p v-if="nickName">{{nickName}}</p>
        <p class="pointer" @click="loginOut()" v-if="nickName">Logout</p>
        <p class="pointer" @click="loginIn()" v-else>Login</p>
        <i style="font-size:24px" class="iconfont icon-gouwuche pointer" @click="toCartList()"></i>
    </div>
  </div>
  <div class="header_bottom fl alic">
    <p>Home /</p>
    <p class="goods">{{title}}</p>
  </div>
</div>
</template>
<script>
import login from "@/components/login"
import urlJson from '@/http/url'
export default {
    data(){
        return{
            title:'Goods',
            loginOff:false,//登陆框不显示
            nickName:'',//用户的名字
        }
    },
    components:{
      login
    },
    computed:{
      
    },
    watch: {
    $route: {
      handler: function(to, from){
        console.log(to,from);
        let json = {
          '/':'Goods',
          '/cartList':'My Cart',
          '/address':'Address'
        }
        this.title = json[to.path] 
      },
      // 深度观察监听
      deep: true
    }
  },
    created(){
    },
    mounted(){
      this.checkLogin()
    },
    methods: {
        //验证是否已经登陆过
        checkLogin(){
            this.$ajax.get(urlJson.checkLogin).then((res)=>{
                if(res.data.status === '0'){
                    console.log('验证cookie是否存在',res)
                    this.nickName = res.data.result
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        //header点击登陆成功之后
        close(name){
            this.loginOff = false
            this.nickName = name
        },
        //跳转到购物车
          toCartList(){
              this.$router.push({
                  path:'/cartList',
              })
          },
        //点击Login
        loginIn(){
            this.loginOff = true
        },
        loginOut(){
            this.$ajax.post(urlJson.logout).then((res)=>{
                console.log('res',res)
                if(res.data.status == '0'){
                    this.nickName = ''
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
    }
}
</script>
<style lang="less" scoped>
.header{
  .header_top{
      height: 70px;
      margin: 0 auto;
      padding: 0 20px 0 20px;
      background-color: #ffffff;
      font-size: 20px;
      p{
          margin-right: 20px;
      }
      .logo{
        width: 70px;
        height: 50px;
      }
  } 
  .header_bottom{
      height: 45px;
      padding: 0 10px;
      font-size: 14px;
      color: #a1a1a1;
      background-color: rgba(161,161,161,0.2);
      .goods{
        margin-left: 15px;
        color: #d1434a;
      }
  }
}
   
</style>
