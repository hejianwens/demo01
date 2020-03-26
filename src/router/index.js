import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Demo01 from '../views/demo01.vue'
import Login from '../views/user/login.vue'
import Main from '../views/user/main.vue'
import SearchGoods from '../views/user/searchGoods.vue'
import listOrder from '../views/user/listOrder.vue'
import car from '../views/user/car.vue'
import payment from '../views/user/payment.vue'
import manager from '../views/shopHost/manager.vue'
import managerLogin from '../views/shopHost/managerLogin.vue'
import refund from '../views/shopHost/refund.vue'
import pay from '../views/user/pay.vue'
import info from '../views/user/info.vue'
import evaluate from '../views/user/evaluate.vue'
import axios from 'axios';
import cookie from 'vue-cookie'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/manager',
    name: 'manager',
    component: manager,
    meta: { // 在路由配置中加入meta:{requireAuth: true}
      requireAuth: true
    }
  },
  {
    path: '/refund',
    name: 'refund',
    component: refund,
    meta: { // 在路由配置中加入meta:{requireAuth: true}
      requireAuth: true
    }
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: evaluate,
    meta: { // 在路由配置中加入meta:{requireAuth: true}
      requireAuth: true
    }
  },
  {
    path: '/payment',
    name: 'payment',
    component: payment,
    meta: { // 在路由配置中加入meta:{requireAuth: true}
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/demo01',
    name: 'demo01',
    component: Demo01
  },
  {
    path: '/searchGoods',
    name: 'searchGoods',
    component: SearchGoods
  },

  {
    path: '/listOrder',
    name: 'listOrder',
    component: listOrder,
    meta: { // 在路由配置中加入meta:{requireAuth: true}
      requireAuth: true
    }
  },
  {
    path: '/car',
    name: 'car',
    component: car,
    meta: { // 在路由配置中加入meta:{requireAuth: true}
      requireAuth: true
    }
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/info',
    name: 'info',
    component: info
  },
  {
    path: '/managerLogin',
    name: 'managerLogin',
    component: managerLogin
  },
  {
    path: '/pay',
    name: 'pay',
    component: pay,
    meta: { // 在路由配置中加入meta:{requireAuth: true}
      requireAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  let _this = this;
  let islogin = false;
  let key = cookie.get('loginKey');
  console.log(to);
  console.log(from);
  if (to.meta.requireAuth) {
    if (to.path == "/manager") {
      axios({
        method: 'get',
        url: 'shop/checkShopLogin?loginKey=' + key,
        data: {
        }
      })
        .then(function (response) {
          if (response.data.code == "200") {
            next();
          }
          else {
            window.alert(response.data.message);
            next("/managerLogin");
          }
        })
        .catch(function (error) {
          next("/managerLogin");
          console.log(error);
        });
    }
    else {
      axios({
        method: 'get',
        url: 'customer/checkCustomerLogin?loginKey=' + key,
        data: {

        }
      })
        .then(function (response) {
          if (response.data.code == "200") {
            next();
          }
          else {
            window.alert(response.data.message);
            next("/main");
          }
        })
        .catch(function (error) {
          next("/main");
          console.log(error);
        });

    }

  }
  else {
    next();
  }

})
