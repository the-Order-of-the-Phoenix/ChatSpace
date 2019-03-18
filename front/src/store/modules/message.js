import * as types from "../types";
import storageService from "@/services/storageService";
import ReconnectWebSocket from "../../../static/js/reconnecting-websocket.min.js";
import { buildWsMessage } from '@/services/rest'

const state = {
  messages: new Map(),
  ws: null,
  curFriend: null
};

const actions = {
  sendMessage({ commit, rootState }, message) {
    // 利用当前 curFriend 和 userId 以及 socket 直接发送
    const ws = state.ws
    const userId = rootState.user.userInfo.userId
    const friend = state.curFriend
    const fullMessage = buildWsMessage('message', {
      content: message,
      sender: userId,
      session: userId,
      friend
    })
    ws.send(fullMessage)
  },
  setCurFriend({ commit, rootState, rootGetters }, friendId) {
    debugger
    const url = 'ws://localhost:3000/' + friendId
    const ws = new ReconnectWebSocket(url)
    ws.onopen = () => {
      const connectMessage = buildWsMessage(
        'connect',
        {
          session: rootState.user.userInfo.userId
        }
      )
      ws.send(connectMessage)
    }
    commit(types.SET_CUR_FRIEND, friendId)
    commit(types.SET_WS, ws)
  }
};

const getters = {
  messages: state => state.messages,
  curFriend: state => state.curFriend,
  ws: state => state.ws
};

const mutations = {
  [types.SET_CUR_FRIEND](state, friendId) {
    state.curFriend = friendId
  },
  [types.SET_WS](state, ws) {
    state.ws = ws
  },
  [types.SET_MESSAGE](state, message) {
    state.messages.push(message)
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
