import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes:[
    // { 
    //   path: '/', 
    //   name: 'goodsList', 
    //   meta:{
    //     title:'',
    //   },
    //   component: ()=> import('@/views/goodsList')
    // },
    // { 
    //     path: '/cartList', 
    //     name: 'cartList', 
    //     meta:{
    //       title:'',
    //     },
    //     component: ()=> import('@/views/cartList')
    // },
    { 
      path: '/', 
      name: 'address', 
      meta:{
        title:'',
      },
      component: ()=> import('@/views/address')
  },
  ]
})