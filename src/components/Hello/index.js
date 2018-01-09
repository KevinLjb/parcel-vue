import appHello from './appHello.vue'

export default {
  install (Vue) {
    Vue.component('app-hello', appHello)
  }
}
