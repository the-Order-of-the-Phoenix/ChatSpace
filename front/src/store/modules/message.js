import * as types from "../types";
import storageService from "@/services/storageService";
import ReconnectWebSocket from "../../../static/js/reconnecting-websocket.min.js";
import { buildWsMessage, retrieveMessage, getChats, retrieveAllMessages } from '@/services/rest'
import {format} from '@/services/dateUtil' 

const state = {
  messages: storageService.get("messages", []),
  ws: null,
  curFriend: null,
  friends: storageService.get("friends", [])
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
  async setCurFriend({ commit, rootState, rootGetters }, friendId) {
    //首先获取对应messages
    let friendMessage = state.messages[friendId]
    if (!friendMessage) {
      let getMessageRes = await retrieveMessage(friendId)
      let getMessageResJson = await getMessageRes.json()
      let messages = getMessageResJson.messages
      commit(types.SET_MESSAGE, {friend: friendId, messages})
    }

    commit(types.SET_CUR_FRIEND, friendId)
  },

  closeConnection({commit, rootState}) {
    if (state.ws) {
      let disconnectMessage = buildWsMessage('disconnect', {
        session: rootState.user.userInfo.userId
      })
      state.ws.send(disconnectMessage)
      state.ws.close()
    }
    commit(types.CLOSE_WS)
  },

  setMessage({ commit }, friend, messages) {
    commit(types.SET_MESSAGE, {friend, messages})
  },

  async initFriends({ commit, rootState, dispatch }) {

    if (state.ws) {
      await dispatch('closeConnection')
    }

    let req = await getChats()
    let res = await req.json()
    let friends = {}//.map(friend => friend.)
    res.forEach(friend => friends[friend.id] = friend)
    const url = 'ws://139.199.186.217:3000/friend'
    const ws = new ReconnectWebSocket(url)
    ws.onopen = () => {
      const connectMessage = buildWsMessage(
        'connect',
        {
          session: rootState.user.userInfo.userId,
          friends: res.map(f => f.id)
        }
      )
      ws.send(connectMessage)
    }
    ws.onmessage = (messageEvent) => {
      let parsedMessageStr = JSON.parse(messageEvent.data)
      if (parsedMessageStr.action == 'message') {
        let body = parsedMessageStr.body
        let message = {
          sender: body.sender,
          friend: body.friend,
          content: body.content,
          type: 'text',
          created_at: body.created_at
        }
        commit(types.ADD_MESSAGE, { friend: body.friend, message })
      }
    }

    commit(types.SET_WS, ws)
    commit(types.SET_FRIENDS, friends)
    storageService.set('friends', friends)

    dispatch('initAllMessages')
  },

  async initAllMessages({ commit }) {
    let req = await retrieveAllMessages()
    let res = await req.json()
    res.forEach(message => {
      let friendId = message.friend
      let messages = message.messages
      commit(types.SET_MESSAGE,{ friend: friendId, messages})
    })
  }
};

const getters = {
  messages: state => state.messages,
  curFriend: state => state.curFriend,
  ws: state => state.ws,
  friends: state => state.friends,
  curMessages: state => {
    let messages = state.messages[state.curFriend]
    let curFriend = state.curFriend
    if (messages) messages.forEach(message => {
      message.date = format(message.created_at)
      message.name =
        state.friends[curFriend] && state.friends[curFriend].username ||
      "用户" + Math.floor(Math.random() * 100)
    })
    return messages
  }
};

const mutations = {
  [types.SET_CUR_FRIEND](state, friendId) {
    state.curFriend = friendId
  },
  [types.SET_WS](state, ws) {
    state.ws = ws
  },
  [types.CLOSE_WS](state) {
    state.ws = null
  },
  [types.ADD_MESSAGE](state, { friend, message }) {
    let messages = state.messages
    let curMessages = messages[friend]
    if (!curMessages) {
      curMessages = []
    }
    curMessages.push(message)
    messages[friend] = curMessages
    state.messages = { ...messages }
  },
  [types.SET_MESSAGE](state, { friend, messages }) {
    let messagesObj = state.messages
    messagesObj[friend] = messages
    state.messages = {...messagesObj}
  },
  [types.SET_FRIENDS](state, friends) {
    state.friends = friends
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
