import * as types from '../types'
import storageService from '@/services/storageService'
import MuseUIToast from "muse-ui-toast";

const state = {
  curNav: 'home',
  loading: 0
}

const actions = {
  goToNav({ commit }, nextNav) {
    commit(types.CHANGE_NAV, nextNav)
  },
  addLoading({ commit }) {
    commit(types.ADD_LOADING)
  },
  removeLoading({ commit }) {
    commit(types.REMOVE_LOADING)
  }
}

const getters = {
  curNav: state => state.curNav,
  isLoading: state => state.loading > 0
}

const mutations = {
  [types.CHANGE_NAV](state, nextNav) {
    state.curNav = nextNav
  },
  [types.ADD_LOADING](state) {
    state.loading++
  },
  [types.REMOVE_LOADING](state) {
    state.loading--
  },
  [types.SEND_TOAST](state, message) {
    MuseUIToast.message(message)
  },
  [types.SEND_ERROR](state, message) {
    MuseUIToast.error(message)
  },
  [types.SEND_SUCCESS](state, message) {
    MuseUIToast.success(message)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}