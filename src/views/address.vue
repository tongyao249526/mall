<template>
<div class="address">
    <ul class="fl">
        <li>确认地址</li>
        <li>确认订单</li>
        <li>付款</li>
    </ul>
    <div class="address_choose">
        <p class="address_title">选择地址</p>
        <div class="address_total fl">
            <div class="address_every" v-for="(item,index) in addressList" :key="index">
                <p class="address_name">{{item.userName}}</p>
                <p class="address_address">{{item.streetName}}</p>
                <p class="address_phone">{{item.tel}}</p>
                <div class="address_default fl jusc-between">
                    <p>设置为默认地址</p>
                    <p @click="deleteAddress(item)">删除</p>
                </div>
            </div>
            <div @click="addAddress()" class="address_every" >
               添加一个新的地址
            </div>
        </div>
    </div>
</div>
</template>
<script>
import urlJson from '@/http/url'
export default {
    data(){
        return{
            addressList:[]//地址列表
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
        //删除地址
        deleteAddress(){
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
        .address_choose{
            .address_title{
                margin: 20px 0;
            }
            .address_total{
                flex-wrap: wrap;
                .address_every{
                    width: 270px;
                    background-color: #fff;
                    margin: 20px;
                    padding: 20px;
                    font-size: 18px;
                    .address_address{
                        margin-top: 10px;
                    }
                    .address_phone{
                        margin-top: 30px;
                    }
                    .address_default{
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>
