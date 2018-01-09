import Vue from 'vue'
import App from './App'
import router from './router'
import './components/index.js'
import store from './store'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
