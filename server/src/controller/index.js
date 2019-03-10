
/**
 * controller中放置所有路由
 */
import Router from 'koa-router'

import * as UserController from './userController'
import { BaseError } from '../entity';


function getRouter(): Router {
  const router = new Router({

  })

  router.get('/', async (ctx) => {
    ctx.body = 'Hello World!'
  });

  router.post('/user', UserController.register)

  router.post('/user/login', UserController.login) 

  router.get('/user', UserController.getCurUser)

  router.delete('/user/login', UserController.needLogin, UserController.signOut)

  router.get('/error', async (ctx) => {
    ctx.throw(new BaseError(200, 'test'))
  })

  return router
}



export default getRouter