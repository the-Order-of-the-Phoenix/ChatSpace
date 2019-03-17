// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MuseUI from "muse-ui"
import "muse-ui/dist/muse-ui.css"
import "muse-ui-message/dist/muse-ui-message.css"
import "muse-ui-loading/dist/muse-ui-loading.css"

import App from './App'
import router from './router'
import store from './store'
import vuei18n from './i18n'

import MuseUIToast from "muse-ui-toast"
import MuseUIMessage from 'muse-ui-message'
import MuseUILoading from "muse-ui-loading"

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(MuseUIToast)
Vue.use(MuseUIMessage)
Vue.use(MuseUILoading)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n: vuei18n,
  components: { App },
  template: '<App/>'
})
