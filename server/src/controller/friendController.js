import Router from 'koa-router';
import koa from 'koa'

import model from '../schema'
import { BaseError } from '../entity';
import { Types } from 'mongoose';

export const requestFriend = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  //发起好友申请
  const user = ctx.user
  const targetUserId = ctx.body.requestFriendId
  const friend = model.Friend.create({
    member: [user._id, targetUserId],
    created_at: new Date(),
    source: user._id,
    status: 'requesting'
  })

  //对应好友的好友列表中增加记录
  const query = model.User.findById(targetUserId)
  const tarUser = await query.exec()

  console.log(friend)
  console.log(tarUser)

  if (!tarUser) {
    ctx.throw(new BaseError(404, '对应用户不存在'))
  }


  // model.User.findByIdAndUpdate(targetUserId, {
  //   '$push': {
  //     'friends': friend._id
  //   }    
  // })
  ctx.throw(new BaseError(200, 'ok'))
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