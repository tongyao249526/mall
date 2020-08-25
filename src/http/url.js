let url = 'api'
let urlJson = {

    login: `${url}/users/login`, //登陆

    cartEdit: `${url}/users/cartEdit`, //加减数量

    deleteProduct: `${url}/users/deleteProduct'`, //删除购物车的其中一项

    cartList: `${url}/users/cartList`, //获得购物车列表

    login: `${url}/users/login`, //登陆 

    checkLogin: `${url}/users/checkLogin`, //检验是否登陆过

    logout: `${url}/users/logout`, //登出




    addCart: `${url}/goods/addCart`, //加入购物车

    goods: `${url}/goods`, //获得商品数据

    address: `${url}/users/address`, //获得地址列表
    addAddress: `${url}/users/addAddress`, //添加地址
    deleteAddress:`${url}/users/deleteAddress`, //删除地址
}
export default urlJson