import * as types from '../types'
import storageService from '@/services/storageService'

const state = {
  hasLogin: false,
  userInfo: storageService.get('userInfo', {})
}

const actions = {
  setUserInfo({ commit }, userInfo) {
    storageService.set('userInfo', userInfo)
    commit(types.SET_USER_INFO, userInfo)
  },
  removeUserInfo({ commit }) {
    storageService.set('userInfo')
    commit(types.REMOVE_USER_INFO)
  }
}

const getters = {
  hasLogin: state => state.hasLogin,
  userInfo: state => state.userInfo
}

const mutations = {
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.REMOVE_USER_INFO](state) {
    state.userInfo = {}
  },
  [types.SET_LOGIN_STATUS](state) {
    state.hasLogin = true
  },
  [types.REMOVE_LOGIN_STATUS](state) {
    state.hasLogin = false
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}