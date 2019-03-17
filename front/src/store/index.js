import Vue from "vue"
import Vuex from "vuex"

import common from './modules/common'
import friend from './modules/friend'
import message from './modules/message'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    friend,
    message,
    user
  }
})