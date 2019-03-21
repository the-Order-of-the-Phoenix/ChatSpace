import Event from './dispatch'
import handleError from './handleError'

const event = Event()
const serviceUrl = "http://139.199.186.217:3000";
// 注册
export const register = (username, password, phone) => {
  event.publish('startLoad')
  return fetch(`${serviceUrl}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
      phone
    }),
    credentials: 'include',
  }).then(res => {
    event.publish("endLoad");
    return res
  }).catch(err => {
    event.publish('endLoad')
    handleError(err)
  })
}

// 登录
export const login = (username, password) => {
  event.publish("startLoad");
  return fetch(`${serviceUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    }),
    credentials: "include"
  })
    .then(res => {
      event.publish("endLoad");
      return res;
    })
    .catch(err => {
      event.publish("endLoad");
      handleError(err)
    });
}

// 登出
export const signOut = () => {
  event.publish("startLoad");
  return fetch(`${serviceUrl}/user/login`, {
    method: "delete",
    credentials: "include"
  })
    .then(res => {
      event.publish("endLoad");
      return res;
    })
    .catch(err => {
      event.publish("endLoad");
      handleError(err);
    });
}

// 获取聊天列表
export const getChats = () => {
  event.publish("startLoad");
  return fetch(`${serviceUrl}/friends`, {
    credentials: 'include'
  })
    .then(res => {
      event.publish("endLoad");
      return res;
    })
    .catch(err => {
      event.publish("endLoad");
      handleError(err);
    });
}

// 获取历史消息
export const retrieveMessage = (friendId: string) => {
  event.publish("startLoad");
  return fetch(`${serviceUrl}/message?friend=${friendId}`, {
    method: 'GET',
    credentials: 'include'
  })
    .then(res => {
      event.publish("endLoad");
      return res;
    })
    .catch(err => {
      event.publish("endLoad");
      handleError(err);
    });
}

// 获取所有历史消息
export const retrieveAllMessages = () => {
  event.publish("startLoad");
  return fetch(`${serviceUrl}/messages`, {
    method: 'GET',
    credentials: 'include'
  })
    .then(res => {
      event.publish("endLoad");
      return res;
    })
    .catch(err => {
      event.publish("endLoad");
      handleError(err);
    });
}

export const CreateWebSocket = function (urlValue) {
  if (window.WebSocket) return new WebSocket(urlValue)
  if (window.MozWebSocket) return new MozWebSocket(urlValue)
  return {}
}

export const buildWsMessage = (action, body) => {
  return JSON.stringify({
    action,
    body
  })
}

export const requestFriend = (friend: string) => {
  event.publish("startLoad");
  return fetch(`${serviceUrl}/friend`, {
    method: 'POST',
    body: JSON.stringify({
      friend
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(res => {
    event.publish("endLoad");
    return res;
  })
    .catch(err => {
      event.publish("endLoad");
      handleError(err);
    });
}

export const addFriendWithUsername = (username: string) => {
  event.publish("startLoad");
  return fetch(`${serviceUrl}/friend`, {
    method: 'POST',
    body: JSON.stringify({
      username
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(res => {
      event.publish("endLoad");
      return res;
    })
    .catch(err => {
      event.publish("endLoad");
      handleError(err);
    });
}