import Router from 'koa-router';
import koa from 'koa'

import model from '../schema'
import { BaseError } from '../entity';
import { Types } from 'mongoose';

export const requestFriend = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  //发起好友申请
  const user = ctx.user
  const targetUserId = ctx.request.body.friend
  const friend = await model.Friend.create({
    member: [user._id, targetUserId],
    created_at: new Date(),
    source: user._id,
    status: 'requesting'
  })

  const query = model.User.findById(targetUserId)
  const tarUser = await query.exec()

  console.log(friend)
  console.log(tarUser)

  if (!tarUser) {
    ctx.throw(new BaseError(404, '对应用户不存在'))
  }


  const updateTarUserOpe = model.User.findByIdAndUpdate(targetUserId, {
    '$push': {
      'friends': friend._id
    }
  })
  const updateTarUserRes = await updateTarUserOpe.exec()

  const updateCurUserOpe = model.User.findByIdAndUpdate(user._id, {
    '$push': {
      'friends': friend._id
    }
  })
  const updateCurUserRes = await updateCurUserOpe.exec()

  ctx.response.body = updateCurUserRes
}

export const delFriend = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const user = ctx.user
  
}

export const getFriendList = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {

}

export const getRequestingFriendList = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {


}

export const getFriend = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {

}

export const modifyFriend = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {

}