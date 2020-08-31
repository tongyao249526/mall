<template>
<div class="address">
    <div class="address_top fl">
        <div :class="m.off?'address_yes':'address_no'" v-for="(m,n) in titleList" :key="n" class="fl cen" style="flex:1">
            <p>{{m.title}}</p>
            <div class="address_circle" :class="m.off?'address_circle_yes':'address_circle_no'"></div>
        </div>
    </div>
    <div class="order_success fl dir-c cen">
        <img class="order_img" src="../assets/imgs/smile.jpg" alt="">
        <p>恭喜您!</p>
        <p>您的订单已经创建完成!</p>
        <div class="order_info fl">
            <p>Order ID: {{info.orderId}}</p>
            <p>Order total: ${{info.orderTotal}}</p>
        </div>
        <div class="order_btn fl">
            <p @click="toCartList()" class="fl cen pointer">CART LIST</p>
            <p  @click="toGoodsList()" class="fl cen pointer">GOODS LIST</p>
        </div>
    </div>
</div>
</template>
<script>
import urlJson from '@/http/url'
export default {
    data(){
        return{
            addressList:[],//地址列表
            titleList:[
                {title:'确认地址',off:true},
                {title:'确认订单',off:true},
                {title:'付款',off:true},
                {title:'付款成功',off:true},
            ],
            addressId:'',//地址id
            info:{
                orderId:'',
                orderTotal:''
            }
        }
    },
    computed:{
    },
    watch:{   
    },
    created(){
        this.info = this.$route.query.info
    },
    mounted(){
    },
    methods: {
        toCartList(){
            this.$router.push({
                path:'/cartList'
            })
        },
        toGoodsList(){
            this.$router.push({
                path:'/'
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .address{
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 10px;
        .address_top{
            padding: 30px 0 20px 0;
            font-size: 20px;
            .address_yes{
                border-bottom: 2px solid #d1434a;
                color: #d1434a;
            }
            .address_no{
                border-bottom: 2px solid #ccc;
                color: #999;
            }
            div{
                padding-bottom: 15px;
                position: relative;
                .address_circle{
                    position: absolute;
                    bottom: -9px;
                    width: 14px;
                    height: 14px;
                    border-radius: 7px;
                    
                }
                .address_circle_yes{
                    background-color: #d1434a;
                }
                .address_circle_no{
                    background-color: #ccc;
                }
            }
        }
        .order_success{
            font-size: 18px;
            p{
                margin-top: 20px;
            }
            .order_img{
                width: 130px;
                height: 130px;
                margin-top: 60px;
            }
            .order_info{
                color: #999;
                margin: 20px 0 40px 0;
                p{
                    margin: 0 10px;
                }
            }
            .order_btn{
                p{
                    width: 200px;
                    height: 40px;
                    border: 1px solid #d1434a;
                    color: #d1434a;
                    margin: 0 10px;
                }
            }
        }
        
    }
</style>
