import Event from '@/services/dispatch'

const event = Event()
const serviceUrl = 'http://localhost:3000'
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
    throw err
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
      throw err;
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
      throw err;
    });
}

// 获取聊天列表
export const getChats = () => {

}

// 获取历史消息
export const retrieveMessage = () => {

}