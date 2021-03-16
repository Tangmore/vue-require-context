// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from "@/router";
import store from "@/store";
import api from '@/api' // 导入api接口
import ElementUI from 'element-ui' //element-ui的全部组件

import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import '@/assets/font/iconfont.css'
import './assets/element-public.scss'

import "@/plugins/mixin";
// import "@/plugins/directives";

Vue.use(ElementUI);//使用elementUI
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.config.productionTip = false
 
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
