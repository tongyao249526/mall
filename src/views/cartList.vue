<template>
<div class="cartList">
    <p class="cartList_title">MY CART</p>
    <div class="shop">
        <ul class="shop_title fl dir-r alic">
            <li>名字</li>
            <li>价钱</li>
            <li>数量</li>
            <li>总共</li>
            <li>编辑</li>
        </ul>
        <ul class="shop_ul fl cen" v-for="(item,index) in cartList" :key="index">
            <li class="fl alic">
                <div @click="getOne(item)" class="shop_ul_box">
                    <input :value="item.productNameId" :class="item.checked === '1'?'shop_input_checked':''" class="shop_input" type="radio" name="sex" :id="index" />
                    <label :for="index"></label>  
                    <i v-if="item.checked === '1'" style="font-size:18px" class="iconfont icon-duihao shop_ul_duihao"></i>
                </div>
               
                <img class="shop_good" src="../assets/imgs/yin.jpg" alt="">
                <span>{{item.productName}}</span>
            </li>
            <li>${{item.salePrice}}</li>
            <li class="fl jusc">
                <div @click="addOrSub('0',item)" class="shop_add pointer fl cen">-</div>
                <div class="shop_num fl cen">{{item.productNum}}</div>
                <div @click="addOrSub('1',item)" class="shop_add pointer fl cen">+</div>
            </li>
            <li class="cartList_price">${{item.salePrice * item.productNum}}</li>
            <li @click="deleteProduct(item)" class="pointer">
                <i class="iconfont icon-shanchu" style="font-size:22px"></i>
            </li>
        </ul>
    </div>
    <div class="shop_all fl jusc-between alic">
        <!-- <div>
            <input :class="checkAll?'shop_input_checked':''" @click="getAll()" class="shop_input" type="radio" name="redio" id="all" />
            <label for="all">全部</label>

        </div> -->
        <div @click="getAll()" class="shop_ul_box fl alic">
            <input :class="checkAll?'shop_input_checked':''" class="shop_input" type="radio" name="redio" id="all" />
            <label class="shop_ul_label" for="all">全部</label>
            <i v-if="checkAll" style="font-size:18px" class="iconfont icon-duihao shop_ul_duihao"></i>
        </div>
        <div class="fl alic">
            <div class="fl dir-r alic">
                <p>total:</p>
                <p class="cartList_totalPrice">{{totalPrice}}</p>
            </div>
            <div @click="totalPrice && toAddress()" class="pay_btn fl cen pointer">付款</div>
        </div>       
    </div>
</div>
</template>
<script>
import urlJson from '@/http/url'
  export default {
    data() {
      return {
        checkAll: false,//全选
        cartList:[],//列表
        totalPrice: 0,
      }
    },
    mounted(){
        this.getCartList()
    },
    watch:{
        cartList:{
            handler(newValue, oldValue){
                this.totalPrice = 0
                for(let i=0;i<newValue.length;i++){
                    if(newValue[i].checked === '1'){
                        this.totalPrice += newValue[i].salePrice * newValue[i].productNum
                    }
                }
            },
            deep:true
        }　　　
    },
    methods: {
        //全选
        getAll(){
            this.checkAll = !this.checkAll
            this.$ajax.post(urlJson.checkedAll,{
                checkedAll: this.checkAll
            }).then((res)=>{
                console.log('购物车点击全选',res)
                if(res.data.status === '0'){
                    this.getCartList()
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        //选择一个
        getOne(item){
            this.$ajax.post(urlJson.checkedOne,{
                productId: item.productId
            }).then((res)=>{
                console.log('购物车点击单选',res)
                if(res.data.status === '0'){
                    this.getCartList()
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        //点击付款
        toAddress(){
            this.$router.push({
                path:'/address'
            })
        },
        //加减数量
        addOrSub(type,item){
            if(type === '1'){
                item.productNum ++
            }else{
                if(item.productNum > 1){
                    item.productNum --
                }   
            }
            this.$ajax.post(urlJson.cartEdit,{
                productId: item.productId,
                productNum: item.productNum
            }).then((res)=>{
                console.log('',res)
                if(res.data.status === '0'){}
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        //点击删除
        deleteProduct(item){
            console.log('item',item)
            this.$ajax.post(urlJson.deleteProduct,{
                productId:item.productId
            }).then((res)=>{
                if(res.data.status === '0'){
                    this.getCartList()
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        //获得列表
        getCartList(){
            this.$ajax.get(urlJson.cartList).then((res)=>{
                if(res.data.status === '0'){
                    console.log('购物车列表',res.data.result)
                    this.cartList = res.data.result
                    for(let i=0;i<this.cartList.length;i++){
                        if(this.cartList[i].checked === '0'){
                            this.checkAll = false
                            return
                        }else{
                            this.checkAll = true
                        }
                    }
                }else if(res.data.status === '10001'){
                    alert(res.data.msg)
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
    }
  };
</script>
<style lang="less" scoped>
.shop_input{
    width: 18px;
    height: 18px;
}
.shop_input_checked{
    // background-color: red;
}
.shop_ul_box{
    position: relative;
    .shop_ul_duihao{
        position: absolute;
        top: 0;
        left: 0;
    }
}
.cartList{
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 10px;
    .cartList_title{
        padding: 40px 0 20px 0;
        font-size: 22px;
        text-transform: uppercase;
        letter-spacing: .25em;
        font-weight: 700;
    }
    .shop{
        font-size: 16px;
        .shop_title{
            height: 40px;
            background-color: #605f5f;
            color: #fff;
            li{
                width: 20%;
                text-align: center;
            }
        }
        .shop_ul{
            padding: 35px 0;
            border-bottom: 1px solid #e9e9e9;
            padding-left: 20px;
            background-color: #fff;
            .cartList_price{
                color: #d1434a;
            }
            li{
                width: 20%;
                text-align: center;
                
                .shop_good{
                    width: 60px;
                    height: 60px;
                    margin: 0 20px;
                }
                .shop_num{
                    margin: 0 10px;
                    color: #605f5f;
                }
                .shop_add{
                    width: 30px;
                    height: 30px;
                    background-color: #f0f0f0;
                }
            }
        }
    }
    .shop_all{
        height: 70px;
        padding: 0 0 0 40px;
        background-color: #fff;
        margin-top: 20px;
        .shop_ul_label{
            font-size: 14px;
            margin-left: 15px;
        }
        .pay_btn{
            // width: 100px;
            padding: 0 35px;
            height: 70px;
            background-color: #d1434a;
            margin-left: 30px;
            color: #fff;
            font-size: 18px;
        }
        .cartList_totalPrice{
            margin-left: 6px;
            color: #d1434a;
            font-size: 1.125em;
            font-weight: 600;
        }
    }
}           
</style>
