import Router from 'koa-router'

function getWSRouter() {
  const router = new Router({})
  router.all('/', async (ctx, next) => {
    console.log('web socket')
    ctx.websocket.on('message', function (message) {
      // 返回给前端的数据
      ctx.websocket.send(message)
      console.log(message)
      console.log(ctx.cookies.get('userId', {signed: true}))
    })
  })

  return router
}

export default getWSRouter