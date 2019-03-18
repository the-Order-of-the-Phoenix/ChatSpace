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
        ref: 'friend',
        index: true
    },
    messages: [
        {
        type: ObjectId,
          ref: 'message'
        }
    ]
});

const FriendMessage = mongoose.model('friendMessage', FriendMessageSchema)

export default FriendMessage