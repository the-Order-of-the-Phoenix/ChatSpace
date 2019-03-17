import Router from 'koa-router';
import koa from 'koa'

import model from '../schema'
import { BaseError } from '../entity';
import { Types } from 'mongoose';

export const login = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const body = ctx.request.body
  const username: string = body.username
  const password: string = body.password

  const query = model.User.findOne({ username, password })
  const user = await query.exec()

  console.log(body)
  
  console.log(user)

  if (user) {
    ctx.cookies.set('userId', user._id, { signed: true, maxAge: 7200000 })
    user.password = undefined
    ctx.response.body = user
    console.log(`user ${user._id} signed in`)
  } else {
    ctx.throw(new BaseError(404, 'can\'t find user'))
  }
  
}

export const register = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const requestBody = ctx.request.body;
  const phone: string = requestBody.phone
  const username: string = requestBody.username
  const password: string = requestBody.password
  const user = model.User.create({
    username,
    password,
    phone
  })

  console.log(`user ${user._id} registered at ${new Date()}`)
  delete user.password
  ctx.response.body = user
}

export const getCurUser = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const id = ctx.cookies.get('userId', {signed: true})

  if (id) {
    const query = model.User.findOne({ _id: new Types.ObjectId(id) })
    const user = await query.exec()
    delete user.password
    ctx.response.body = user
  } else {
    ctx.throw(new BaseError(404, 'not login yet'))
  }
}

export const needLogin = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const id = ctx.cookies.get('userId', { signed: true })

  if (id) {
    const query = model.User.findOne({ _id: new Types.ObjectId(id) })
    const user = await query.exec()
    ctx.user = user
    if (next) await next()
  } else {
    ctx.throw(new BaseError(404, 'not login yet'))
  }
}

export const signOut = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const user = ctx.user
  ctx.cookies.set('userId', '', { signed: true })
  ctx.throw(new BaseError(200, 'ok'))
}

export const modify = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const user = ctx.user
  //
  const query = model.User.updateOne({ '_id': user._id }, user)
  const res = await query.exec()

  ctx.response.body = res
}

