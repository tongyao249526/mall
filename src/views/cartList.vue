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
                <el-checkbox-group v-model="checkedList" @change="handleCheckedCitiesChange">
                    <el-checkbox :label="index+1" :key="index"></el-checkbox>
                </el-checkbox-group>
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
        <el-checkbox v-model="checkAll" @change="allChange">全选</el-checkbox>
        <div class="fl alic">
            <div class="fl dir-r alic">
                <p>total:</p>
                <p class="cartList_totalPrice">{{totalPrice}}</p>
            </div>
            <div @click="toAddress()" class="pay_btn fl cen pointer">付款</div>
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
        //点击付款
        toAddress(){
            this.$router.push({
                path:'/address'
            })
        },
        //点击全选
        allChange(val) {
            let list = []
            if(val){
                for(let i=0;i<this.cartList.length;i++){
                    list.push(i+1)
                }
            }
            for(let y=0;y<this.cartList.length;y++){
                if(val){
                    this.cartList[y].checked = '1'
                }else{
                    this.cartList[y].checked = '0'
                }   
            }
            this.checkedList = val ? list : []
            //计算总价格
            this.totalPrice = 0
            for(let i=0;i<this.cartList.length;i++){
                this.totalPrice += this.cartList[i].salePrice * this.cartList[i].productNum
            }
            this.$ajax.post(urlJson.checkedAll,{
                checkedAll: val
            }).then((res)=>{
                console.log('购物车点击全选',res)
                if(res.data.status === '0'){}
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        //点击单个
        handleCheckedCitiesChange(value) {
            console.log('val',value)
            // let list
            this.totalPrice = 0
            this.checkAll = value.length === this.cartList.length;
            //计算总价格
            for(let x=0;x<this.cartList.length;x++){
                this.cartList[x].checked = '0'
            }
            for(let i=0;i<value.length;i++){
                this.totalPrice += this.cartList[value[i]-1].salePrice * this.cartList[value[i]-1].productNum
                this.cartList[value[i]-1].checked = '1'
            }
            let indexList = []
            for(let i=0;i<this.cartList.length;i++){
                indexList.push(i+1)
            }
            let list = this.getListDiff(indexList,value)
            this.$ajax.post(urlJson.checkedOne,{
                productId: this.cartList[list[0]-1].productId
            }).then((res)=>{
                console.log('购物车点击单选',res)
                if(res.data.status === '0'){
                    this.getCartList()
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        //获得两个数组中不相同的数据
        getListDiff(arr1, arr2) {
            return arr1.concat(arr2).filter(function(v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v);
            });
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
                    for(let i=0;i<this.cartList.length;i++){
                        if(this.cartList[i].checked === '1'){
                            this.checkedList.push(i+1)
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
