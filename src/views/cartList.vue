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
            <li class="fl cen">
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
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
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">选择全部</el-checkbox> -->
        <div class="fl">
            <p>total:2499</p>
            <p>付款</p>
        </div>       
    </div>
</div>
</template>
<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true,
        cartList:[],//列表
      };
    },
    mounted(){
        this.getCartList()
    },
    methods: {
        //加减数量
        addOrSub(type,item){
            if(type === '1'){
                item.productNum ++
            }else{
                if(item.productNum > 1){
                    item.productNum --
                }   
            }
            this.$ajax.post('api/users/cartEdit',{
                productId: item.productId,
                productNum: item.productNum
            }).then((res)=>{
                console.log('',res)
                if(res.data.status === '0'){
                   
                }
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        //点击删除
        deleteProduct(item){
            console.log('item',item)
            this.$ajax.post('api/users/deleteProduct',{
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
            this.$ajax.get('api/users/cartList').then((res)=>{
                if(res.data.status === '0'){
                    console.log('购物车列表',res.data.result)
                    this.cartList = res.data.result
                }else if(res.data.status === '10001'){
                    alert(res.data.msg)
                }
            }).catch((err)=>{

            })
        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }
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
        background-color: red;
        padding: 0 40px;
        // margin-top: 20px;
        background-color: #fff;
    }
}           
</style>
