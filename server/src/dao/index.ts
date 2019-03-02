/**
 * 
 * dao用于封装数据库的增删改查以及必要的数据验证
 */
import * as mongoose from 'mongoose'

const db: string = 'mongodb://'

export const init = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    authSource: 'admin',
    dbName: 'test',
    auth: {
      user: 'admin',
      password: 'password',
    }
  })
}