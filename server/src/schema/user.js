import * as mongoose from 'mongoose'


const Schema = mongoose.Schema

const {
  ObjectId,
  String,
  Number,
  Date
} = Schema.Types

const UserSchema = new Schema({

  username: {
    type: String,
    index: true
  },

  password: String,

  name: {
    type: String,
    index: true
  },

  nickname: {
    type: String,
    index:true
  },

  phone: {
    type: String,
    index: true
  },

  email: {
    type: String,
    index: true
  },

  gender: Number,

  birthday: Date,

  avator: String,

  city: String,

  friends: [{
    type: ObjectId,
    ref: 'friend'
  }],

  last_modified: Date,

  last_login: Date,

  created_at: Date
})

const User = mongoose.model('user', UserSchema)
export default User