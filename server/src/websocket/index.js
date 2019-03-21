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
  router.all('/friend', async (ctx, next) => {
    
    ctx.websocket.on('message', async function (message) {
      // 返回给前端的数据
      let messageObj = getMsgEntityFromMsg(message)
      let userId = getUserIdFromSession(messageObj.body.session);
      let friendId = messageObj.body.friend
      let friendIds = messageObj.body.friends
      if (messageObj.action == 'connect') {
        // 不处理
        if (friendId) {
          if (!friends[friendId]) friends[friendId] = []
          friends[friendId].push(ctx.websocket)
        } else if (friendIds) {
          friendIds.forEach(friendId => {
            if (!friends[friendId]) friends[friendId] = []
            friends[friendId].push(ctx.websocket)
          })
        }
      }
      if (messageObj.action == 'message') {
        if (!friendId) return
        delete messageObj.session
        messageObj.body.created_at = new Date()
        friends[friendId].forEach(websocket => websocket.send(JSON.stringify(messageObj)))
        let receiverId = messageObj.body.receiver
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
        //todo: 保存图片消息
      }
      if (messageObj.action == 'disconnect') {
        if (friendId) {
          if (!friends[friendId]) friends[friendId] = []
          friends[friendId].pop(ctx.websocket)
        } else if (friendIds) {
          friendIds.forEach(friendId => {
            if (!friends[friendId]) friends[friendId] = []
            friends[friendId].pop(ctx.websocket)
          })
        }
      }
    })
    ctx.websocket.on('close', function () {
      console.log('channel friend closed')
    })
    ctx.websocket.on('error', function (e) {
      console.error(e)
      Object.assign(friends, {})
    })
  })
  return router
}

export default getWSRouter