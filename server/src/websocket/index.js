import Router from 'koa-router'

function getWSRouter(users: object) {
  const router = new Router({})
  router.all('/', async (ctx, next) => {
    console.log('web socket')
    ctx.websocket.on('message', function (message) {
      // 返回给前端的数据
      var messageObj = JSON.parse(message)
      console.log(ctx.cookies.get('userId', { signed: true }
      if (messageObj.action == 'message') {
        console.log()
      }
      if (messageObj.action == 'picture') {

      }
      ctx.websocket.send(message)
      
    })

  })

  return router
}

export default getWSRouter