const config = {
  db: {
    host: 'localhost',
    port: '27017',
    user: 'user',
    pass: 'password',
    db: 'db',
    authDb: 'admin'
  },
  websocket: {
    retry: 10
  }
}

export default config