
/**
 * controller中放置所有路由
 */
import * as Router from 'koa-router';

import * as UserController from './userController'


function getRouter(): Router {
  const router = new Router({

  })

  router.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
  });

  router.post('/register', UserController.register)

  router.post('/login', UserController.login) 

  return router
}



export default getRouter