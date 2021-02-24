<template>
<div class="address">
    <div class="address_top fl">
        <div :class="m.off?'address_yes':'address_no'" v-for="(m,n) in titleList" :key="n" class="fl cen" style="flex:1">
            <p>{{m.title}}</p>
            <div class="address_circle" :class="m.off?'address_circle_yes':'address_circle_no'"></div>
        </div>
    </div>
    <!-- 确认订单 -->
    <div class="order_confirm">
        <p class="order_head">ORDER CONTENT</p>
        <div>   
            <ul class="order_title fl dir-r alic">
                <li>商品信息</li>
                <li>价钱</li>
                <li>数量</li>
                <li>总共</li>
            </ul>
            <ul v-for="(a,b) in checkedList" :key="b" class="order_ul fl dir-r alic">
                <li class="fl alic">
                    <img class="order_good" src="../assets/imgs/yin.jpg" alt="">
                    <span>{{a.productName}}</span>
                </li>
                <li>${{a.salePrice}}</li>
                <li class="fl dir-c alic">
                    <div class="order_num">*{{a.productNum}}</div>
                    <p class="order_stock">In Stock</p>
                </li>
                <li>${{a.salePrice * a.productNum}}</li>
            </ul>
        </div>
        <div class="order_bottom fl dir-c pointer">
            <div>
                <div class="fl">
                    <p>Item subtotal:</p>
                    <p>${{subTotal}}</p>
                </div>
                <div class="fl">
                    <p>Shipping:</p>
                    <p>$20</p>
                </div>
                <div class="fl">
                    <p>Discount:</p>
                    <p>$0</p>
                </div>
                <div class="fl">
                    <p>Tax:</p>
                    <p>$10.00</p>
                </div>
                <div class="fl">
                    <p>Order total:</p>
                    <p>${{subTotal+30}}</p>
                </div>
            </div>
        </div>
        <div class="order_btnBox fl">
            <div  @click="pay()" class="order_btn fl cen pointer">支付</div>
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
                {title:'付款',off:false},
                {title:'付款成功',off:false},
            ],
            checkedList:[],
            subTotal:'',//总金额
            addressId:'',//地址id
        }
    },
    computed:{
    },
    watch:{   
    },
    created(){
    },
    mounted(){
        this.getCart()
    },
    methods: {
        // 支付
        pay(){
            this.$ajax.post(urlJson.payMent,{
               addressId: this.$route.query.addressId,
               orderTotal: Number(this.subTotal)+210
            }).then((res)=>{
                if(res.data.status === '0'){
                    console.log('创建订单完成',res,res.data.result.orderId)
                    this.$router.replace({
                        path:'/orderSuccess',
                        query:{
                            info:res.data.result
                        }
                    }) 
                }
            }) 
        },
        //获得结账的数据
        getCart(){
            this.$ajax.get(urlJson.cartList).then((res)=>{
                if(res.data.status === '0'){
                    console.log('购物车列表',res.data.result)
                   let list = res.data.result
                    for(let i=0;i<list.length;i++){
                        if(list[i].checked === '1'){
                            this.checkedList.push(list[i])
                            this.subTotal = Number(this.subTotal)+Number(list[i].productNum*list[i].salePrice)
                        }
                    }
                    console.log('checkedList',this.checkedList)
                }else if(res.data.status === '10001'){
                    alert(res.data.msg)
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
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
        // 确认订单
        .order_confirm{
            .order_head{
                padding: 30px 0 20px 0;
            }
            .order_title{
                height: 40px;
                background-color: #605f5f;
                color: #fff;
                li:first-child{
                    width: 49%;
                }
                li{
                    width: 17%;
                    text-align: center;
                }
            }
            .order_ul{
                padding: 35px 0;
                border-bottom: 1px solid #e9e9e9;
                padding-left: 20px;
                background-color: #fff;
                li:first-child{
                    width: 49%;
                }
                li:last-child{
                    color: #d1434a;
                }
                li{
                    width: 17%;
                    text-align: center;
                    .order_good{
                        width: 80px;
                        height: 80px;
                        margin: 0 20px 0 20px;
                        border: 1px solid #e9e9e9;
                    }
                    .order_num{
                        border: 1px solid #f0f0f0;
                        width: auto;
                        width: 60px;
                    }
                    .order_stock{
                        color: #d1434a;
                        margin-top: 5px;
                        font-size: 12px;
                    }
                }
            }
            .order_bottom{
                color: #999;
                flex-direction: row-reverse;
                margin-top: 40px;
                div{
                    div{
                        margin-bottom: 15px;
                        p{
                            width: 150px;
                            display: flex;
                            flex-direction: row-reverse;
                        }
                    }
                }
            }
            .order_btnBox{
                flex-direction: row-reverse;
                .order_btn{
                    width: 150px;
                    height: 40px;
                    background-color: #d1434a;
                    color: #fff;
                    margin-top: 15px;
                }
            }
            
        }
        
    }
</style>
