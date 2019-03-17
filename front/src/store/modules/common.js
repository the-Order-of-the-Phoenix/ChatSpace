import * as types from '../types'
import storageService from '@/services/storageService'

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
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}