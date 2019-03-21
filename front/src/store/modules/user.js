import * as types from '../types'
import storageService from '@/services/storageService'
import { login, register, signOut } from '@/services/rest'
import { User } from '@/model'

const state = {
  hasLogin: storageService.get('hasLogin', false),
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
  },
  async login({ commit, dispatch }, user) {
    let res = await login(user.username, user.password)
    let resJson = await res.json()
    if (res.ok) {
      let userInfo = new User(resJson.username, resJson.phone, resJson._id, resJson.friends)
      commit(types.SET_USER_INFO, userInfo)
      storageService.set('userInfo', userInfo)
      commit(types.SET_LOGIN_STATUS)
      storageService.set('hasLogin', true)
    } else {
      commit(types.SEND_ERROR, '用户名或密码错误')
    }
    return res
  },
  async logOut({ commit, dispatch }) {
    let res = await signOut()
    let resJson = await res.json()
    if (res.ok) {
      dispatch("closeConnection")
      commit(types.REMOVE_LOGIN_STATUS)
    } else {
      commit(types.SEND_ERROR, '登出失败')
    }
    return res
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