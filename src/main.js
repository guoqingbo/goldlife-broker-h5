// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "babel-polyfill"

import './config/rem'//屏幕适配

Vue.config.productionTip = false

//引入ui框架
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

//引入阿里图标库
import './assets/iconfont/iconfont.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
