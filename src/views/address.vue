<template>
<div class="address">
    <div class="address_top fl">
        <div :class="m.off?'address_yes':'address_no'" v-for="(m,n) in titleList" :key="n" class="fl cen" style="flex:1">
            <p>{{m.title}}</p>
            <div class="address_circle" :class="m.off?'address_circle_yes':'address_circle_no'"></div>
        </div>
    </div>
    <!-- 确认地址 -->
    <div class="address_confirm" v-if="titleList[0].show">
        <div class="address_choose">
            <p class="address_title">选择地址</p>
            <div class="address_total fl">
                <div class="address_every" v-for="(item,index) in addressList" :key="index">
                    <p class="address_name">{{item.userName}}</p>
                    <p class="address_address">{{item.streetName}}</p>
                    <p class="address_phone">{{item.tel}}</p>
                    <div class="address_default fl jusc-between">
                        <p @click="!item.isDefault && setDefault(item)" class="address_set pointer">{{item.isDefault?'默认地址':'设置为默认地址'}}</p>
                        <p class="pointer" @click="deleteAddress(item)">
                            <i class="iconfont icon-shanchu" style="font-size:20px"></i>
                        </p>
                    </div>
                </div>
                <div @click="addAddress()" class="address_every" >
                添加一个新的地址
                </div>
            </div>
        </div>
        <div class="address_bottom fl pointer">
            <div @click="next()" class="address_btn fl cen">NEXT</div>
        </div>
    </div>
    <!-- 确认订单 -->
    <div class="order_confirm" v-if="titleList[1].show">
        <p class="order_head">ORDER CONTENT</p>
        <div>   
            <ul class="order_title fl dir-r alic">
                <li>商品信息</li>
                <li>价钱</li>
                <li>数量</li>
                <li>总共</li>
            </ul>
            <ul v-for="(a,b) in 2" :key="b" class="order_ul fl dir-r alic">
                <li class="fl alic">
                    <img class="order_good" src="../assets/imgs/yin.jpg" alt="">
                    <span>产品</span>
                </li>
                <li>$700</li>
                <li class="fl dir-c alic">
                    <div class="order_num">*3</div>
                    <p class="order_stock">In Stock</p>
                </li>
                <li>$2000</li>
            </ul>
        </div>
        <div class="order_bottom fl dir-c pointer">
            <div>
                <div class="fl">
                    <p>Item subtotal:</p>
                    <p>$2,268.00</p>
                </div>
                <div class="fl">
                    <p>Shipping:</p>
                    <p>$200</p>
                </div>
                <div class="fl">
                    <p>Discount:</p>
                    <p>$2</p>
                </div>
                <div class="fl">
                    <p>Tax:</p>
                    <p>$100.00</p>
                </div>
                <div class="fl">
                    <p>Order total:</p>
                    <p>$2,268.00</p>
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
                {title:'确认地址',off:true,show:false},
                {title:'确认订单',off:false,show:true},
                {title:'付款',off:false,show:false},
                {title:'付款成功',off:false,show:false},
            ],
        }
    },
    computed:{
    },
    watch:{   
    },
    created(){
    },
    mounted(){
        this.getAddress()
    },
    methods: {
        // 支付
        pay(){

        },
        //确认地址 
        next(){
            for(let i=0;i<this.titleList.length;i++){
                this.titleList[i].off = false
                this.titleList[i].show = false
            }
            this.titleList[0].off = true
            this.titleList[1].off = true
            this.titleList[1].show = true
        },
        //设置默认地址
        setDefault(item){
            this.$ajax.post(urlJson.setDefault,{
                addressId: item.addressId,
            }).then((res)=>{
                if(res.data.status === '0'){
                    console.log('设置默认地址',res)
                    this.getAddress()
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        //删除地址
        deleteAddress(item){
            this.$ajax.post(urlJson.deleteAddress,{
                addressId: 10008,
            }).then((res)=>{
                if(res.data.status === '0'){
                    console.log('删除地址',res)
                    this.getAddress()
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        //添加一个新的地址
        addAddress(){
            this.$ajax.post(urlJson.addAddress,{
                addressId: 10008,
                isDefault:false,
                streetName:'沈阳市铁西区',
                tel:'1233444555',
                userName:'tytyty'
            }).then((res)=>{
                if(res.data.status === '0'){
                    console.log('添加地址',res)
                    this.getAddress()
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        //地址列表
        getAddress(){
            this.$ajax.get(urlJson.address).then((res)=>{
                if(res.data.status === '0'){
                    console.log('地址列表',res.data.result)
                    this.addressList = res.data.result
                }
            }).catch((err)=>{
                console.log('err',err)
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
        // 确认地址
        .address_confirm{
            .address_choose{
                .address_title{
                    margin: 20px 0;
                }
                .address_total{
                    flex-wrap: wrap;
                    .address_every:hover{
                        transform: translateY(-6px);
                        transition: all .5s ease-out;
                        border: 2px solid #ee7a23;
                        box-shadow: 0 0 20px 5px rgba(0,0,0,0.1);
                    }
                    .address_every{
                        width: 270px;
                        background-color: #fff;
                        margin: 20px 20px 20px 0;
                        padding: 20px;
                        font-size: 18px;
                        border: 2px solid transparent;
                        .address_address{
                            margin-top: 10px;
                        }
                        .address_phone{
                            margin-top: 30px;
                        }
                        .address_default{
                            margin-top: 10px;
                            .address_set{
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
            .address_bottom{
                width: 100%;
                flex-direction: row-reverse;
                margin-top: 20px;
                .address_btn{
                    width: 200px;
                    height: 40px;
                    background-color: #d1434a;
                    color: #fff;
                    font-size: 14px;
                    font-family: moderat,sans-serif;        
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
