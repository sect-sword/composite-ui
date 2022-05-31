import Vue from 'vue'
import App from './App.vue'


import router from './router'

import 'packages/theme-chalk/src/index.scss'

const vm = new Vue({// eslint-disable-line
  el: '#app',
  router,
  render: h => h(App)
})

console.log(vm)
