import Router from 'koa-router'

import { getMsgEntityFromMsg, getUserIdFromSession } from './util'
import model from '../schema'
import { Schema } from 'mongoose'

function getWSRouter(users: object) {
  const router = new Router({})
  const friends = {}
  router.all('/broadcast', async (ctx, next) => {
    console.log('broadcast')
  })
  router.all('/:friendId', async (ctx, next) => {
    console.log('friendId')
    console.log(ctx.params)
    
    ctx.websocket.on('message', async function (message) {
      let friendIdParam = ctx.params.friendId
      // 返回给前端的数据
      let messageObj = getMsgEntityFromMsg(message)
      let userId = getUserIdFromSession(messageObj.body.session);
      console.log(userId)
      if (messageObj.action == 'connect') {
        // 不处理
        if (!friends[friendIdParam]) friends[friendIdParam] = []
        friends[friendIdParam].push(ctx.websocket)
      }
      if (messageObj.action == 'message') {
        delete messageObj.session
        messageObj.body.created_at = new Date()
        friends[friendIdParam].forEach(websocket => websocket.send(JSON.stringify(messageObj)))
        let receiverId = messageObj.body.receiver
        let friendId = messageObj.body.friend
        let content = messageObj.body.content
        let receiver = await model.User.findById(receiverId).exec()
        let friend = await model.Friend.findById(friendId).exec()
        // 创建消息
        let message = await model.Message.create({
          sender: userId,
          receiver: receiverId,
          type: 'text',
          content,
          created_at: new Date()
        })
        // 查询关联
        let friendMessage = await model.FriendMessage.findOne({
          friend: friendId
        }).exec()
        if (!friendMessage) {
          friendMessage = await model.FriendMessage.create({
            friend: friendId
          })
        }
        await model.FriendMessage.findByIdAndUpdate(friendMessage._id, {
          '$push': {
            messages: message._id
          }
        }).exec()
      }
      if (messageObj.action == 'picture') {
        delete messageObj.session
        ctx.websocket.send(JSON.stringify(messageObj))
      }
      if (messageObj.action == 'disconnect') {
        if (!friends[friendIdParam]) friends[friendIdParam] = [];
        friends[friendIdParam].pop(ctx.websocket);
      }
    })
    ctx.websocket.on('close', function () {
      console.log('channel ', friendId,' closed')
    })
  })
  return router
}

export default getWSRouter