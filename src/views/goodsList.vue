<template>
    <div class="goodsList">
        <login @closePopup="(name)=>close(name)" v-if="loginOff"></login>
        <div class="header fl jusc-between alic">
                <img class="logo" src="../assets/imgs/logo.png" alt="">
                <div class="fl">
                    <p v-if="nickName">欢迎您{{nickName}}</p>
                    <p @click="loginOut()" v-if="nickName">登出</p>
                    <p @click="loginIn()" v-else>登陆</p>
                    <p @click="toCartList()">购物车</p>
                </div>
        </div>
        <div class="main">
            <div class="main_header">
                <p @click="sortChange()" v-if="sort === '1'">Price↑</p>
                <p @click="sortChange()" v-else>Price↓</p>
            </div>
            <div class="main_content fl">
                <div class="price">
                    <p>PRICE</p>
                    <p :style="{color: x.off?'#ff5722':''}" @click="priceChange(x)" v-for="(x,y) in priceList" :key="y">{{x.title}}</p>
                </div>
                <div class="goods fl">
                    <div class="goods_every" v-for="(item,index) in goodsList" :key="index">
                        <img class="goods_img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597745925351&di=f76faafa85530fd3c729e4f988140492&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F11%2F30%2F8b97bd7e8ba5f7dbd8d768a4f41546fb.jpg" alt="">
                        <p class="goods_name">{{item.productName}}</p>
                        <p class="goods_price">{{item.salePrice}}</p>
                        <div  @click="addCart(item.productId)" class="goods_car fl cen">
                            加入购物车
                        </div>
                    </div>
                </div>
            </div>
            <div class="fl jusc">
                <el-pagination
                :page-size="pageSize"
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="currentChange"
                :current-page.sync="page"
                >
                </el-pagination> 
            </div>
        </div>
    </div>
</template>
<script>
import login from "@/components/login"
export default {
    data(){
        return{
            goodsList:[],
            priceList:[
                {title:'ALL',val:'all',off:true},
                {title:'0-100',val:'0',off:false},
                {title:'100-500',val:'1',off:false},
                {title:'500-1000',val:'2',off:false},
                {title:'1000-5000',val:'3',off:false},
            ],
            priceLevel:'all',
            sort:'1',
            page:1,
            pageSize:5,
            total: 17,
            loginOff:false,//登陆框不显示
            nickName:'',//用户的名字
        }
    },
    components:{
        login
    },
    computed:{
    },
    watch:{   
    },
    created(){
        this.getData()
    },
    mounted(){
        this.checkLogin()
    },
    methods: {
        //跳转到购物车
        toCartList(){
            this.$router.push({
                path:'/cartList',
            })
        },
        //验证是否已经登陆过
        checkLogin(){
            this.$ajax.get('api/users/checkLogin').then((res)=>{
                if(res.data.status === '0'){
                    console.log('验证cookie是否存在',res)
                    this.nickName = res.data.result
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        //点击Login
        loginIn(){
            this.loginOff = true
        },
        loginOut(){
            this.$ajax.post('api/users/logout').then((res)=>{
                console.log('res',res)
                if(res.data.status == '0'){
                    this.nickName = ''
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
        //加入购物车
        addCart(id){
            this.$ajax.post('api/goods/addCart',{
                productId:id,
            }).then((res)=>{
                console.log('res',res)
                if(res.data.status === '0'){
                    alert('加入购物车成功')
                }else if(res.data.status === '10001'){
                    alert(res.data.msg)
                }
            }).catch((err)=>{

            })
        },
        //当前页改变
        currentChange(val){
            this.page = val
            this.getData()
        },
        //正序倒序
        sortChange(){
            if(this.sort === '1'){
                this.sort = '-1'
            }else{
                this.sort = '1'
            }
            this.getData()
        },
        //左面的价格筛选
        priceChange(x){
            this.page = 1
            for(let i=0;i<this.priceList.length;i++){
                this.priceList[i].off = false
            }
            x.off = true
            this.priceLevel = x.val
            this.getData()
        },
        //获得数据
        getData(){
            this.$ajax.get('api/goods',{
                params:{
                    page: this.page,
                    pageSize: this.pageSize,
                    priceLevel: this.priceLevel,
                    sort: this.sort
                }
            }).then((res)=>{
                console.log('商品列表',res)
                if(res.data.status === '0'){
                    this.goodsList = res.data.result.list
                    this.total = res.data.result.total
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.goodsList{
    min-height: 100vh;
    background-color: #d7dfe2;
    padding-bottom: 50px;
    .header{
        height: 70px;
        margin: 0 auto;
        padding: 0 20px 0 20px;
        background-color: #ffffff;
        p{
            margin-right: 20px;
        }
        .logo{
            width: 70px;
            height: 50px;
        }
    }
    .main{
        padding: 0 70px;
        .main_header{
            height: 55px;
            line-height: 55px;
            margin: 60px 0 30px 0;
            padding: 0 20px;
            background: #fff;
            text-align: right;
            overflow: hidden;
            p{
                cursor:pointer
            }
        }
        .main_content{
            .price{
                width: 230px;
                margin-right: 25px;
                p{
                    cursor:pointer;
                    margin-top: 30px;
                }
            }
            .goods{
                flex-wrap: wrap;
                flex: 1;
                .goods_every{
                    margin-right: 30px;
                    margin-bottom: 30px;
                    background-color: #fff;
                    padding: 10px 10px;
                    .goods_img{
                        width: 208px;
                        height: 208px;
                    }
                    .goods_name{
                        height: 56px;
                    }
                    .goods_price{
                        color: #d1434a;
                    }
                    .goods_car{
                        width: 100%;
                        height: 40px;
                            text-align: center;
                            font-size: 14px;
                            font-weight: 700;
                            border: 1px solid #d1434a;
                            color: #d1434a;
                    }
                    .goods_car:hover{
                        background-color: #ffe5e6;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
