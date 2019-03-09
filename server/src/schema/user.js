import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    index: true
  },
  password: String,
  phone: {
    type: String,
    index: true
  }
})

const User = mongoose.model('user', UserSchema)
export default User