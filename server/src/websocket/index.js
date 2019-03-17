import Router from 'koa-router'

import { getMsgEntityFromMsg, getUserIdFromSession } from './util'

function getWSRouter(users: object) {
  const router = new Router({})
  router.all('/', async (ctx, next) => {
    // 可以存当前user
    console.log('web socket')
    ctx.websocket.on('message', function (message) {
      // 返回给前端的数据
      let messageObj = getMsgEntityFromMsg(message)
      if (messageObj.action == 'connect') {
        let userId = getUserIdFromSession(messageObj.body.session)
        console.log('connect to server')
      }
      if (messageObj.action == 'message') {
        console.log("message")
      }
      if (messageObj.action == 'picture') {

      }
      ctx.websocket.send(JSON.stringify(messageObj))
      
    })

  })

  return router
}

export default getWSRouter