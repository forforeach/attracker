import Vue from 'vue'
import Vuetify from 'vuetify'
import router from './router'
import store from './stores/store'
import App from '@/App.vue'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
