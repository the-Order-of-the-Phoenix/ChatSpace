import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const {
  ObjectId,
  String,
  Date
} = Schema.Types

const FileSchema = new Schema({
  path: String,
  expired_at: {
    type: Date,
    index: true
  }
})

const File = mongoose.model('file', FileSchema)

export default File