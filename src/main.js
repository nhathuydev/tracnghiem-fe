// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import VeeValidate from 'vee-validate'
import Notification from 'vue-notification'
import VueHead from 'vue-head'
import vSelect from 'vue-select'
import ShortKey from 'vue-shortkey'
import Multiselect from 'vue-multiselect'
import store from './store'
import router from './router'
import App from './App'
import {Pagebar, Navbar, Footerr, Sidebar} from '@/components'

Vue.use(Vuex)
Vue.use(VueHead)
Vue.use(VeeValidate)
Vue.use(Notification)
Vue.use(ShortKey, { prevent: ['input', 'textarea'] })
Vue.component('v-select', vSelect)
Vue.component('multiselect', Multiselect)
Vue.component('Pagebar', Pagebar)
Vue.component('Navbar', Navbar)
Vue.component('Footerr', Footerr)
Vue.component('Sidebar', Sidebar)

Vue.config.productionTip = true
Vue.config.errorHandler = function (err, vm, info) {
  console.log(err, info)
}
Vue.prototype.moment = moment
global.router = router
global.token = JSON.parse(window.localStorage.getItem('user'))
/* eslint-disable no-new */
global.vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
