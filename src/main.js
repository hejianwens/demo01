import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import components from './utils';//全局引入公共组件
import http from './utils/http'
import cookie from 'vue-cookie'
Vue.prototype.$cookie = cookie;
Vue.config.productionTip = false
Vue.use(ElementUI)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
