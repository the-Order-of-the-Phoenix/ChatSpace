import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const {
  ObjectId,
  String,
  Date
} = Schema.Types

const FriendSchema = new Schema({
  member: {
    type: [{
      type: ObjectId,
      ref: 'user'
    }]
  },
  created_at: Date,
  source: {
    type: ObjectId,
    ref: 'user'
  },
  status: String
})

const Friend = mongoose.model('friend', FriendSchema)

export default Friend