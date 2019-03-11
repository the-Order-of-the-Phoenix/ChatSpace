import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const {
  ObjectId,
  String,
  Date
} = Schema.Types

const FriendMessageSchema = new Schema({
  friend: {
    type: ObjectId,
    index: true
  },
  messages: [ObjectId]
})

const FriendMessage = mongoose.model('friendMessage', FriendMessageSchema)

export default FriendMessage