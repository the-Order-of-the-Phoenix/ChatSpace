import * as Router from 'koa-router';
import * as koa from 'koa'

import * as model from '../schema'

export const login = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  let body = ctx.request.body
  ctx.throw()
  let username: string = body.username
  let password: string = body.password

  let user = model.User.find({username, password})

  if (user) {
    ctx.response.body = user
  } else {
    ctx.response.body = 
  }
  
}

export const register = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  let requestBody = ctx.request.body;
  const username: string = requestBody.username
  const password: string = requestBody.password
  let user = new model.User({
    username,
    password
  })
  ctx.response.body = user
}

