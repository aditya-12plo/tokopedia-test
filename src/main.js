import Vue from 'vue'
import App from './App'
import router from './router'
import Toasted from 'vue-toasted'
require('es6-promise').polyfill()

Vue.config.productionTip = false

Vue.use(Toasted)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
