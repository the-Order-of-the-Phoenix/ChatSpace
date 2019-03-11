import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const {
  ObjectId,
  String,
  Date
} = Schema.Types

const MessageSchema = new Schema({
  sender: ObjectId,
  receiver: ObjectId,
  type: String,
  content: String,
  path: String,
  created_at: Date
})

const Message = mongoose.model('message', MessageSchema)

export default Message