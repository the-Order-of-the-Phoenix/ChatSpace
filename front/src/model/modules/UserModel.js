class User {
  username: string;
  phone: string;
  userId: string;
  friends: []
  constructor(username, phone, userId, friends) {
    this.username = username
    this.phone = phone
    this.userId = userId
    this.friends = friends
  }
}

export default User