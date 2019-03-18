import Router from 'koa-router';
import koa from 'koa'

import model from '../schema'
import { BaseError } from '../entity';
import { Types } from 'mongoose';

export const sendMessage = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const user = ctx.user

}

export const getMessage = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  // 利用 user找到friend 然后获取friend对应的全部message
  const user = ctx.user
  const queryParam = ctx.request.query
  const friendId = queryParam['friend']
  // const friendMessageQuery = model.FriendMessage.aggregate(
  //   [
  //     { '$match': {friend: friendId} },
  //     { '$unwind': '$messages' },
  //     {
  //       '$lookup': {
  //         from: 'messags',
  //         localField: 'messages',
  //         foreignField: '_id',
  //         as: 'messageObjs'
  //       }
  //     },
  //     { '$unwind': '$messageObjs'},
  //     {
  //       '$group': {
  //         '_id': '$_id',
  //         'messages': { '$push': '$messages' },
  //         "messageObjs": {'$push': '$messageObjs'}
  //     }}
  //   ]
  // )
  console.log(queryParam  )
  if (!friendId) {
    ctx.throw(new BaseError(400, 'parameter'))
  }
  const friendMessageQuery = model.FriendMessage.findOne({friend: friendId}).populate('message')
  const friendMessage = await friendMessageQuery.exec()
  console.log(friendMessage)
  let messages = friendMessage.messages
  // messages = messages.map()
  ctx.response.body = friendMessage
  // ctx.throw(new BaseError(200, 'ok'))
}

export const deleteMessage = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {

}

