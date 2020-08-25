<template>
<div class="cartList">
    <div class="header fl jusc-between alic">
        <img class="logo" src="../assets/imgs/logo.png" alt="">
    </div>
    <p>MY CART</p>
    <div class="shop">
        <ul class="shop_ul fl dir-r">
            <li>名字</li>
            <li>价钱</li>
            <li>数量</li>
            <li>总共</li>
            <li>删除</li>
        </ul>
        <ul class="shop_ul fl cen" v-for="(item,index) in cartList" :key="index">
            <li class="fl alic">
                <el-checkbox-group v-model="checkedList" @change="handleCheckedCitiesChange">
                    <el-checkbox :label="index+1" :key="index"></el-checkbox>
                </el-checkbox-group>
                <img class="shop_good" src="../assets/imgs/yin.jpg" alt="">
                <span>{{item.productName}}</span>
            </li>
            <li>{{item.salePrice}}</li>
            <li class="fl jusc">
                <div @click="addOrSub('0',item)" class="shop_add pointer">-</div>
                <div class="shop_num">{{item.productNum}}</div>
                <div @click="addOrSub('1',item)" class="shop_add pointer">+</div>
            </li>
            <li>{{item.salePrice * item.productNum}}</li>
            <li @click="deleteProduct(item)" class="pointer">删除</li>
        </ul>
    </div>
    <div class="shop_all fl jusc-between alic">
        <el-checkbox v-model="checkAll" @change="allChange">全选</el-checkbox>
        <div class="fl alic">
            <p>total:{{totalPrice}}</p>
            <div class="pay_btn fl cen pointer">付款</div>
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
        checkedList: [],//选的列表
        cartList:[],//列表
        totalPrice: 0,
      }
    },
    mounted(){
        this.getCartList()
    },
    methods: {
        //点击全选
        allChange(val) {
            let list = []
            if(val){
                for(let i=0;i<this.cartList.length;i++){
                    list.push(i+1)
                }
            }
            this.checkedList = val ? list : []
            //计算总价格
            this.totalPrice = 0
            for(let i=0;i<this.cartList.length;i++){
                this.totalPrice += this.cartList[i].salePrice * this.cartList[i].productNum
            }
        },
        //点击单个
        handleCheckedCitiesChange(value) {
            this.totalPrice = 0
            this.checkAll = value.length === this.cartList.length;
            //计算总价格
            for(let i=0;i<value.length;i++){
                this.totalPrice += this.cartList[value[i]-1].salePrice * this.cartList[value[i]-1].productNum
            }
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
            this.totalPrice = 0
            for(let i=0;i<this.checkedList.length;i++){
                this.totalPrice += this.cartList[this.checkedList[i]-1].salePrice * this.cartList[this.checkedList[i]-1].productNum
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
                    // for(let i=0;i<this.cartList.length;i++){
                    //     if(this.cartList[i].checked === '1'){
                    //         this.checkedList.push(i+1)
                    //     }
                    // }
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
.cartList{
    background-color: #dae2e6;
    .header{
        height: 70px;
        margin: 0 auto;
        padding: 0 20px 0 20px;
        background-color: #ffffff;
        .logo{
            width: 70px;
            height: 50px;
        }
    }
    .shop{
        .shop_ul{
            padding: 35px 0;
            border-bottom: 1px solid #cccccc;
            padding-left: 20px;
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
                }
                .shop_add{
                    width: 30px;
                    height: 30px;
                    background-color: #cccccc;
                }
            }
        }
    }
    .shop_all{
        height: 70px;
        padding: 0 0 0 40px;
        background-color: #fff;
        .pay_btn{
            width: 100px;
            height: 70px;
            background-color: #ff5722;
            margin-left: 20px;
            color: #fff;
        }
    }
}           
</style>
