import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const {
  ObjectId,
  String,
  Date
} = Schema.Types

const FriendSchema = new Schema({
  member: {
    type: [ObjectId]
  },
  created_at: Date,
  requesting: ObjectId
})

const Friend = mongoose.model('friend', FriendSchema)

export default Friend