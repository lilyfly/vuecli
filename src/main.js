import Vue from 'vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'


import '@/styles/index.scss' // global css

import '@/icons' // icon
import '@/permission'

window.Vue = Vue;
Vue.config.productionTip = false;


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
//.env.production http://localhost:83/prod-api/user/login
//.env.development http://localhost:83/dev-api/user/login
//实际上线不需要mock
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}


Vue.use(ElementUI);

new Vue({
  router,
  store,
  provide: function () {
    return {
      uuu: function () {
        console.log(this);
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
