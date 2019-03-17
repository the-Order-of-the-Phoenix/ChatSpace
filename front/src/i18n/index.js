import messages from './message'
import Vue from 'vue'
import Vuei18n from 'vue-i18n'

Vue.use(Vuei18n)

const vuei18n = new Vuei18n({
  messages,
  locale: 'zh'
})

export default vuei18n