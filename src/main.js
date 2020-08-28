import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "@/assets/css/reset.css"
import "@/assets/icon/iconfont.css"
import axios from 'axios'
import {Pagination,CheckboxGroup,Checkbox}from 'element-ui';
Vue.use(Pagination);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
