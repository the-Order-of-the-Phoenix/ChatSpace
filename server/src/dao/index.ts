/**
 * 
 * dao用于封装数据库的增删改查以及必要的数据验证
 */
import * as mongoose from 'mongoose'

import config from '../config'

const db: string = `mongodb://${config.db.host}:${config.db.port}`

export const init = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    authSource: config.db.authDb,
    dbName: config.db.db,
    auth: {
      user: config.db.user,
      password: config.db.pass,
    }
  })
}