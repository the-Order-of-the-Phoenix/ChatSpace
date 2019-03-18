
/**
 * controller中放置所有路由
 */
import Router from 'koa-router'

import * as UserController from './userController'
import * as FriendController from './friendController'
import * as FileController from './fileController'
import * as MessageController from './messageController'
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

  router.post('/friend', UserController.needLogin, FriendController.requestFriend)

  router.get('/friends', UserController.needLogin, FriendController.getFriendList)

  router.get('/friend/requesting', UserController.needLogin, FriendController.getRequestingFriendList)

  router.delete('friend', UserController.needLogin, FriendController.delFriend)

  router.get('/friend/:id', UserController.needLogin, FriendController.getFriend)

  router.put('/friend/:id', UserController.needLogin, FriendController.modifyFriend)

  router.get('/message', UserController.needLogin, MessageController.getMessage)

  router.get('/file', UserController.needLogin, FileController.getFilePath)

  router.post('/file', UserController.needLogin, FileController.uploadFileSync)

  // router.post

  router.get('/error', async (ctx) => {
    ctx.throw(new BaseError(200, 'test'))
  })

  return router
}



export default getRouter