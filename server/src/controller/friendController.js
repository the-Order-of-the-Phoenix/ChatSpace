import Router from 'koa-router';
import koa from 'koa'

import model from '../schema'
import { BaseError } from '../entity';
import { Types } from 'mongoose';

export const requestFriend = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  //发起好友申请
  const user = ctx.user
  console.log(ctx.request.body)
  let targetUserId = ctx.request.body.friend
  const targetUsername = ctx.request.body.username
  let friend;
  if (!targetUserId) {
    console.log(targetUsername)
    const targetUser = await model.User.findOne({ username: targetUsername }).exec()
    if (!targetUser) {
      ctx.throw(new BaseError(404, '找不到对应用户'))
      return
    }

    friend = await model.Friend.create({
      member: [user._id, targetUser._id],
      created_at: new Date(),
      source: user._id,
      status: 'normal'
    })

    const friendMessage = await model.FriendMessage.create({
      friend: friend._Id,
      messages: []
    })

    targetUserId = targetUser._id
    
  } else {
    friend = await model.Friend.create({
      member: [user._id, targetUserId],
      created_at: new Date(),
      source: user._id,
      status: 'requesting'
    })
  }
  

  const query = model.User.findById(targetUserId)
  const tarUser = await query.exec()

  console.log(friend)
  console.log(tarUser)

  if (!tarUser) {
    ctx.throw(new BaseError(404, '对应用户不存在'))
  }

  const updateTarUserOpe = model.User.findByIdAndUpdate(targetUserId, {
    '$addToSet': {
      'friends': friend._id
    }
  })
  const updateTarUserRes = await updateTarUserOpe.exec()

  const updateCurUserOpe = model.User.findByIdAndUpdate(user._id, {
    '$addToSet': {
      'friends': friend._id
    }
  })
  const updateCurUserRes = await updateCurUserOpe.exec()

  ctx.response.body = await model.User.findById(user._id)
}

export const delFriend = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const user = ctx.user
  const body = ctx.request.body
  const friendId = body.friend
  const friend = await model.Friend.findById(friendId).exec()
  const friendMessage = await model.FriendMessage.findOneAndDelete({ friend: friendId }).exec()
  const tarUserId = friend.member.filter(id => id + "" != user._id + "")[0]
  const tarUser = await model.User.findByIdAndUpdate(tarUserId, {
    "$pop": {
      friends: friendId
    }
  }).exec()
  const delFriendRes = await model.Friend.findByIdAndDelete(friendId).exec()
     
}

export const getRequestingFriendList = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const user = ctx.user;
  const friendIds = user.friends
  
  const friends = await model.Friend.find({
    '_id': {
      '$in': friendIds
    }
  }).populate('member').populate('source').exec();
  friends.forEach(friend => {
    friend.member.forEach(member => {
      member.password = undefined
      member.friends = undefined
    })
    friend.source.password = undefined
    friend.source.friends = undefined
  })
  ctx.response.body = friends.filter(friend => friend.status == 'requesting');
}

export const acceptFriendRequest = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const user = ctx.user
  let friendId = ctx.request.body.friend
  if (!friendId) {
    const username = ctx.request.body.username
    const tarUser = await model.User.find({ username }).exec()
    const tarUserId = tarUser._id
    for (let id of tarUser.friends) {
      if (user.friends.indexOf(id) != -1) {
        friendId = id
        break
      }
    }
    if (!friendId) {
      ctx.throw(new BaseError(404, '好友添加失败'))
      return
    }
  }
  await model.Friend.findByIdAndUpdate(friendId, {
    status: 'normal'
  }).exec()
  const friendMessage = await model.FriendMessage.create({
    friend: friendId,
    messages: []
  })
  const friend = await model.Friend.findById(friendId).exec()
  ctx.response.body = friend
}

export const getFriend = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const user = ctx.user
  const friendId = ctx.params['id']
  const friend = await model.Friend.findById(friendId).exec()
  const friendUserIdList = friend.member.filter(id => id + "" != user._id + "")
  const friendUserId = friendUserIdList[0]
  if (friendUserId) {
    const friendUser = await model.User.findById(friendUserId).exec()
    friendUser.friends = undefined
    friendUser.password = undefined
    ctx.response.body = friendUser
  } else {
    ctx.throw(new BaseError(404, '用户不存在'))
  }
}

export const getFriends = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  const user = ctx.user
  const expandUser = await model.User.findById(user._id).populate('friends').exec()
  console.log(expandUser)
  const friendIds = expandUser.friends.filter(friend => friend.status != 'requesting').map(friend => friend._id)

  // const friendUserIds = expandUser.friends.map(f => f.member).reduce((a, b) => a.concat(b), []).filter(id + '' != user._id + '')
  const friends = await model.Friend.find({
    '_id': {
      '$in': friendIds
    }
  }).populate('member').exec()
  const friendUsers = friends.map(friend => {
    let res = {}
    res.id = friend._id
    let tarUser = friend.member.filter(m => m._id + '' != user._id + '')[0]
    res.username = tarUser.username
    res.avator = tarUser.avator
    res.name = tarUser.name
    res.nickName = tarUser.nickName
    res.phone = tarUser.phone
    res.gender = tarUser.gender
    res.birthday = tarUser.birthday
    res.city = tarUser.city
    res.userId = tarUser._id
    return res
  })
  ctx.response.body = friendUsers
}

export const modifyFriend = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {

}